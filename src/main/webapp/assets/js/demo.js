$(function () {
	
	/**
	 * 搜索按钮
	 */
	$('#search_button').button({
		icons : {
			primary : 'ui-icon-search',
		},
	});
	
	/**
	 * 提问按钮
	 */
	$('#question_button').button({
		icons : {
			primary: 'ui-icon-lightbulb',
		}
	});
	
	/**
	 * 未登录不可操作
	 */
	$('#question_button').click(function() {
		if($.cookie('user')) {
			$('#question').dialog('open');
		} else {
			$('#error').dialog('open');
			setTimeout(function() {
				$('#error').dialog('close');
				$('#login').dialog('open');
			}, 1000);
		}
	});
	
	/**
	 * 未登录显示错误内容
	 */
	$('#error').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 180,
		height : 50,
	}).parent().find('.ui-widget-header').hide();
	
	/**
	 * 问题提出的dialog
	 */
	$('#question').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 500,
		height : 360,
		closeText : '关闭',
		buttons : {
			'发布' : function () {
				$(this).submit();
			}
		},
	});
	
	/**
	 * 文本域
	 */
	$('.uEditorCustom').uEditor();
	
	$('#member, #logout').hide();
	
	if ($.cookie('user')) {
		$('#member, #logout').show();
		$('#reg_a, #login_a').hide();
		$('#member').html($.cookie('user'));
	} else {
		$('#member, #logout').hide();
		$('#reg_a, #login_a').show();
	}
	/**
	 * 点击退出
	 * */
	$('#logout').click(function () {
		$.removeCookie('user');
		window.location.href = '/index.do';
	});
	
	/**
	 * 提交注册登录数据等待显示内容
	 */
	$('#loading').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 180,
		height : 50,
	}).parent().find('.ui-widget-header').hide();
	
	$('#reg_a').click(function () {
		$('#reg').dialog('open');
	});

	/**
	 * 用户注册
	 */
	$('#reg').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 320,
		height : 340,
		closeText : '关闭',
		buttons : {
			'注册' : function () {
				$(this).submit();
			}
		}
	}).buttonset().validate({
	
		submitHandler : function (form) {
			/**
			 * 用户注册之表单
			 */
			$(form).ajaxSubmit({
				url : 'user/registuser.do',
				type : 'POST',
				data : {
					param: 'reg',
				},
				beforeSubmit : function (formData, jqForm, options) {
					$('#loading').dialog('open');
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function (responseText, statusText) {
					if (responseText) {
						$('#reg').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('数据新增成功...');
						$.cookie('user', $('#user').val());
						setTimeout(function () {
							$('#loading').dialog('close');
							$('#reg').dialog('close');
							$('#reg').resetForm();//即清空form
							$('#reg span.star').html('*').removeClass('succ');
							$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html('欢迎：'+$.cookie('user'));
						}, 1000);
					}
				},
			});
		},
	
		showErrors : function (errorMap, errorList) {
			var errors = this.numberOfInvalids();
			
			if (errors > 0) {
				$('#reg').dialog('option', 'height', errors * 20 + 340);
			} else {
				$('#reg').dialog('option', 'height', 340);
			}
			
			this.defaultShowErrors();
		},
		
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
	
		errorLabelContainer : 'ol.reg_error',
		wrapper : 'li',
	
		rules : {
			account : {
				required : true,
				minlength : 2,
				/**
				 * 发异步请求，判断是否已经注册
				 */
				remote : {
					url: 'user/registuser.do',
					type : 'POST',
					data : {
						param : 'regValidate',
					},
				},
			},
			pass : {
				required : true,
				minlength : 6,
			},
			email : {
				required : true,
				email : true
			},
			date : {
				date : true,
			},
		},
		messages : {
			account : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
				remote : '该账号已注册',
			},
			pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
			},
			email : {
				required : '邮箱不得为空！',
				minlength : '请输入正确的邮箱地址！',
			},	
		}
	});
	
	$('#date').datepicker({
		changeMonth : true,
		changeYear : true,
		yearSuffix : '',
		maxDate : 0,
		yearRange : '1950:2020',

	});
		
	/**
	 * 用户注册邮箱自动填充
	 */
	$('#email').autocomplete({
		delay : 0,
		autoFocus : true,
		source : function (request, response) {
			//获取用户输入的内容
			//alert(request.term);
			//绑定数据源的
			//response(['aa', 'aaaa', 'aaaaaa', 'bb']);
			
			var hosts = ['126.com', 'qq.com', '163.com', 'sina.com.cn','gmail.com', 'hotmail.com'],
				term = request.term,		//获取用户输入的内容
				name = term,				//邮箱的用户名
				host = '',					//邮箱的域名
				ix = term.indexOf('@'),		//@的位置
				result = [];				//最终呈现的邮箱列表
				
				
			result.push(term);
			
			//当有@的时候，重新分别用户名和域名
			if (ix > -1) {
				name = term.slice(0, ix);
				host = term.slice(ix + 1);
			}
			
			if (name) {
				//如果用户已经输入@和后面的域名，
				//那么就找到相关的域名提示，比如bnbbs@1，就提示bnbbs@163.com
				//如果用户还没有输入@或后面的域名，
				//那么就把所有的域名都提示出来
				
				var findedHosts = (host ? $.grep(hosts, function (value, index) {
						return value.indexOf(host) > -1
					}) : hosts),
					findedResult = $.map(findedHosts, function (value, index) {
					return name + '@' + value;
				});
				
				result = result.concat(findedResult);
			}
			
			response(result);
		},	
	});
	
	/**
	 * 用户登录
	 */
	$('#login_a').click(function () {
		$('#login').dialog('open');
	});

	$('#login').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 320,
		height : 240,
		closeText : '关闭',
		buttons : {
			'登录' : function () {
				$(this).submit();
			}
		}
	}).validate({
	
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url : 'user/loginuser.do',
				type : 'POST',
				data : {
					param : 'login',
				},
				beforeSubmit : function (formData, jqForm, options) {
					$('#loading').dialog('open');
					$('#login').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function (responseText, statusText) {
					if (responseText) {
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('登录成功...');
						/**
						 * 此操作使cookie七天后过期
						 */
						if ($('#expires').is(':checked')) {
							$.cookie('user', $('#login_user').val(), {
								expires : 7,
							});
						} else {
							$.cookie('user', $('#login_user').val());
						}
						setTimeout(function () {
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();//即清空form
							$('#login span.star').html('*').removeClass('succ');
							$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('信息验证中...');
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html('欢迎：'+$.cookie('user'));
						}, 1000);
					}
				},
			});
		},
	
		showErrors : function (errorMap, errorList) {
			var errors = this.numberOfInvalids();
			
			if (errors > 0) {
				$('#login').dialog('option', 'height', errors * 20 + 240);//根据现实的高度+
			} else {
				$('#login').dialog('option', 'height', 240);
			}
			
			this.defaultShowErrors();
		},
		
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		
		unhighlight : function (element, errorClass) {// 去*， 加图片
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
	
		errorLabelContainer : 'ol.login_error',
		wrapper : 'li',
	
		rules : {
			account : {
				required : true,
				minlength : 2,
				remote : {
					url : 'user/loginuser.do',
					type : 'POST',
					data : {
						param : 'loginValidate2',
					},
				},
			},
			pass : {
				required : true,
				minlength : 6,
				remote : {
					url : 'user/loginuser.do',
					type : 'POST',
					data : {
						account : function() {
							return $('#login_user').val();
						},
						param : 'loginValidate',
					}
				},
			},
		},
		messages : {
			account : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
				remote : '该账号不存在，请注册'
			},
			pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
				remote: '账号或密码错误',
			},
		}
	});
});



























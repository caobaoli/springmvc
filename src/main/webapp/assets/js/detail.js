$(function () {
	
	/**
	 * 加载问题
	 */
	$.ajax({
		/****开始时，问题显示形式根据字符数决定(推荐使用)***/
		url : 'question/findquestion.do',
		type : 'POST',
		success : function (response, status, xhr) {
			var json = $.parseJSON(response);
			var html = '';
			var arr = [];
			var summary = [];
			$.each(json, function (index, value) {
				html += '<h3>' + value.title + '</h3><h4>' + value.user + ' 发表于 ' + value.date + '</h4><div class="editor">' + value.content + '</div><div class="bottom"><span class="comment" data-id="'+ value.id +'">('+ value.count +')条评论</span><div class="comment_list"></div></div>';
			});
			$('.content').append(html);
			
			
			$.each($('.bottom'), function (index, value) {
				var comment_this = this;
				if ($.cookie('user')) {
					if (!$('.comment_list').eq(index).has('form').length) {
						$.ajax({
							url : 'comment/findcomment.do',
							type : 'POST',
							beforeSend : function (jqXHR, settings) {
								$('.comment_list').eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>');
							},
							success : function (response, status) {
								$('.comment_list').eq(index).find('.comment_load').hide();
								var json_comment = $.parseJSON(response);
								$.each(json_comment, function (index2, value) {
									$('.comment_list').eq(index).append('<dl class="comment_content"><dt>' + value.user + '</dt><dd>' + value.comment + '</dd><dd class="date">' + value.date + '</dd></dl>');
								});
								$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment" id="comm"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input type="button" value="发表" /></dd></dl></form>');
								$('.comment_list').eq(index).find('input[type=button]').button().click(function () {
									if($('.comm').val()) {
										var _this = this;
										$('.comment_list').eq(index).find('form').ajaxSubmit({
											url: 'comment/addcomment.do',
											type : 'POST',
											beforeSubmit : function (formData, jqForm, options) {
												$('#loading').dialog('open');
												$(_this).button('disable');
											},
											success : function (responseText, statusText) {
												if (responseText) {
													$(_this).button('enable');
													$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('数据新增成功...');
													setTimeout(function () {
														var date = new Date();
														$('#loading').dialog('close');
														$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('user')+ '</dt><dd>' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd>' +date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
														$('.comment_list').eq(index).find('form').resetForm();
														$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('数据交互中...');
													}, 1000);
												}
											},
										});
									} else {
										alert("警告：评论不能为空！！！");
										return;
									}
									
								});
							},
						});
					}
					if ($('.comment_list').eq(index).is(':hidden')) {
						$('.comment_list').eq(index).show();
						
					} else {
						$('.comment_list').eq(index).hide();
					}
				} else {
					$('#error').dialog('open');
					setTimeout(function () {
						$('#error').dialog('close');
						$('#login').dialog('open');
					}, 1000);
				}
			});
			
		},
	});
});



























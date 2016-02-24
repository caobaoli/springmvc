$(function () {
	
	/**
	 * 搜索按钮
	 */
	$('#search_button').button({
		icons : {
			primary : 'ui-icon-search',
		},
	});
	
	/***************************************************搜索逻辑 Start****************************************************************/
	$('#search_button').click(function() {
		if($.cookie('user')) {
			if($('#searchQuestion').val()) {
				$(this).ajaxSubmit({
					url : 'question/searchquestion.do',
					type : 'POST',
					data : {
						questionKey : $('#searchQuestion').val(),
					},
					success : function (response, status, xhr) {
						if($.parseJSON(response)) {
							var json = $.parseJSON(response);
							var html = '';
							var arr = [];
							var summary = [];
							$.each(json, function (index, value) {
								html += '<h4>' + value.user + ' 发表于 ' + value.date + '</h4>' + '<a href="detail.do?titleId='+ value.id +  '" target="_blank" class="removeline">' + '<h3>' + value.title + '</h3>'+'</a><div class="editor">' + value.content + '</div><div class="bottom"><span class="comment" data-id="'+ value.id +'">('+ value.count +')条评论</span><span class="up">收起</span></div><hr noshade="noshade" size="1" /><div class="comment_list"></div>';
							});
							$('.content').html(html);
							
							$.each($('.editor'), function (index, value) {
								arr[index] = $(value).html();
								summary[index] = arr[index].substr(0, 200);
								
								if (summary[index].substring(199,200) == '<') {
									summary[index] = replacePos(summary[index], 200, '');
								}
								if (summary[index].substring(198,200) == '</') {
									summary[index] = replacePos(summary[index], 200, '');
									summary[index] = replacePos(summary[index], 199, '');
								}
								
								if (arr[index].length > 200) {
									summary[index] += '...<span class="down">显示全部</span>';
									$(value).html(summary[index]);
								}
								$('.bottom .up').hide();
							});
							
							$.each($('.editor'), function (index, value) {
								$(this).on('click', '.down', function () {
									$('.editor').eq(index).html(arr[index]);
									$(this).hide();
									$('.bottom .up').eq(index).show();
								});
							});
							
							$.each($('.bottom'), function (index, value) {
								$(this).on('click', '.up', function () {
									$('.editor').eq(index).html(summary[index]);
									$(this).hide();
									$('.editor .down').eq(index).show();
								});
							});
							
							$.each($('.bottom'), function (index, value) {
								$(this).on('click', '.comment', function () {
									var comment_this = this;
									var page = 0;
									if ($.cookie('user')) {
										if (!$('.comment_list').eq(index).has('form').length) {
											$.ajax({
												url:'comment/findcomment.do',
												type:'POST',
												data: {
													titleId:$(comment_this).attr('data-id'),
													page : page,
												},
												beforeSend : function (jqXHR, settings) {
													$('.comment_list').eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>');
												},
												success : function (response, status) {
													$('.comment_list').eq(index).find('.comment_load').hide();
													if($.parseJSON(response)) {
														var count = 0;
														var json_comment = $.parseJSON(response);
														$.each(json_comment, function (index2, value) {
															count = value.count;
															$('.comment_list').eq(index).append('<dl class="comment_content"><dt>' + value.user + ' 评论： ' + '</dt><dd>' + value.comment + '</dd><dd class="date">' + value.date + '</dd></dl>');
														});
														/****/
														page++;
														if(count > 5) {
															$('.comment_list').eq(index).append('<dl><dd><span class="load_more">加载剩余评论</span></dd></dl>');
														}
														if (page*5 > count) {
															$('.comment_list').eq(index).find('.load_more').off('click');
															$('.comment_list').eq(index).find('.load_more').hide();
														}
														$('.comment_list').eq(index).find('.load_more').button().on('click', function () {
															$('.comment_list').eq(index).find('.load_more').button('disable');
															$.ajax({
																url : 'comment/findcomment.do',
																type : 'POST',
																data : {
																	titleId : $(comment_this).attr('data-id'),
																	page : page,
																},
																beforeSend : function (jqXHR, settings) {
																	$('.comment_list').eq(index).find('.load_more').html('<img src="assets/img/more_load.gif" />');
																},
																success : function (response, status) {
																	var json_comment_more = $.parseJSON(response);
																	$.each(json_comment_more, function (index3, value) {
																		$('.comment_list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>' + value.user + ' 评论： ' + '</dt><dd>' + value.comment + '</dd><dd class="date">' + value.date + '</dd></dl>');
																	});
																	$('.comment_list').eq(index).find('.load_more').button('enable');
																	page++;
																	if(count >page*5+5) {
																		$('.comment_list').eq(index).find('.load_more').html('加载剩余评论');
																	}
																	if (page*5+5 > count) {
																		$('.comment_list').eq(index).find('.load_more').off('click');
																		$('.comment_list').eq(index).find('.load_more').hide();
																	}
																}
															});
														});
														/****/
														$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment" id="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input type="button" value="发表" /></dd></dl></form>');
														$('.comment_list').eq(index).find('input[type=button]').button().click(function () {
															alert('h');
															if($('#comment').val()) {
																var _this = this;
																$('.comment_list').eq(index).find('form').ajaxSubmit({
																	url : 'comment/addcomment.do',
																	type : 'POST',
																	beforeSubmit : function (formData, jqForm, options) {
																		$('#loading').dialog('open');
																		$(_this).button('disable');
																	},
																	success : function (responseText, statusText) {
																		if (responseText) {
																			$(_this).button('enable');
																			$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('评论成功...');
																			setTimeout(function () {
																				var date = new Date();
																				$('#loading').dialog('close');
																				$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('user')+ ' 评论： ' + '</dt><dd>' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd class="date">' +date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
																				$('.comment_list').eq(index).find('form').resetForm();
																				$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('数据交互中...');
																			}, 1000);
																		}
																	},
																});
															} else {
																$('#commentNull').dialog('open');
																setTimeout(function() {
																	$('#commentNull').dialog('close');
																	return;
																}, 1200);
															}
														});
													} else {
														$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment" id="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input type="button" value="发表" /></dd></dl></form>');
														$('.comment_list').eq(index).find('input[type=button]').button().click(function () {
															if($('#comment').val()) {
																var _this = this;
																$('.comment_list').eq(index).find('form').ajaxSubmit({
																	url : 'comment/addcomment.do',
																	type : 'POST',
																	beforeSubmit : function (formData, jqForm, options) {
																		$('#loading').dialog('open');
																		$(_this).button('disable');
																	},
																	success : function (responseText, statusText) {
																		if (responseText) {
																			$(_this).button('enable');
																			$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('评论成功...');
																			setTimeout(function () {
																				var date = new Date();
																				$('#loading').dialog('close');
																				$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('user')+ ' 评论： ' + '</dt><dd>' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd class="date">' +date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
																				$('.comment_list').eq(index).find('form').resetForm();
																				$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('数据交互中...');
																			}, 1000);
																		}
																	},
																});
															} else {
																$('#commentNull').dialog('open');
																setTimeout(function() {
																	$('#commentNull').dialog('close');
																	return;
																}, 1200);
															}
															
														});
													}
													
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
							});
						} else {
							$('#searchednull').dialog('open');
							setTimeout(function() {
								$('#searchednull').dialog('close');
								return;
							}, 2000);
						}
						
								
					},
				});
			} else {
				$('#questionnull').dialog('open');
				setTimeout(function() {
					$('#questionnull').dialog('close');
					return;
				}, 1200);
			}
			
		} else {
			$('#error').dialog('open');
			setTimeout(function() {
				$('#error').dialog('close');
				$('#login').dialog('open');
			}, 1000);
		}
	});
	/***************************************************搜索逻辑 End****************************************************************/
	
	
	/**
	 * 提问按钮
	 */
	$('#question_button').button({
		icons : {
			primary: 'ui-icon-lightbulb',
		}
	});
	
	/*********************************************所有错误消息 Start*****************************************************/
	/**
	 * 未登录不可操作
	 */
	$('#question_button').click(function() {
		if($.cookie('user')) {
			$('#question').dialog('open');
			$('.uEditorIframe').contents().find('#iframeBody').html('');
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
	 * 评论框为空显示错误内容
	 */
	$('#commentNull').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 200,
		height : 50,
	}).parent().find('.ui-widget-header').hide();
	
	/**
	 * 搜索框为空显示错误内容
	 */
	$('#questionnull').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 220,
		height : 50,
	}).parent().find('.ui-widget-header').hide();
	
	/**
	 * 搜索到的内容为空
	 */
	$('#searchednull').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 330,
		height : 50,
	}).parent().find('.ui-widget-header').hide();
	
	/**
	 * 提出问题框为空
	 */
	$('#questioncontent').dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 250,
		height : 50,
	}).parent().find('.ui-widget-header').hide();
	/*********************************************所有错误消息 End*****************************************************/
	
	/*********************************************加载所有问题 Start***************************************************/
	$.ajax({
		url : 'question/findquestion.do',
		type : 'POST',
		success : function (response, status, xhr) {
			var json = $.parseJSON(response);
			var html = '';
			var arr = [];
			var summary = [];
			$.each(json, function (index, value) {
				html += '<h4>' + value.user + ' 发表于 ' + value.date + '</h4>' + '<a href="detail.do?titleId='+ value.id +  '" target="_blank" class="removeline">' + '<h3>' + value.title + '</h3>' + '</a><div class="editor">' + value.content + '</div><div class="bottom"><span class="comment" data-id="'+ value.id +'">('+ value.count +')条评论</span><span class="up">收起</span></div><hr noshade="noshade" size="1" /><div class="comment_list"></div>';
			});
			$('.content').append(html);
			
			$.each($('.editor'), function (index, value) {
				arr[index] = $(value).html();
				summary[index] = arr[index].substr(0, 200);
				
				if (summary[index].substring(199,200) == '<') {
					summary[index] = replacePos(summary[index], 200, '');
				}
				if (summary[index].substring(198,200) == '</') {
					summary[index] = replacePos(summary[index], 200, '');
					summary[index] = replacePos(summary[index], 199, '');
				}
				
				if (arr[index].length > 200) {
					summary[index] += '...<span class="down">显示全部</span>';
					$(value).html(summary[index]);
				}
				$('.bottom .up').hide();
			});
			
			$.each($('.editor'), function (index, value) {
				$(this).on('click', '.down', function () {
					$('.editor').eq(index).html(arr[index]);
					$(this).hide();
					$('.bottom .up').eq(index).show();
				});
			});
			
			$.each($('.bottom'), function (index, value) {
				$(this).on('click', '.up', function () {
					$('.editor').eq(index).html(summary[index]);
					$(this).hide();
					$('.editor .down').eq(index).show();
				});
			});
			
			$.each($('.bottom'), function (index, value) {
				$(this).on('click', '.comment', function () {
					var comment_this = this;
					var page = 0;
					if ($.cookie('user')) {
						if (!$('.comment_list').eq(index).has('form').length) {
							$.ajax({
								url:'comment/findcomment.do',
								type:'POST',
								data: {
									titleId:$(comment_this).attr('data-id'),
									page : page,
								},
								beforeSend : function (jqXHR, settings) {
									$('.comment_list').eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>');
								},
								success : function (response, status) {
									$('.comment_list').eq(index).find('.comment_load').hide();
									if($.parseJSON(response)) {
										var count = 0;
										var json_comment = $.parseJSON(response);
										$.each(json_comment, function (index2, value) {
											count = value.count;
											$('.comment_list').eq(index).append('<dl class="comment_content"><dt>' + value.user + ' 评论： ' + '</dt><dd>' + value.comment + '</dd><dd class="date">' + value.date + '</dd></dl>');
										});
										/****/
										page++;
										if(count > 5) {
											$('.comment_list').eq(index).append('<dl><dd><span class="load_more">加载剩余评论</span></dd></dl>');
										}
										if (page*5 > count) {
											$('.comment_list').eq(index).find('.load_more').off('click');
											$('.comment_list').eq(index).find('.load_more').hide();
										}
										$('.comment_list').eq(index).find('.load_more').button().on('click', function () {
											$('.comment_list').eq(index).find('.load_more').button('disable');
											$.ajax({
												url : 'comment/findcomment.do',
												type : 'POST',
												data : {
													titleId : $(comment_this).attr('data-id'),
													page : page,
												},
												beforeSend : function (jqXHR, settings) {
													$('.comment_list').eq(index).find('.load_more').html('<img src="assets/img/more_load.gif" />');
												},
												success : function (response, status) {
													var json_comment_more = $.parseJSON(response);
													$.each(json_comment_more, function (index3, value) {
														$('.comment_list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>' + value.user + ' 评论： ' + '</dt><dd>' + value.comment + '</dd><dd class="date">' + value.date + '</dd></dl>');
													});
													$('.comment_list').eq(index).find('.load_more').button('enable');
													page++;
													if(count >page*5+5) {
														$('.comment_list').eq(index).find('.load_more').html('加载剩余评论');
													}
													if (page*5+5 > count) {
														$('.comment_list').eq(index).find('.load_more').off('click');
														$('.comment_list').eq(index).find('.load_more').hide();
													}
												}
											});
										});
										/****/
										$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment" id="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input type="button" value="发表" /></dd></dl></form>');
										$('.comment_list').eq(index).find('input[type=button]').button().click(function () {
											if($('#comment').val()) {
												var _this = this;
												$('.comment_list').eq(index).find('form').ajaxSubmit({
													url : 'comment/addcomment.do',
													type : 'POST',
													beforeSubmit : function (formData, jqForm, options) {
														$('#loading').dialog('open');
														$(_this).button('disable');
													},
													success : function (responseText, statusText) {
														if (responseText) {
															$(_this).button('enable');
															$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('评论成功...');
															setTimeout(function () {
																var date = new Date();
																$('#loading').dialog('close');
																$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('user')+ ' 评论： ' + '</dt><dd>' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd class="date">' +date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
																$('.comment_list').eq(index).find('form').resetForm();
																$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('数据交互中...');
															}, 1000);
														}
													},
												});
											} else {
												$('#commentNull').dialog('open');
												setTimeout(function() {
													$('#commentNull').dialog('close');
													return;
												}, 1200);
											}
										});
									} else {
										$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment" id="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input type="button" value="发表" /></dd></dl></form>');
										$('.comment_list').eq(index).find('input[type=button]').button().click(function () {
											if($('#comment').val()) {
												var _this = this;
												$('.comment_list').eq(index).find('form').ajaxSubmit({
													url : 'comment/addcomment.do',
													type : 'POST',
													beforeSubmit : function (formData, jqForm, options) {
														$('#loading').dialog('open');
														$(_this).button('disable');
													},
													success : function (responseText, statusText) {
														if (responseText) {
															$(_this).button('enable');
															$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('评论成功...');
															setTimeout(function () {
																var date = new Date();
																$('#loading').dialog('close');
																$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('user')+ ' 评论： ' + '</dt><dd>' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd class="date">' +date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
																$('.comment_list').eq(index).find('form').resetForm();
																$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('数据交互中...');
															}, 1000);
														}
													},
												});
											} else {
												$('#commentNull').dialog('open');
												setTimeout(function() {
													$('#commentNull').dialog('close');
													return;
												}, 1200);
											}
											
										});
									}
									
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
			});
			
		},
	});
	/*********************************************加载所有问题 End***************************************************/
	
	/*********************************************加载主页左边内容 Start**********************************************/
	$.ajax({
		url : 'question/findranquestion.do',
		type : 'POST',
		success : function (response, status, xhr) {
			var json = $.parseJSON(response);
			var html = '';
			$.each(json, function (index, value) {
				html += '<a href="detail.do?titleId='+ value.id +  '" target="_blank">' + '<h4>' + value.title + '(' + value.count + ')' + '</h4>' + '</a>';
			});
			$('.contentquestion').append(html);
		},
	});
	
	$.ajax({
		url : 'question/findhotquestion.do',
		type : 'POST',
		success : function (response, status, xhr) {
			var json = $.parseJSON(response);
			var html = '';
			$.each(json, function (index, value) {
				html += '<a href="detail.do?titleId='+ value.id +  '" target="_blank">' + '<h4>' + value.title + '(' + value.count + ')' + '</h4>' + '</a>';
			});
			$('.hotquestion').append(html);
		},
	});
	/*********************************************加载主页左边内容 End**********************************************/
	
	
	/*********************************************问题提出的dialog Start******************************************/
	$('#question').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 500,
		height : 410,
		buttons : {
			'发布' : function () {
				if($('.uEditorIframe').contents().find('#iframeBody').html()) {
					var contentdata = $('.uEditorIframe').contents().find('#iframeBody').html() + '.';
					$(this).ajaxSubmit({
						url : 'question/addquestion.do',
						type : 'POST',
						data : {
							user : $.cookie('user'),
							content : contentdata,
						},
						beforeSubmit : function (formData, jqForm, options) {
							$('#loading').dialog('open');
							$('#question').dialog('widget').find('button').eq(1).button('disable');
						},
						success : function (responseText, statusText) {
							if (responseText) {
								$('#question').dialog('widget').find('button').eq(1).button('enable');
								$('#loading').css('background', 'url(assets/img/success.gif) no-repeat 20px center').html('问题新增成功...');
								setTimeout(function () {
									$('#loading').dialog('close');
									$('#question').dialog('close');
									$('#question').resetForm();
									$('#loading').css('background', 'url(assets/img/loading.gif) no-repeat 20px center').html('数据交互中...');
									//完美解决提交问题重新加载的问题
									location = "index.do";
								}, 1000);
							}
						},
					});
				} else {
					$('#questioncontent').dialog('open');
					setTimeout(function() {
						$('#questioncontent').dialog('close');
						$('#question').dialog('close');
						$('#question').resetForm();
						location = "index.do";
					}, 1200);
				}
			}
		}
	});
	/*********************************************问题提出的dialog End******************************************/
	
	/**
	 * 文本域
	 */
	$('.uEditorCustom').uEditor();
	
	$('#member, #logout').hide();
	
	if ($.cookie('user')) {
		$('#member, #logout').show();
		$('#reg_a, #login_a').hide();
		$('#member').html('欢迎：'+$.cookie('user'));
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

	/******************************************************用户注册 Start***********************************************/
	$('#reg').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 340,
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
	/******************************************************用户注册 Start***********************************************/
	
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
	
	/************************************************用户登录 Start***********************************************************/
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
	/************************************************用户登录 End***********************************************************/
	
	
	$('.btn').click(function() {
		if($.cookie('user')) {
			self.location="user/user_info.do?account="+$.cookie('user'); 
		} else {
			$('#error').dialog('open');
			setTimeout(function() {
				$('#error').dialog('close');
				$('#login').dialog('open');
			}, 1000);
		}
	});
});

function replacePos(strObj, pos, replaceText) {
	return strObj.substr(0, pos-1) + replaceText + strObj.substring(pos, strObj.length);
}

























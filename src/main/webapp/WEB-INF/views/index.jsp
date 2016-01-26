<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<title>文理论坛-首页</title>
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="this is my page">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${ctx}/assets/js/jquery-1.11.3.js"></script>
<!-- jquery向下兼容文件 -->
<script type="text/javascript" src="${ctx}/assets/js/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/jquery-ui.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/jquery.validate.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/jquery.form.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/jquery.cookie.js"></script>
<script type="text/javascript" src="${ctx}/assets/uEditor/uEditor.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/demo.js"></script>
<link rel="shortcut icon" href="${ctx}/assets/img/favicon.ico" />
<link rel="stylesheet" type="text/css" href="${ctx}/assets/uEditor/uEditor.css">
<link rel="stylesheet" type="text/css" href="${ctx}/assets/css/style.css">
<link rel="stylesheet" type="text/css" href="${ctx}/assets/css/smoothness/jquery-ui.css">
</head>

<body>
	<div id="header">
		<div class="header_main">
			<h1>文理论坛</h1>
			<div class="header_search">
				<input type="text" name="search" class="search" id="searchQuestion" placeholder="搜索问题" required="required"/>
			</div>
			<div class="header_button">
				<button id="search_button">搜索</button>
			</div>
			<div class="header_button">
				<button id="question_button">提问</button>
			</div>
			<div class="header_member">
				<a href="javascript:void(0)" id="reg_a">注册</a> <a
					href="javascript:void(0)" id="member">用户</a> | <a
					href="javascript:void(0)" id="login_a">登录</a> <a
					href="javascript:void(0)" id="logout">退出</a>
			</div>
		</div>
	</div>

	<div id="main">
		<div class="main_left">
			<div id="tabs">
				<div class="newmess">最新动态</div>
				<div class="operate"><a id="operate">设置</a></div>
				<hr noshade="noshade" size="1" />
			</div>
			<div class="content"></div>
		</div>
		<div class="main_right">
			<div id="accordion">
				<h3>近期热议</h3>
				<div>
					<span class="hotquestion"></span>
				</div>
				<h3>随便看看</h3>
					<span class="contentquestion"></span>
				<h3>个人信息</h3>
				<div>
					<a href="#" class="btn"><h4>个人基本信息</h4></a>
				</div>
				<h3>我的校园</h3>
					<a href="http://www.xawl.org" class="btn" target="_blank"><h4>西安文理学院官网</h4></a>
					<a href="http://www.xawl.org/info/iList.jsp?cat_id=10002" class="btn" target="_blank"><h4>学校简介</h4></a>
			</div>
		</div>
	</div>

	<form id="reg" title="会员注册" action="">
		<ol class="reg_error"></ol>
		<p>
			<label for="user">账号：</label> <input name="account" type="text"
				class="text" id="user" title="请输入账号，不少于2位！" /> <span class="star">*</span>
		</p>
		<p>
			<label for="pass">密码：</label> <input name="pass" type="password"
				class="text" id="pass" title="请输入密码，不少于6位！" /> <span class="star">*</span>
		</p>
		<p>
			<label for="email">邮箱：</label> <input name="email" type="text"
				class="text" id="email" title="请输入正确的邮箱" /> <span class="star">*</span>
		</p>
		<p>
			<label>性别：</label> <input name="sex" type="radio" value="male"
				id="male" checked="checked"><label for="male">男</label></input><input
				name="sex" type="radio" value="famale" id="famale"><label
				for="famale">女</label></input>
		</p>
		<p>
			<label for="date">生日：</label> <input name="date" type="text"
				readonly="readonly" class="text" id="date">
		</p>
	</form>

	<form id="login" title="会员登录">
		<ol class="login_error"></ol>
		<p>
			<label for="user">账号：</label> <input name="account" type="text"
				class="text" id="login_user" title="请输入账号，不少于2位！" /> <span
				class="star">*</span>
		</p>
		<p>
			<label for="pass">密码：</label> <input name="pass" type="password"
				class="text" id="login_pass" title="请输入密码，不少于6位！" /> <span
				class="star">*</span>
		</p>
		<p>
			<input type="checkbox" name="expires" id="expires" checked="checked" />
			<label for="expires">登录后有效期一周</label>
		</p>
	</form>

	<form id="question" title="提问">
		<p>
			<label for="title">问题名称：</label> <input name="title" type="text"
				style="width: 390px;" class="text" id="title" />
		</p>
		<p>
			<label for="title">问题描述：</label>
			<textarea class="uEditorCustom" name="content"></textarea>
		</p>
	</form>
	<div id="loading">数据交互中...</div>
	<div id="error">请登录后操作...</div>
	<div id="questionnull">搜索问题框不能为空...</div>
	<div id="searchednull">关键字搜索无结果，请换关键字搜索...</div>
	<div id="commentNull">评论框不能为空...</div>
	<div id="questioncontent">问题输入内容不能为空...</div>
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="this is my page">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${ctx}/assets/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/bootstrap.js"></script>
<title>文理论坛-用户信息</title>
<link rel="shortcut icon" href="${ctx}/assets/img/favicon.ico" />
<link rel="stylesheet" type="text/css" href="${ctx}/assets/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="${ctx}/assets/css/bootstrap-theme.css">
<link rel="stylesheet" type="text/css" href="${ctx}/assets/css/userinfo.css">
</head>
<body>
	<div>
		<label id="usertitle"><h4>${user.account}的个人信息:</h4></label>
	<hr/>
	</div>
	<form class="form-horizontal">
		<div class="form-group">
			<label for="inputAccount" class="col-sm-2 control-label">Account</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="inputAccount" value="${user.account}" disabled/>
			</div>
		</div>
		<div class="form-group">
			<label for="inputPassword" class="col-sm-2 control-label">Password</label>
			<div class="col-sm-10">
				<input type="password" class="form-control" id="inputPassword" value="${user.pass}"/>
			</div>
		</div>
		<div class="form-group">
			<label for="inputEmail" class="col-sm-2 control-label">Email</label>
			<div class="col-sm-10">
				<input type="email" class="form-control" id="inputEmail" value="${user.email}" />
			</div>
		</div>
		<div class="form-group">
			<label for="inputSex" class="col-sm-2 control-label">Sex</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="inputSex" value="${user.sex}" disabled/>
			</div>
		</div>
		<div class="form-group">
			<label for="inputBirth" class="col-sm-2 control-label">Birthday</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="inputBirth" value="${user.birthday}" disabled/>
			</div>
		</div>
		
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<button type="submit" style="margin-left: 88%" class="btn btn-info">与服务器同步</button>
			</div>
		</div>
	</form>
</body>
</html>
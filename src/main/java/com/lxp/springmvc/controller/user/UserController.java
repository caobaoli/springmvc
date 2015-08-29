package com.lxp.springmvc.controller.user;

import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lxp.springmvc.service.UserService;
import com.lxp.springmvc.vo.User;

/**
 * @Package com.lxp.springmvc.controller.user
 * @Class com.lxp.springmvc.controller.user.UserController
 * @Description: operateuser
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@Controller
@RequestMapping("user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	/**
	 * 用户注册逻辑
	 */
	@RequestMapping(value="registuser")
	public void registUser(PrintWriter out, String param, User tempuser) {
		System.out.println(param);
		if("reg".equals(param)) {
			userService.add(tempuser);
			out.print("true");
		} else if("regValidate".equals(param)) {
			if(userService.findByAccount(tempuser.getAccount()) != null) {
				//给前台页面响应
				out.print("false");
			} else {
				//给前台页面响应
				out.print("true");
			}
		}
	} 
	
	/**
	 * 用户登录逻辑
	 */
	@RequestMapping(value="loginuser")
	public void loginUser(PrintWriter out, String param, User tempuser) {
	 	if("loginValidate".equals(param)) {
			User user = userService.findByAccount(tempuser.getAccount());
			if(tempuser.getPass().equals(user.getPass())) {
				//给前台页面响应
				out.print("true");
			} else {
				out.print("false");
			}
		} else if("login".equals(param)) {
			out.print("true");
		} else if("loginValidate2".equals(param)) {
			if(userService.findByAccount(tempuser.getAccount()) == null) {
				//给前台页面响应
				out.print("false");
			} else {
				//给前台页面响应
				out.print("true");
			}
		}
	}
}

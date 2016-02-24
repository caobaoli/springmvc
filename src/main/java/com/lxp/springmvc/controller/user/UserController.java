package com.lxp.springmvc.controller.user;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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
	private User user;
	/**
	 * 用户注册逻辑
	 */
	@RequestMapping(value="registuser")
	public void registUser(PrintWriter out, String param, User tempuser) {
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
	
	@RequestMapping(value="user_info")
	public ModelAndView userInfo(String account) {
		user = userService.findByAccount(account);
		if(user.getSex() != null && !"".equals(user.getSex())) {
			if("male".equals(user.getSex())) {
				user.setSex("男");
			} else if("famale".equals(user.getSex())) {
				user.setSex("女");
			}
		}
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("user", user);
		return new ModelAndView("user_info",model);
	}

}

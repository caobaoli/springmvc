package com.lxp.springmvc.controller.home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lxp.springmvc.service.UserService;
import com.lxp.springmvc.vo.User;

/**
 * @Package com.lxp.springmvc.controller.home
 * @Class com.lxp.springmvc.controller.home.HomeAction
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */

@Controller
@RequestMapping(value="/")
public class HomeAction {

	
	@RequestMapping(value="index")
	public String home() {
		return "index";
	}
	
	@RequestMapping(value="detail")
	public String questionDetail() {
		return "quest_detail";
	}
	
	
	
}

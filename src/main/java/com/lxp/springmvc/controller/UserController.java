package com.lxp.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Package com.lxp.springmvc.controller
 * @Class com.lxp.springmvc.controller.UserController
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@Controller
public class UserController {
	@RequestMapping(value="index")
	public String index() {
		return "index";
	}
}

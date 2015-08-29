package com.lxp.springmvc.service;

import com.lxp.springmvc.vo.User;

/**
 * @Package com.lxp.springmvc.service
 * @Class com.lxp.springmvc.service.UserService
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public interface UserService {
	public int add(User user);
	public User findByAccount(String account);
}

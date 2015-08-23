package com.lxp.springmvc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lxp.springmvc.dao.UserDao;
import com.lxp.springmvc.service.UserService;
import com.lxp.springmvc.vo.User;

/**
 * @Package com.lxp.springmvc.service.impl
 * @Class com.lxp.springmvc.service.impl.UserServiceImpl
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Override
	public int add(User user) {
		return userDao.insertUser(user);
	}

}

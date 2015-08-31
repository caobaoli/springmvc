package com.lxp.springmvc.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	@Transactional
	@Override
	public int add(User user) {
		String id = UUID.randomUUID().toString();
		user.setId(id);
		return userDao.insertUser(user);
	}

	@Transactional
	@Override
	public User findByAccount(String account) {
		return userDao.selectByAccount(account);
	}

}
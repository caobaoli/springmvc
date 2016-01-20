package com.lxp.springmvc.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lxp.springmvc.dao.UserDao;
import com.lxp.springmvc.service.UserService;
import com.lxp.springmvc.vo.User;
import com.mysql.fabric.xmlrpc.base.Data;

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
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int add(User user) {
		String id = UUID.randomUUID().toString();
		user.setId(id);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		user.setDate(dateFormat.format(new Date()));
		return userDao.insertUser(user);
	}

	@Transactional(readOnly = true)
	@Override
	public User findByAccount(String account) {
		return userDao.selectByAccount(account);
	}

}

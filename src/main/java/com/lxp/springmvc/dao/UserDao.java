package com.lxp.springmvc.dao;

import com.lxp.springmvc.vo.User;

/**
 * @Package com.lxp.springmvc.dao
 * @Class com.lxp.springmvc.dao.UserDao
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public interface UserDao {
	public int insertUser(User user);
	public User selectByAccount(String account);
}

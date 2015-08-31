package com.lxp.springmvc.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.lxp.springmvc.service.UserService;
import com.lxp.springmvc.vo.User;

/**
 * @Package com.lxp.springmvc.test
 * @Class com.lxp.springmvc.test.TestUserService
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:conf/spring*.xml"})
public class TestUserService {
	
	@Autowired
	private UserService userService;
	
    @Test
    public void addUser(){
    	User user = new User("61451a7g-eb8g-4cae-9d9f-cbaeaa89ba3a", "xiaoqiang", "xiaoqiang", "xiaoqiang@126.com", "male", "2014-09-09");
    	int i = userService.add(user);
    	System.out.println(i);
    }
    
    @Test
    public void findByAccount() {
    	User user = userService.findByAccount("xiaoqiang");
    	System.out.println(user);
    }
}

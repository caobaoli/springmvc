package com.lxp.springmvc.test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.lxp.springmvc.service.UserService;
import com.lxp.springmvc.vo.User;

/**
 * @Package com.lxp.springmvc.test
 * @Class com.lxp.springmvc.test.TestUserService
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public class TestUserService {

	private UserService userService;
	
	@Before
    public void before(){                                                                   
        @SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:conf/spring.xml"
                ,"classpath:conf/spring-mybatis.xml"});
        userService = (UserService) context.getBean("userServiceImpl");
    }
     
    @Test
    public void addUser(){
        User user = new User();
        user.setUsername("旺旺");
        user.setUserage(20);
        user.setUseraddress("陕西渭南");
        System.out.println(userService.add(user));
    }
}

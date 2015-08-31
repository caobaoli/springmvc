package com.lxp.springmvc.test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.lxp.springmvc.service.QuestionService;
import com.lxp.springmvc.vo.Question;

/**
 * @Package com.lxp.springmvc.test
 * @Class com.lxp.springmvc.test.TestQuestionService
 * @Description: 测试QuestionService方法
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:conf/spring*.xml"})
public class TestQuestionService {

	@Autowired
	private QuestionService questionService;
	
	@Test
	public void test() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Question question = new Question("bbb", "bbb", "xiaoxiao", format.format(new Date()));
		Integer i = questionService.addQuestion(question);
		System.out.println(i);
	}

	@Test
	public void testFindAll() {
		List<Question> list = questionService.findAllQuestion();
		System.out.println(list.size());
	}
}

package com.lxp.springmvc.service;

import java.util.List;

import com.lxp.springmvc.vo.Question;

/**
 * @Package com.lxp.springmvc.service
 * @Class com.lxp.springmvc.service.QuestionService
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public interface QuestionService {
	public Integer addQuestion(Question question);
	public List<Question> findAllQuestion();
	public List<Question> searchQuestion(String questionKey);
}

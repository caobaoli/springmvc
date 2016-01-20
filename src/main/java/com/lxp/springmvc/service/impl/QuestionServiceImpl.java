package com.lxp.springmvc.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lxp.springmvc.dao.QuestionDao;
import com.lxp.springmvc.service.QuestionService;
import com.lxp.springmvc.vo.Question;

/**
 * @Package com.lxp.springmvc.service.impl
 * @Class com.lxp.springmvc.service.impl.QuestionServiceImpl
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@Service
public class QuestionServiceImpl implements QuestionService {
	
	@Autowired
	private QuestionDao questionDao;
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public Integer addQuestion(Question question) {
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		question.setDate(format.format(date));
		return questionDao.insertQuestion(question);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Question> findAllQuestion() {
		return questionDao.selectQuestion();
	}

}

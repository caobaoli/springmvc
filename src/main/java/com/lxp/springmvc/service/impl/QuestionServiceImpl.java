package com.lxp.springmvc.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

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

	@Transactional(readOnly = true)
	@Override
	public List<Question> searchQuestion(String questionKey) {
		return questionDao.searchQuestion(questionKey);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Question> findRanQuestion() {
		Integer maxId = this.questionDao.selectMaxId();
		if(maxId != null) {
			Random random = new Random(System.currentTimeMillis());
			Integer ranParam = random.nextInt(maxId);
			return this.questionDao.selectRanQuestion(ranParam);
		}
		return null;
	}

	@Transactional(readOnly = true)
	@Override
	public List<Question> findMaxQuestion() {
		Integer maxCommCount = this.questionDao.selectCountComm();
		if(maxCommCount != null) {
			return this.questionDao.selectMaxQuestion(maxCommCount);
		}
		return null;
	}

	@Transactional(readOnly = true)
	@Override
	public Question findQuestionById(Integer questionId) {
		return this.questionDao.selectQuestionById(questionId);
	}

}

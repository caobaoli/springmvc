package com.lxp.springmvc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lxp.springmvc.vo.Question;

/**
 * @Package com.lxp.springmvc.dao
 * @Class com.lxp.springmvc.dao.QuestionDao
 * @Description: operateQuestion
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public interface QuestionDao {
	public Integer insertQuestion(Question question);
	public List<Question> selectQuestion();
	public List<Question> searchQuestion(@Param("questionKey")String questionKey);
}

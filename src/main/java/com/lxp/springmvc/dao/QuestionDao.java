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
	public Integer selectMaxId();
	public Integer selectCountComm();
	public List<Question> selectRanQuestion(@Param("ranParam")Integer ranParam);
	public List<Question> selectMaxQuestion(@Param("maxParam")Integer maxParam);
	public Question selectQuestionById(@Param("questionId") Integer questionId);
}

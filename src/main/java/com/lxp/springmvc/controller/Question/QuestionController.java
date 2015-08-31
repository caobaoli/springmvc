package com.lxp.springmvc.controller.Question;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lxp.springmvc.service.QuestionService;
import com.lxp.springmvc.vo.Question;

/**
 * @Package com.lxp.springmvc.controller.Question
 * @Class com.lxp.springmvc.controller.Question.QuestionController
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@Controller
@RequestMapping(value="question")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;
	
	/**
	 * 添加问题
	 * @param
	 */
	@RequestMapping(value="addquestion")
	public void addQuestion(PrintWriter out, Question question) {
		if(questionService.addQuestion(question)!=1) {
			out.print("false");
		} else {
			out.print("true");
		}
	}
	
	/**
	 * 获取问题
	 * @param
	 */
	@RequestMapping(value="findquestion")
	public void findQuestion(HttpServletResponse response, PrintWriter out) {
		List<Question> list = questionService.findAllQuestion();
		if(!list.isEmpty()) {
			 response.setContentType("text/html;charset=UTF-8");
			JSONArray jsonArray = JSONArray.fromObject(list);
			out.print(jsonArray);
		}
	}
	
}

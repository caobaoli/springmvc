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
		String content = question.getContent();
		if(!"".equals(content) && content != null) {
			content = content.substring(1, content.length()-1);
			question.setContent(content);
		}
		if(questionService.addQuestion(question)!=1) {
			out.print("false");
		} else {
			out.print("true");
		}
	}
	
	/**
	 * search question
	 * @param response
	 * @param out
	 * @param questionKey
	 */
	@RequestMapping(value="searchquestion")
	public void searchQuestion(HttpServletResponse response, PrintWriter out, String questionKey) {
		List<Question> list = questionService.searchQuestion(questionKey);
		if(!list.isEmpty()) {
			for (Question question : list) {
				String questionTitle = question.getTitle();
//				int firstLocation = questionTitle.indexOf(questionKey);
//				String preQuestionTitle = questionTitle.substring(0, firstLocation);
//				String sufQuestionTitle = questionTitle.substring(firstLocation+questionKey.length(), questionTitle.length());
//				String title = preQuestionTitle+"<span style=\"color:red;\">"+questionKey+"</span>"+sufQuestionTitle;
//				question.setTitle(title);
				question.setTitle(obtainString(questionKey, questionTitle));
			}
			response.setContentType("text/html;charset=UTF-8");
			JSONArray jsonArray = JSONArray.fromObject(list);
			out.print(jsonArray);
		}
	}
	
	/**
	 * 运用递归给Title中搜索关键字标红
	 * @param questionKey
	 * @param surplus
	 * @return
	 */
	public String obtainString(String questionKey, String surplus) {
		int firstLocation = surplus.indexOf(questionKey);
		String preQuestionTitle = surplus.substring(0, firstLocation);
		String sufQuestionTitle = surplus.substring(firstLocation+questionKey.length(), surplus.length());
		String middleQuestionTitle = sufQuestionTitle;
		if((sufQuestionTitle.indexOf(questionKey))>0) {
			middleQuestionTitle = obtainString(questionKey, sufQuestionTitle);
		}
		String title = preQuestionTitle+"<span style=\"color:red;\">"+questionKey+"</span>"+middleQuestionTitle;
		return title;
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

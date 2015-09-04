package com.lxp.springmvc.controller.comment;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lxp.springmvc.service.CommentService;
import com.lxp.springmvc.vo.Comment;

/**
 * @Package com.lxp.springmvc.controller.comment
 * @Class com.lxp.springmvc.controller.comment.CommentController
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@Controller
@RequestMapping(value="comment")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	/**
	 * 提交评论
	 */
	@RequestMapping(value="addcomment")
	public void addComment(Comment comment, PrintWriter out) {
		if(commentService.addComment(comment)==1) {
			out.print("true");
		} else {
			out.print("false");
		}
	}
	
	/**
	 * 获取评论
	 * @param
	 */
	@RequestMapping(value="findcomment")
	public void findComment(HttpServletResponse response, PrintWriter out) {
		List<Comment> list = commentService.findAllComment();
		if(!list.isEmpty()) {
			response.setContentType("text/html;charset=UTF-8");
			JSONArray jsonArray = JSONArray.fromObject(list);
			out.print(jsonArray);
		}
	}
}

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
	public void addComment(PrintWriter out, Comment comment) {
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
	@SuppressWarnings("static-access")
	@RequestMapping(value="findcomment")
	public void findComment(HttpServletResponse response, PrintWriter out,String titleId, Integer page) {
			try {
				Thread.currentThread().sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		List<Comment> list = commentService.findCommentById(titleId, page);
		if(!list.isEmpty()) {
			response.setContentType("text/html;charset=UTF-8");
			JSONArray jsonArray = JSONArray.fromObject(list);
			out.print(jsonArray);
		}
	}
}

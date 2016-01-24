package com.lxp.springmvc.service;

import java.util.List;

import com.lxp.springmvc.vo.Comment;

/**
 * @Package com.lxp.springmvc.service
 * @Class com.lxp.springmvc.service.CommentService
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public interface CommentService {
	public Integer addComment(Comment comment);
	public List<Comment> findCommentById(String titleId);
}

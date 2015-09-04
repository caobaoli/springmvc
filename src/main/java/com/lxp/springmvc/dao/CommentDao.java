package com.lxp.springmvc.dao;

import java.util.List;

import com.lxp.springmvc.vo.Comment;

/**
 * @Package com.lxp.springmvc.dao
 * @Class com.lxp.springmvc.dao.CommentDao
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public interface CommentDao {
	public Integer insertComment(Comment comment);
	public List<Comment> selectComment();
}

package com.lxp.springmvc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

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
	public List<Comment> selectComment(@Param("titleId") String titleId, @Param("pageBegin") Integer pageBegin, @Param("pageEnd") Integer pageEnd);
	public Integer selectCommentCount(@Param("titleId") String titleId);
}

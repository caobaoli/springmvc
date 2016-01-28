package com.lxp.springmvc.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lxp.springmvc.dao.CommentDao;
import com.lxp.springmvc.service.CommentService;
import com.lxp.springmvc.vo.Comment;

/**
 * @Package com.lxp.springmvc.service.impl
 * @Class com.lxp.springmvc.service.impl.CommentServiceImpl
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentDao commentDao;
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public Integer addComment(Comment comment) {
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		comment.setDate(format.format(date));
		return commentDao.insertComment(comment);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Comment> findCommentById(String titleId, Integer page) {
		Integer pageBegin = page*5;
		Integer pageEnd = page*5+5;
		Integer count = this.commentDao.selectCommentCount(titleId);
		if(pageEnd > 5) {
			pageEnd = count; 
		}
		List<Comment> list = commentDao.selectComment(titleId, pageBegin, pageEnd);
		for (Comment comment : list) {
			if(count != null) {
				comment.setCount(count);
			}
		}
		return list;
	}

}

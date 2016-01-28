package com.lxp.springmvc.vo;

import java.io.Serializable;

/**
 * @Package com.lxp.springmvc.vo
 * @Class com.lxp.springmvc.vo.Comment
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@SuppressWarnings("serial")
public class Comment implements Serializable {
	private Integer id;
	private Integer titleid;
	private String comment;
	private String user;
	private String date;
	private Integer count;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getTitleid() {
		return titleid;
	}
	public void setTitleid(Integer titleid) {
		this.titleid = titleid;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	@Override
	public String toString() {
		return "Comment [id=" + id + ", titleid=" + titleid + ", comment="
				+ comment + ", user=" + user + ", date=" + date + "]";
	}
	public Comment(Integer titleid, String comment, String user, String date) {
		super();
		this.titleid = titleid;
		this.comment = comment;
		this.user = user;
		this.date = date;
	}
	
	public Comment() {
	}
}

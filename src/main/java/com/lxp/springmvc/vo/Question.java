package com.lxp.springmvc.vo;

import java.io.Serializable;

/**
 * @Package com.lxp.springmvc.vo
 * @Class com.lxp.springmvc.vo.Question
 * @Description: Question-vo
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@SuppressWarnings("serial")
public class Question implements Serializable {
	private Integer id;
	private String title;
	private String content;
	private String user;
	private String date;
	private Integer count;
	
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
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
	
	public Question() {
	}
	public Question(String title, String content, String user, String date) {
		super();
		this.title = title;
		this.content = content;
		this.user = user;
		this.date = date;
	}
	@Override
	public String toString() {
		return "Question [id=" + id + ", title=" + title + ", content="
				+ content + ", user=" + user + ", date=" + date + "]";
	}
	
	
}

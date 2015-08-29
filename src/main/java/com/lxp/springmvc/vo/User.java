package com.lxp.springmvc.vo;

import java.io.Serializable;

/**
 * @Package com.lxp.springmvc.vo
 * @Class com.lxp.springmvc.vo.User
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
@SuppressWarnings("serial")
public class User implements Serializable {
	private String id;
	private String account;
	private String pass;
	private String email;
	private String sex;
	private String date;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public User() {
		// TODO Auto-generated constructor stub
	}
	public User(String id, String account, String pass, String email,
			String sex, String date) {
		super();
		this.id = id;
		this.account = account;
		this.pass = pass;
		this.email = email;
		this.sex = sex;
		this.date = date;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", account=" + account + ", pass=" + pass
				+ ", email=" + email + ", sex=" + sex + ", date=" + date + "]";
	}
	
	
	
}

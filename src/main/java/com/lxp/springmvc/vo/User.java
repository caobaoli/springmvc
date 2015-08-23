package com.lxp.springmvc.vo;

import java.io.Serializable;

/**
 * @Package com.lxp.springmvc.vo
 * @Class com.lxp.springmvc.vo.User
 * @Description: TODO
 * @Author LiXiaoPeng
 * Copyright  Corporation 2015
 */
public class User implements Serializable {
	private Integer id;
	private String username;
	private Integer userage;
	private String useraddress;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Integer getUserage() {
		return userage;
	}
	public void setUserage(Integer userage) {
		this.userage = userage;
	}
	public String getUseraddress() {
		return useraddress;
	}
	public void setUseraddress(String useraddress) {
		this.useraddress = useraddress;
	}
	
	
}

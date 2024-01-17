package com.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Patient {
	private String name;
	private int age;
	private String phoneNo;
	@Id
	private String emailId;
	private String password;

	public Patient() {
		super();
	}
	public Patient(String name, int age, String phoneNo, String emailId, String password) {
		super();
		this.name = name;
		this.age = age;
		this.phoneNo = phoneNo;
		this.emailId = emailId;
		this.password = password;
	}
	public Patient(String emailId) {
		super();
		this.emailId = emailId;
	}
	public Patient(String emailId, String password) {
		super();
		this.emailId = emailId;
		this.password = password;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}

	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	

}

package com.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Appointment {

	@Id@GeneratedValue
	private int pId;
	private String pName;
	private int pAge;
	private String gender;
	private String pPhoneNo;
	private String pEmailId;
	private LocalDate appDate;
	private int docId;

	public Appointment() {
		super();
	}

	public Appointment(int pId, String pName, int pAge, String gender, String pPhoneNo, String pEmailId, LocalDate appDate, int docId) {
		super();
		this.pId = pId;
		this.pName = pName;
		this.pAge = pAge;
		this.gender = gender;
		this.pPhoneNo = pPhoneNo;
		this.pEmailId = pEmailId;
		this.appDate = appDate;
		this.docId = docId;
	}

	public int getpId() {
		return pId;
	}
	public void setpId(int pId) {
		this.pId = pId;
	}

	public String getpName() {
		return pName;
	}
	public void setpName(String pName) {
		this.pName = pName;
	}

	public int getpAge() {
		return pAge;
	}
	public void setpAge(int pAge) {
		this.pAge = pAge;
	}

	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getpPhoneNo() {
		return pPhoneNo;
	}
	public void setpPhoneNo(String pPhoneNo) {
		this.pPhoneNo = pPhoneNo;
	}

	public String getpEmailId() {
		return pEmailId;
	}
	public void setpEmailId(String pEmailId) {
		this.pEmailId = pEmailId;
	}

	public LocalDate getAppDate() {
		return appDate;
	}
	public void setAppDate(LocalDate appDate) {
		this.appDate = appDate;
	}

	public int getDocId() {
		return docId;
	}
	public void setDocId(int docId) {
		this.docId = docId;
	}

}

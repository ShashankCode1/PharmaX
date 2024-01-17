package com.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class LabTest {

	@Id@GeneratedValue
	private int patId;
	private String patName;
	private int patAge;
	private String patPhoneNo;
	private String patEmail;
	private String labTest;
	private LocalDate labDate;

	public LabTest() {
		super();
	}

	public LabTest(int patId, String patName, int patAge, String patPhoneNo, String patEmail, String labTest, LocalDate labDate) {
		super();
		this.patId = patId;
		this.patName = patName;
		this.patAge = patAge;
		this.patPhoneNo = patPhoneNo;
		this.patEmail = patEmail;
		this.labTest = labTest;
		this.labDate = labDate;
	}

	public int getPatId() {
		return patId;
	}
	public void setPatId(int patId) {
		this.patId = patId;
	}

	public String getPatName() {
		return patName;
	}
	public void setPatName(String patName) {
		this.patName = patName;
	}

	public int getPatAge() {
		return patAge;
	}
	public void setPatAge(int patAge) {
		this.patAge = patAge;
	}

	public String getPatPhoneNo() {
		return patPhoneNo;
	}
	public void setPatPhoneNo(String patPhoneNo) {
		this.patPhoneNo = patPhoneNo;
	}

	public String getPatEmail() {
		return patEmail;
	}
	public void setPatEmail(String patEmail) {
		this.patEmail = patEmail;
	}

	public String getLabTest() {
		return labTest;
	}
	public void setLabTest(String labTest) {
		this.labTest = labTest;
	}

	public LocalDate getLabDate() {
		return labDate;
	}
	public void setLabDate(LocalDate labDate) {
		this.labDate = labDate;
	}

}

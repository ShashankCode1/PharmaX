package com.dao;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


import com.model.Patient;
import com.model.PatientOtp;

@Service
public class PatientDao {

	@Autowired
	PatientRepository patientRepository;
	@Autowired
	PatientOtp patientOtp;
	@Autowired
	JavaMailSender mailSender;


	public Patient registerPatient(Patient patient) {
		if(patientRepository.existsById(patient.getEmailId())) {
			return null;
		}
		BCryptPasswordEncoder bcpe = new BCryptPasswordEncoder();
		String encryptedPw = bcpe.encode(patient.getPassword());
		patient.setPassword(encryptedPw);
		return patientRepository.save(patient);
	}

	public boolean EmailOtp(Patient patient) {
		Patient pat = patientRepository.findByEmailId(patient.getEmailId());
		if(pat != null) {
			int otp = (int) (Math.random() * 900000) + 100000;
			LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(3);
			patientOtp.setEmailOtp(otp);
			patientOtp.setEmailOtpExpiryTime(expiryTime);
			SimpleMailMessage msg = new SimpleMailMessage();
			msg.setTo(pat.getEmailId());
			msg.setSubject("Your OTP Code");
			msg.setText("Your OTP code is " + otp + "\n\nFrom PharmaX");

			mailSender.send(msg);
			return true;
		}
		return false;
	}

	public Patient validateEmailOtp(String emailId, int otp) {
		Patient pat = patientRepository.findByEmailId(emailId);
		if (pat != null) {
			if (patientOtp.getEmailOtp() == otp && patientOtp.getEmailOtpExpiryTime().isAfter(LocalDateTime.now())) {
				patientOtp.setEmailOtp(0);
				patientOtp.setEmailOtpExpiryTime(null);
				return pat;
			}
		}
		return null;
	}


	public Patient patientLogin(Patient patient) {
		Patient pat = patientRepository.findByEmailId(patient.getEmailId());
		if(pat != null) {
			BCryptPasswordEncoder bcpe = new BCryptPasswordEncoder();
			if(bcpe.matches(patient.getPassword(), pat.getPassword())) {
				return pat;
			}
		}
		return null;
	}

	public boolean setPassword(Patient patient) {
		Patient pat = patientRepository.findByEmailId(patient.getEmailId());
		if(pat != null) {
			BCryptPasswordEncoder bcpe = new BCryptPasswordEncoder() ;
			String encryptedPw = bcpe.encode(patient.getPassword());
			pat.setPassword(encryptedPw);
			patientRepository.save(pat);
			return true;
		}
		return false;
	}

	public boolean phoneOtp(String phoneNo) {
		Patient pat = patientRepository.findByPhoneNo(phoneNo);
		if(pat != null) {
			int otp = (int) (Math.random() * 9000) + 1000;
			LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(3);
			patientOtp.setPhoneOtp(otp);
			patientOtp.setPhoneOtpExpiryTime(expiryTime);
			Message.creator(new PhoneNumber(pat.getPhoneNo()), new PhoneNumber("+16787011918"), "Hello " + pat.getName() + ", Your OTP Code is : " + otp + "\n\nFrom PharmaX").create();
			return true;
		}
		return false;
	}

	public boolean validatePhoneOtp(String phoneNo, int otp) {
		Patient pat = patientRepository.findByPhoneNo(phoneNo);
		if(pat != null) {
			if(patientOtp.getPhoneOtp() == otp && patientOtp.getPhoneOtpExpiryTime().isAfter(LocalDateTime.now())) {
				patientOtp.setPhoneOtp(0);
				patientOtp.setPhoneOtpExpiryTime(null);
				return true;
			}
		}
		return false;
	}

	public boolean setPasswordByPhone(String phoneNo, String password) {
		Patient pat = patientRepository.findByPhoneNo(phoneNo);
		if(pat != null) {
			BCryptPasswordEncoder bcpe = new BCryptPasswordEncoder() ;
			String encryptedPw = bcpe.encode(password);
			pat.setPassword(encryptedPw);
			patientRepository.save(pat);
			return true;			
		}
		return false;
	}

	//EmailServices for Registration 
	public void sendEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

}

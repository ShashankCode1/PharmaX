package com.ts.PharmaX;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dao.PatientDao;
import com.model.Patient;

@RestController
public class PatientController {

	@Autowired
	PatientDao patientDao;

	@PostMapping("registerPatient")
	public ResponseEntity<Map<String, String>> registerPatient(@RequestBody Patient patient) {
		Map <String, String> response = new HashMap<>();
		Patient pat = patientDao.registerPatient(patient);
		if(pat != null) {
			response.put("message", "Registration Success");
			sendConfirmationEmail(pat);
		}
		else {
			response.put("message", "Registration Failed");
		}
		return ResponseEntity.ok(response);
	}
	
	//Email Services for Registration
	public void sendConfirmationEmail(Patient patient) {
		String emailSubject = "Welcome to PharmaX";
		String emailMessage = "Hello " + patient.getName() + ",\n"
				+ "Thank you for choosing PharmaX! Our services are designed to simplify your healthcare journey.\n\n"
				+ "• Book doctor appointments.\n• Schedule lab tests.\n• Order quality medicines.\n\n"
				+ "Your well-being is our priority.\n\n"
				+ "Best regards,\nPharmaX Team";
		patientDao.sendEmail(patient.getEmailId(), emailSubject, emailMessage);
	}

	@PostMapping("emailOtp")
	public ResponseEntity<Map<String, String>> EmailOtp(@RequestBody Patient patient) {
		Map <String, String> response = new HashMap<>();
		if(patientDao.EmailOtp(patient)) {
			response.put("message", "OTP is Sent");
		}
		else {
			response.put("message", "Invalid Email");
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping("validateEmailOtp/{emailId}/{otp}")
	public ResponseEntity<Map<String, String>> validateEmailOtp(@PathVariable("emailId") String emailId, @PathVariable("otp") int otp) {
		Map<String, String> response = new HashMap<>();

		Patient pat = patientDao.validateEmailOtp(emailId, otp);

		if (pat != null) {
			response.put("message", "OTP Verified");
			response.put("name", pat.getName());
			response.put("age", String.valueOf(pat.getAge()));
			response.put("phoneNo", pat.getPhoneNo());
			response.put("emailId", pat.getEmailId());
		} else {
			response.put("message", "Invalid OTP");
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping("patientLogin")
	public ResponseEntity<Map<String, String>> patientLogin(@RequestBody Patient patient) {
		Map <String, String> response = new HashMap<>();
		Patient pat = patientDao.patientLogin(patient);
		if(pat != null) {
			response.put("message", "Login Success");
			response.put("name", pat.getName());
			response.put("age", String.valueOf(pat.getAge()));
			response.put("phoneNo", pat.getPhoneNo());
			response.put("emailId", pat.getEmailId());
		}
		else {
			response.put("message", "Invalid EmailId or Password");
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping("setPassword")
	public ResponseEntity<Map<String, String>> setPassword(@RequestBody Patient patient) {
		Map <String, String> response = new HashMap<>();
		if(patientDao.setPassword(patient)) {
			response.put("message", "Password Updated");
		}
		else {
			response.put("message", "Failed to Update Password");
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping("phoneOtp/{phoneNo}")
	public ResponseEntity<Map<String, String>> phoneOtp(@PathVariable("phoneNo") String phoneNo) {
		Map <String, String> response = new HashMap<>();
		if(patientDao.phoneOtp(phoneNo)) {
			response.put("message", "OTP is Sent");
		}
		else {
			response.put("message", "Invalid PhoneNo");
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping("validatePhoneOtp/{phoneNo}/{otp}")
	public ResponseEntity<Map<String, String>> validatePhoneOtp(@PathVariable("phoneNo") String phoneNo, @PathVariable("otp") int otp) {
		Map <String, String> response = new HashMap<>();
		if(patientDao.validatePhoneOtp(phoneNo, otp)) {
			response.put("message", "OTP Verified");
		}
		else {
			response.put("message", "Invalid OTP");
		}
		return ResponseEntity.ok(response);
	}

	@PutMapping("setPasswordByPhone/{phoneNo}/{password}")
	public ResponseEntity<Map<String, String>> setPasswordByPhone(@PathVariable("phoneNo") String phoneNo, @PathVariable("password") String password) {
		Map <String, String> response = new HashMap<>();
		if(patientDao.setPasswordByPhone(phoneNo, password)) {
			response.put("message", "Password Updated");
		}
		else {
			response.put("message", "Failed to Update Password");
		}
		return ResponseEntity.ok(response);
	}


}

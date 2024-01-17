package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import com.model.LabTest;

@Service
public class LabTestDao {

	@Autowired
	LabTestRepository labTestRepository;
	@Autowired
	JavaMailSender mailSender;


	public LabTest bookLabTest(LabTest labTest) {
		if(labTest.getLabDate().isBefore(LocalDate.now())) {
			return null;
		}
		return labTestRepository.save(labTest);	
	}

	public void removeOutdatedRegistrations() {
		LocalDate currentDate = LocalDate.now();
		List<LabTest> outdatedRegistrations = labTestRepository.findOutdatedLabTests(currentDate);

		for (LabTest labTest : outdatedRegistrations) {
			labTestRepository.delete(labTest);
		}
	}

	public List<LabTest> getLabTests() {
		return labTestRepository.findAll();
	}

	public void sendEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

}

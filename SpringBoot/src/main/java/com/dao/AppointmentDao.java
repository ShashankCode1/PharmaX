package com.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.model.Appointment;

@Service
public class AppointmentDao {

	@Autowired
	AppointmentRepository appointmentRepository;
	@Autowired
	JavaMailSender mailSender;

	public Appointment bookAppointment(Appointment appointment) {
		if(appointment.getAppDate().isBefore(LocalDate.now())) {
			return null;
		}
		return appointmentRepository.save(appointment);
	}
	
	public void sendEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

	public List<Appointment> getAppointments() {
		return appointmentRepository.findAll();
	}

	public List<Appointment> getAppointmentsByDocId(int docId) {
		return appointmentRepository.findByDocId(docId);
	}

}

package com.ts.PharmaX;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dao.AppointmentDao;
import com.model.Appointment;

@RestController
public class AppointmentController {

	@Autowired
	AppointmentDao appointmentDao;

	//Book Appointments
	@PostMapping("bookAppointment")
	public ResponseEntity<Map<String, String>> bookAppointment(@RequestBody Appointment appointment) {
		Map <String, String> response = new HashMap<>();
		Appointment app = appointmentDao.bookAppointment(appointment);
		if(app != null) {
			response.put("message", "Appointment Booked");
			sendConfirmationEmail(app);
		}
		else {
			response.put("message", "Failed Booking");
		}
		return ResponseEntity.ok(response);
	}
	
	//Appointment Success Confirmation
	public void sendConfirmationEmail(Appointment appointment) {
		String emailSubject = "Appointment Confirmation";
		String emailMessage = "Hello " + appointment.getpName() + ",\n\n"
				+ "Your Appointment has been scheduled for " + appointment.getAppDate() + " with our Doctor Id : " + appointment.getDocId() + ".\n"
				+ "Thank you for choosing our services.\n\n"
				+ "Best regards,\nPharmaX Team";

		appointmentDao.sendEmail(appointment.getpEmailId(), emailSubject, emailMessage);
	}

	//Get Appointments
	@GetMapping("getAppointments")
	public List<Appointment> getAppointments() {
		return appointmentDao.getAppointments();
	}

	//Get Appointments by docId
	@GetMapping("getAppointmentsByDocId/{docId}")
	public List<Appointment> getAppointmentsByDocId(@PathVariable("docId") int docId) {
		return appointmentDao.getAppointmentsByDocId(docId);
	}

}

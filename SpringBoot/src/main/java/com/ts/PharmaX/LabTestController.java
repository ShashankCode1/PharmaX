package com.ts.PharmaX;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dao.LabTestDao;
import com.model.LabTest;

@RestController
public class LabTestController {

	@Autowired
	LabTestDao labTestDao;

	@PostMapping("bookLabTest")
	public ResponseEntity<Map<String, String>> bookLabTest(@RequestBody LabTest labTest) {
		Map <String, String> response = new HashMap<>();
		LabTest lab = labTestDao.bookLabTest(labTest);
		if(lab != null) {
			response.put("message", "Schedule Success");
			sendConfirmationEmail(lab);
		}
		else {
			response.put("message", "Schedule Failed");
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("getLabTests")
	public List<LabTest> getLabTests() {
		return labTestDao.getLabTests();
	}

	private void sendConfirmationEmail(LabTest labTest) {
		String emailSubject = "Lab Test Scheduled Confirmation";
		String emailMessage = "Hello " + labTest.getPatName() + ",\n\n"
				+ "Your lab test has been scheduled for " + labTest.getLabDate() + ".\n"
				+ "Thank you for choosing our services.\n\n"
				+ "Best regards,\nPharmaX Team";

		labTestDao.sendEmail(labTest.getPatEmail(), emailSubject, emailMessage);
	}

}

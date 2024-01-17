package com.ts.PharmaX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dao.RazorpayService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	RazorpayService razorpayService;

	@PostMapping("/order")
	public ResponseEntity<String> createOrder(@RequestBody String amount) {
	    try {
	        String orderId = razorpayService.createOrder(amount);
	        return ResponseEntity.ok().body("{\"orderId\":\"" + orderId + "\"}");
	    } catch(RazorpayException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	    }
	}


}

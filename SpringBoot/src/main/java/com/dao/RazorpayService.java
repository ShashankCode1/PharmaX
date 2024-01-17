package com.dao;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class RazorpayService {

	private static final String RAZORPAY_API_KEY = "rzp_test_b1lbJXMZHdtNhH";
	private static final String RAZORPAY_API_SECRET = "QrMXAOv5YXnNJa9AHE7CZWmq";

	public String createOrder(String amount) throws RazorpayException {
		RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_API_KEY, RAZORPAY_API_SECRET);

		JSONObject options = new JSONObject();

		options.put("amount", Integer.parseInt(amount) * 100); //Convert to paisa
		options.put("currency", "INR");
		options.put("receipt", "txn_" + System.currentTimeMillis());

		Order order = razorpayClient.Orders.create(options);
		return order.get("id");
	}

}

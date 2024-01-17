package com.ts.PharmaX;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.twilio.Twilio;

@EnableJpaRepositories(basePackages="com.dao")
@EntityScan(basePackages="com.model")
@SpringBootApplication(scanBasePackages="com")
public class PharmaXApplication {

	public static final String ACCOUNT_SID = "AC3088b1b619fab198dfaafee129d53efd";
	public static final String AUTH_TOKEN = "8a3e85cac21c5feda58f632e25f585e7";

	public static void main(String[] args) {
		SpringApplication.run(PharmaXApplication.class, args);
	}

	@PostConstruct
	public void initTwilio(){
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	}
}

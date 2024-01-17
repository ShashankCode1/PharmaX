import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  continuePassword: boolean = false;
  currentStep: 'email' | 'otp';
  forgotStep: 'emailStep' | 'otpStep' | 'setPasswordStep';
  emailId = "";
  emailOption: boolean = false;
  phoneForgotStep: 'phoneNumberStep' | 'phoneOtpStep' | 'setPasswordPhoneStep';
  phoneNo = "";
  phoneOption: boolean = false;
  fullphoneNo = "";
  isSending: boolean = false;

  constructor(private router: Router, private service: PatientService, private toastr: ToastrService) {
    this.currentStep = 'email';
    this.forgotStep = 'emailStep';
    this.phoneForgotStep = 'phoneNumberStep';
  }


  displayPassword() {
    this.continuePassword = !this.continuePassword;
  }

  displayEmailOption() {
    this.emailOption = !this.emailOption;
  }

  displayPhoneOption() {
    this.phoneOption = !this.phoneOption;
  }

  validateFullPhone(phone: string): any {
    this.fullphoneNo = "+91" + phone;
  }

  signUp() {
    this.router.navigate(['signup']);
  }

  //Login using Email
  verifyEmail(emailForm: any) {
    this.isSending = true;
    this.emailId = emailForm.emailId;

    this.service.sendOtp(emailForm.emailId).subscribe(response => {
      this.isSending = false;
      if (response.message === "OTP is Sent") {
        this.toastr.success("OTP Sent");
        this.currentStep = 'otp';
      } else {
        this.toastr.error("Invalid Email", "Failed")
      }
    });
  }

  //Login using Email OTP
  verifyOtp(otpForm: any) {
    this.service.verifyOtp(this.emailId, otpForm.otp).subscribe(response => {
      if (response.message === "OTP Verified") {
        localStorage.setItem("name", response.name);
        localStorage.setItem("age", response.age.toString());
        localStorage.setItem("phoneNo", response.phoneNo);
        localStorage.setItem("emailId", response.emailId);
        //this.toastr.success("Login Sucess");
        this.service.setUserLoggedIn();
        this.router.navigate(['homepage']);
      } else {
        this.toastr.error("Invalid OTP", "Failed");
      }
    });
  }

  //Login Method
  verifyLogin(loginForm: any) {

    if (loginForm.emailId == "doc" && loginForm.password == "doc") {
      //this.toastr.success("Login Success", "Doctor");
      this.service.setDoctorLoggedIn();
      this.router.navigate(['patientList']);
    } else if (loginForm.emailId == "lab" && loginForm.password == "lab") {
      //this.toastr.success("Login Success", "Lab");
      this.service.setLabLoggedIn();
      this.router.navigate(['showlabtests']);
    } else {
      this.service.patientLogin(loginForm.emailId, loginForm.password).subscribe(response => {
        console.log("Email:", loginForm.emailId, "Password:", loginForm.password);
        if (response.message === "Login Success") {
          localStorage.setItem("name", response.name);
          localStorage.setItem("age", response.age.toString());
          localStorage.setItem("phoneNo", response.phoneNo);
          localStorage.setItem("emailId", response.emailId);
          this.service.setUserLoggedIn();
          //this.toastr.success("Login Success");
          this.router.navigate(['homepage']);
        } else {
          this.toastr.error("Invalid Credentials", "Failed");
        }
      });
    }

  }

  //verify Email (Forgot Password)
  validateEmail(emailForm: any) {
    this.isSending = true;
    this.emailId = emailForm.emailId;

    this.service.sendOtp(emailForm.emailId).subscribe(response => {
      this.isSending = false;
      if (response.message === "OTP is Sent") {
        this.toastr.success("OTP Sent");
        this.forgotStep = 'otpStep';
      } else {
        this.toastr.error("Invalid Email", "Failed")
      }
    });

  }

  //verify Email OTP (Forgot Password)
  validateOtp(otpForm: any) {
    this.service.verifyOtp(this.emailId, otpForm.otp).subscribe(response => {
      if (response.message === "OTP Verified") {
        this.toastr.success("OTP Verified");
        this.forgotStep = 'setPasswordStep';
      } else {
        this.toastr.error("Invalid OTP", "Failed");
      }
    });
  }

  //setPassword using Email and Password
  setPassword(setPasswordForm: any) {
    this.service.setPassword(this.emailId, setPasswordForm.password).subscribe(response => {
      if (response.message === 'Password Updated') {
        this.toastr.success("You can Login now !!!", "Password Updated");
      } else {
        this.toastr.error("Failed to Update", "Failed");
      }
      console.log(setPasswordForm);
    });
  }

  validateRepeat(password: string, rpassword: string): boolean {
    return password == rpassword;
  }

  //verify PhoneNumber (Forgot Password)
  verifyPhoneNumber(phoneForm: any) {
    this.isSending = true;
    this.validateFullPhone(phoneForm.phone);
    phoneForm.phoneNo = this.fullphoneNo;
    this.phoneNo = phoneForm.phoneNo;

    this.service.sendPhoneOtp(phoneForm.phoneNo).subscribe(response => {
      this.isSending = false;
      if (response.message === "OTP is Sent") {
        this.toastr.success("OTP Sent");
        this.phoneForgotStep = 'phoneOtpStep';
      } else {
        this.toastr.error("Invalid PhoneNo", "Failed")
      }
    });
  }

  //verify PhoneOTP
  verifyPhoneOtp(phoneOtpForm: any) {
    this.service.verifyPhoneOtp(this.phoneNo, phoneOtpForm.otp).subscribe(response => {
      if (response.message === "OTP Verified") {
        this.toastr.success("OTP Verified");
        this.phoneForgotStep = 'setPasswordPhoneStep';
      } else {
        this.toastr.error("Invalid OTP", "Failed");
      }
    });
  }

  //setPassword using PhoneNumber and Password
  setPasswordByPhone(setPasswordByPhoneForm: any) {
    this.service.setPasswordByPhone(this.phoneNo, setPasswordByPhoneForm.password).subscribe(response => {
      if (response.message === 'Password Updated') {
        this.toastr.success("You can Login now !!!", "Password Updated");
      } else {
        this.toastr.error("Failed to Update", "Failed");
      }
      console.log(setPasswordByPhoneForm);
    });
  }


}

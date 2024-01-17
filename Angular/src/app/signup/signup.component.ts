import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullphoneNo = "";
  siteKey = "6LdRSk4oAAAAAEkBHsycobfqb_R5_f8VRkJOwuRz";
  captchaVerified = false;
  isSending: boolean = false;

  constructor(private router: Router, private service: PatientService, private toastr: ToastrService) { }

  signIn() {
    this.router.navigate(['signin']);
  }

  rPassword(password: string, rpassword: string): boolean {
    return password == rpassword;
  }

  validateFullPhone(phone: string): any {
    this.fullphoneNo = "+91" + phone;
  }

  validateReg(regForm: any) {
    this.isSending = true;
    console.log(regForm);
    this.validateFullPhone(regForm.phone);
    regForm.phoneNo = this.fullphoneNo;
    console.log(regForm);

    this.service.registerPatient(regForm).subscribe((response: any) => {
      this.isSending = false;
      if (response.message === "Registration Success") {
        this.toastr.success("You're Officially PharmaX Member", "Success");
        this.router.navigate(['signin']);
      } else {
        this.toastr.error("EmailId already in Use", "Failed");
      }
    });
  }

}

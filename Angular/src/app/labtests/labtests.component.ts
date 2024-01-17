import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-labtests',
  templateUrl: './labtests.component.html',
  styleUrls: ['./labtests.component.css']
})
export class LabtestsComponent {
  name: string;
  age: number | null;
  phoneNo: string;
  emailId: string;
  selfBooking: boolean = true;
  isSending: boolean = false;

  constructor(private toastr: ToastrService, private service: PatientService) {
    this.name = localStorage.getItem("name") || "";
    this.age = localStorage.getItem("age") ? parseInt(localStorage.getItem("age") as string) : null;
    this.phoneNo = localStorage.getItem("phoneNo") || "";
    this.emailId = localStorage.getItem("emailId") || "";
  }


  validateLab(labForm: any) {
    this.isSending = true;
    this.service.bookLabTest(labForm).subscribe(response => {
      this.isSending = false;
      if (response.message === "Schedule Success") {
        this.toastr.success("You'll receive an email shortly!", "Schedule Success");
      } else {
        this.toastr.error("Enter a Valid Date", "Failed");
      }
    });
  }

  toggleBooking() {
    this.selfBooking = !this.selfBooking;
  }

}

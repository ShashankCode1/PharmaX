import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

  doctors: any;
  name: string;
  age: number | null;
  phoneNo: string;
  emailId: string;

  constructor(private paymentService: PatientService, private service: PatientService, private toastr: ToastrService) {
    this.doctors = [
      { docId: 101, docName: "Dr. Srilekha", specialisation: "GENERAL SURGEON", experience: "4 YRS EXP", qualification: "MBBS, MS", opfee: "300", languages: "English, Hindi, Telugu", imgsrc: "assets/Images/Doctors/Dr. Srilekha.png" },
      { docId: 102, docName: "Dr. Shashank", specialisation: "FAMILY PHYSICIAN", experience: "3 YRS EXP", qualification: "MBBS", opfee: "250", languages: "English, Hindi, Telugu", imgsrc: "assets/Images/Doctors/Dr. Shashank.jpg" },
      { docId: 103, docName: "Dr. Sandeep", specialisation: "DIABETOLOGIST", experience: "3 YRS EXP", qualification: "MBBS, MD", opfee: "350", languages: "English, Telugu", imgsrc: "assets/Images/Doctors/Dr. Sandeep.jpg" },
      { docId: 104, docName: "Dr. Madhavan", specialisation: "ORTHOPAEDICIAN", experience: "10 YRS EXP", qualification: "MBBS, MS", opfee: "600", languages: "English, Hindi", imgsrc: "assets/Images/Doctors/Dr. Madhavan.png" },
      { docId: 105, docName: "Dr. Deepa", specialisation: "ENT SPECIALIST", experience: "6 YRS EXP", qualification: "FRCS, ENT", opfee: "350", languages: "Hindi, Telugu", imgsrc: "assets/Images/Doctors/Dr. Deepa.jpg" },
      { docId: 106, docName: "Dr. Bhawana", specialisation: "DENTIST", experience: "7 YRS EXP", qualification: "BDS", opfee: "400", languages: "English, Hindi", imgsrc: "assets/Images/Doctors/Dr. Bhawana.jpg" },
      { docId: 107, docName: "Dr. Latha", specialisation: "DIETICIAN", experience: "2 YRS EXP", qualification: "MSc", opfee: "200", languages: "English, Hindi", imgsrc: "assets/Images/Doctors/Dr. Latha.jpg" },
      { docId: 108, docName: "Dr. Diana", specialisation: "DERMATOLOGIST", experience: "4 YRS EXP", qualification: "MBBS, MD", opfee: "350", languages: "English, Hindi", imgsrc: "assets/Images/Doctors/Dr. Diana.jpg" }
    ]
    this.name = localStorage.getItem("name") || "";
    this.age = localStorage.getItem("age") ? parseInt(localStorage.getItem("age") as string) : null;
    this.phoneNo = localStorage.getItem("phoneNo") || "";
    this.emailId = localStorage.getItem("emailId") || "";
  }

  //Scheduling Appointment
  validateAppForm(appForm: any) {
    this.service.bookAppointment(appForm).subscribe(response => {
      console.log(appForm);
    });
  }

  //Appointment Payment
  makePayment(amount: string) {
    this.paymentService.initiatePayment(amount).subscribe(
      response => {
        const parsedResponse = JSON.parse(response);
        this.paymentService.openRazorpay(parsedResponse.orderId, amount);
      });
  }

}

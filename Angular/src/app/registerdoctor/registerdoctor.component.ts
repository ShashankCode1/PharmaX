import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registerdoctor',
  templateUrl: './registerdoctor.component.html',
  styleUrls: ['./registerdoctor.component.css']
})
export class RegisterdoctorComponent {
  
  constructor(private service: PatientService, private toastr: ToastrService) { }

  validateReg(regDocForm: any) {

    this.service.registerDoctor(regDocForm).subscribe(response => {
      if (response.message === "Registration Success") {
        this.toastr.success("Doctor Added", "Success");
      } else {
        this.toastr.error("Doctor ID already Exists", "Failed");
      }
    });
  }

}



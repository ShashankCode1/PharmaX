import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-labsignout',
  templateUrl: './labsignout.component.html',
  styleUrls: ['./labsignout.component.css']
})
export class LabsignoutComponent {

  constructor(private toastr: ToastrService, private router: Router, private service: PatientService) {
    this.service.setLabLoggedOut();
    //this.toastr.success("Logout Success");
    this.router.navigate(['signin']);
  }

}

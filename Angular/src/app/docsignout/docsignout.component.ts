import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-docsignout',
  templateUrl: './docsignout.component.html',
  styleUrls: ['./docsignout.component.css']
})
export class DocsignoutComponent {

  constructor(private toastr: ToastrService, private router: Router, private service: PatientService) {
    this.service.setDoctorLoggedOut();
    //this.toastr.success("Logout Success");
    this.router.navigate(['signin']);
  }

}

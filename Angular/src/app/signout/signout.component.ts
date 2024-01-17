import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent {

  constructor(private router: Router, private service: PatientService, private toastr: ToastrService) { 
    this.service.setUserLoggedOut();
    //this.toastr.success("Logout Success");
    this.router.navigate(['signin']);
  }

}

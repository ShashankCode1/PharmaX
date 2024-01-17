import { Component } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-doctornavbar',
  templateUrl: './doctornavbar.component.html',
  styleUrls: ['./doctornavbar.component.css']
})
export class DoctornavbarComponent {

  dark = false;

  constructor(private service: PatientService) { }

  isDoctorLoggedIn(): boolean {
    return this.service.getDoctorLoggedStatus();
  }

  toggleTheme() {
    if (this.dark) {
      this.dark = false;
      document.body.removeAttribute('data-bs-theme');
    } else {
      this.dark = true;
      document.body.setAttribute('data-bs-theme', 'dark');
    }
  }

  signout() {
    this.dark = false;
    document.body.removeAttribute('data-bs-theme');
  }

}

import { Component } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-labnavbar',
  templateUrl: './labnavbar.component.html',
  styleUrls: ['./labnavbar.component.css']
})
export class LabnavbarComponent {

  dark = false;

  constructor(private service: PatientService) { }

  isLabLoggedIn(): boolean {
    return this.service.getLabLoggedStatus();
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

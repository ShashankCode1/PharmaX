import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private router: Router) { }

  appointmentPage() {
    this.router.navigate(['appointments']);
  }

  labTestPage() {
    this.router.navigate(['labtests']);
  }

  medicinePage() {
    this.router.navigate(['medicines']);
  }

  healthCarePage() {
    this.router.navigate(['healthcare']);
  }

  scrollAmount = 200; // You can change this value based on how much you want to scroll

  scrollLeft() {
    const container = document.getElementById('scrollContainer');
    if (container) {
      container.scrollLeft -= this.scrollAmount;
    }
  }

  scrollRight() {
    const container = document.getElementById('scrollContainer');
    if (container) {
      container.scrollLeft += this.scrollAmount;
    }
  }



}

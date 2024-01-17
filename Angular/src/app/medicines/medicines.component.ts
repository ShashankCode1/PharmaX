import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  medicines: any;

  constructor(private service: PatientService) {
    this.medicines = [
      { medId: 101, medName: "Asthalin-Inhaler", quantity: 1, price: 100, symptoms: "Coughing, Shortness of Breath.", imgsrc: "assets/Images/medicines/cough/asthalin-inhaler1.jpg" },
      { medId: 102, medName: "Strepsils-Blister", quantity: 1, price: 300, symptoms: "Dry Throat, Irritating Cough", imgsrc: "assets/Images/medicines/cough/strepsils-blister1.jpg" },
      { medId: 103, medName: "Cofsils", quantity: 1, price: 50, symptoms: "Throat Infection, Mouth Infection", imgsrc: "assets/Images/medicines/cough/cofsils1.jpg" },
      { medId: 104, medName: "Moxifloxacin", quantity: 1, price: 150, symptoms: "Bacterial eye infections", imgsrc: "assets/Images/medicines/ear and eye/Moxifloxacin-Eye-Ointment1.jpg" },
      { medId: 105, medName: "Mederma", quantity: 1, price: 130, symptoms: " Acne scars, Surgical Scars, Burns Scars", imgsrc: "assets/Images/medicines/Hair and Skin/mederma1.jpg" },
      { medId: 106, medName: "Vitamin E", quantity: 1, price: 95, symptoms: "Muscle Weakness, Vision Problems", imgsrc: "assets/Images/medicines/Hair and Skin/vitamin E1.jpg" },
      { medId: 107, medName: "Buscogast", quantity: 1, price: 200, symptoms: "pain in the stomach, frequent diarrhea", imgsrc: "assets/Images/medicines/stomach/buscogast1.jpg" },
      { medId: 108, medName: "Ciplox", quantity: 1, price: 20, symptoms: "Bacterial Eye/Ear Infections", imgsrc: "assets/Images/medicines/ciplox1.jpg" },
      { medId: 109, medName: "Digene", quantity: 1, price: 30, symptoms: " Gas or Stomach Discomfort due to Acidity", imgsrc: "assets/Images/medicines/digene.jpg" },
      { medId: 110, medName: "Mefenamic-Acid", quantity: 1, price: 100, symptoms: "Mild pain and Menstrual Cramps", imgsrc: "assets/Images/medicines/Mefenamic-Acid.jpg" },
      { medId: 111, medName: "Go Mygraine", quantity: 1, price: 50, symptoms: "Intense Throbbing Head Pain", imgsrc: "assets/Images/medicines/Mygraine1.jpg" },
      { medId: 112, medName: "Nimesulide", quantity: 1, price: 190, symptoms: "Acute Pain and Fever", imgsrc: "assets/Images/medicines/Nimesulide 100mg.jpg" },
      { medId: 113, medName: "Paracetamol", quantity: 1, price: 385, symptoms: "Relieve Pain and Fever ", imgsrc: "assets/Images/medicines/paracetamol-650-mg.jpg" },
      { medId: 114, medName: "Udapa Trio", quantity: 1, price: 250, symptoms: "Heigh Blood Sugar Levels", imgsrc: "assets/Images/medicines/udapa trio.jpg" },
      { medId: 115, medName: "Zandu Balm", quantity: 1, price: 45, symptoms: "Headache, Body Ache and Cold", imgsrc: "assets/Images/medicines/zandu_balm.jpg" }
    ]
  }
  ngOnInit(): void {
    for (let med of this.medicines) {
      const cartItem = this.service.cartItems.find((item: any) => item.medId === med.medId);
      if (cartItem) {
        med.inCart = true;  // Add a flag to indicate this medicine is in the cart
        med.quantity = cartItem.quantity;
      } else {
        med.inCart = false; // Not in cart
      }
    }
  }

  // addToCart(med: any) {
  //   this.service.addToCart(med);
  // }


  addToCart(med: any) {
    this.service.addToCart(med);
    med.inCart = true;
  }

  incrementQuantity(med: any) {
    med.quantity += 1;
    this.service.updateCart(med); // Assuming you have this method to update the cart in the service
}

decrementQuantity(med: any) {
    med.quantity -= 1;
    if (med.quantity <= 0) {
        med.inCart = false;
        this.service.removeFromCart(med);
    } else {
        this.service.updateCart(med);
    }
}


  removeFromCart(med: any) {
    this.service.removeFromCart(med);
    med.inCart = false;
    med.quantity = 1; // Reset to initial quantity
  }


}

import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  name: string;
  age: number | null;
  phoneNo: string;
  emailId: string;
  cartItems: any[] = [];

  constructor(private service: PatientService, private paymentService: PatientService) {
    this.name = localStorage.getItem("name") || "";
    this.age = localStorage.getItem("age") ? parseInt(localStorage.getItem("age") as string) : null;
    this.phoneNo = localStorage.getItem("phoneNo") || "";
    this.emailId = localStorage.getItem("emailId") || "";
    this.cartItems = [];
}

  ngOnInit(): void {
    this.cartItems = this.service.cartItems;
    this.syncMedicinesWithCart();
  }

  syncMedicinesWithCart(): void {
    for (let item of this.cartItems) {
      const med = this.service.cartItems.find((cartItem: any) => cartItem.medId === item.medId);
      if (med) {
        item.inCart = true;
        item.quantity = med.quantity;
      } else {
        item.inCart = false;
      }
    }
  }

  addToCart(item: any) {
    this.service.addToCart(item);
    item.inCart = true;
    this.syncMedicinesWithCart();
  }

  incrementQuantity(item: any) {
    item.quantity += 1;
    this.service.updateCart(item);
    this.syncMedicinesWithCart();
  }

  decrementQuantity(item: any) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
        this.service.removeFromCart(item);
        item.inCart = false;
        item.quantity = 1; // Reset to initial quantity if needed
    } else {
        this.service.updateCart(item);
    }
    this.syncMedicinesWithCart();
  }

  removeFromCart(item: any) {
    this.service.removeFromCart(item);
    item.inCart = false;
    item.quantity = 1; // Reset to initial quantity
    this.syncMedicinesWithCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, medicine) => total + (medicine.price * medicine.quantity), 0);
  }

  validateMedForm(medForm: any) {

  }

  makePayment(amount: any) {
    this.paymentService.initiatePayment(amount).subscribe(
      response => {
        const parsedResponse = JSON.parse(response);
        this.paymentService.openRazorpay(parsedResponse.orderId, amount);
      });
  }


  
}

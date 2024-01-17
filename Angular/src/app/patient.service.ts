import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  isUserLogged: boolean;
  isDoctorLogged: boolean;
  isLabLogged: boolean;
  cartItems: any;

  constructor(private http: HttpClient) {
    this.isUserLogged = false;
    this.isDoctorLogged = false;
    this.isLabLogged = false;
    this.cartItems = [];
    this.loadCartFromLocalStorage();
  }

  //Add to Cart
  // addToCart(med: any) {
  //   this.cartItems.push(med);
  // }

  addToCart(med: any) {
    const existingItem = this.cartItems.find((item: any) => item.medId === med.medId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      med.quantity = 1;
      this.cartItems.push(med);
    }
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  updateCart(med: any) {
    const index = this.cartItems.findIndex((item: any) => item.medId === med.medId);
    if (index !== -1) {
      this.cartItems[index] = med;
    }
    this.saveCartToLocalStorage();
  }

  removeFromCart(med: any) {
    const index = this.cartItems.findIndex((item: any) => item.medId === med.medId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    this.saveCartToLocalStorage();
  }

  getTotalCartItems(): number {
    return this.cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
  }





  //Get Cart Items
  getCartItems(): any {
    return this.cartItems;
  }

  //Succesfully User LoggedIn
  setUserLoggedIn() {
    this.isUserLogged = true;
  }

  //User Logout
  setUserLoggedOut() {
    this.isUserLogged = false;
  }

  //User Logged Status
  getUserLoggedStatus(): boolean {
    return this.isUserLogged;
  }

  //Succesfully Doctor LoggedIn
  setDoctorLoggedIn() {
    this.isDoctorLogged = true;
  }

  //Doctor Logout
  setDoctorLoggedOut() {
    this.isDoctorLogged = false;
  }

  //Doctor Logged Status
  getDoctorLoggedStatus(): boolean {
    return this.isDoctorLogged;
  }

  //Succesfully Lab LoggedIn
  setLabLoggedIn() {
    this.isLabLogged = true;
  }

  //Lab Logout
  setLabLoggedOut() {
    this.isLabLogged = false;
  }

  //Lab Logged Status
  getLabLoggedStatus(): boolean {
    return this.isLabLogged;
  }

  //register
  registerPatient(patient: any): Observable<any> {
    return this.http.post('registerPatient', patient);
  }

  //Send EmailOTP
  sendOtp(emailId: string): Observable<any> {
    return this.http.post('emailOtp', { emailId: emailId });
  }

  //verify EmailOTP
  verifyOtp(emailId: string, otp: string): Observable<any> {
    return this.http.post(`validateEmailOtp/${emailId}/${otp}`, {});
  }

  //setPassword with Email & Password
  setPassword(emailId: string, password: string): Observable<any> {
    return this.http.put('setPassword', { emailId: emailId, password: password });
  }

  //Login
  patientLogin(emailId: string, password: string): Observable<any> {
    return this.http.post('patientLogin', { emailId: emailId, password: password });
  }

  //Send PhoneOTP
  sendPhoneOtp(phoneNo: string): Observable<any> {
    return this.http.post(`phoneOtp/${phoneNo}`, {});
  }

  //verifyPhoneOTP
  verifyPhoneOtp(phoneNo: string, otp: number): Observable<any> {
    return this.http.post(`validatePhoneOtp/${phoneNo}/${otp}`, {});
  }

  //setPassword with PhoneNumber and Password
  setPasswordByPhone(phoneNo: string, password: string): Observable<any> {
    return this.http.put(`setPasswordByPhone/${phoneNo}/${password}`, {});
  }

  //register Doctor
  registerDoctor(doctor: any): Observable<any> {
    return this.http.post('registerDoctor', doctor);
  }

  //Schedule LabTest
  bookLabTest(labTest: any): Observable<any> {
    return this.http.post('bookLabTest', labTest);
  }

  //Get LabTests
  getLabTests(): any {
    return this.http.get('getLabTests');
  }

  //Get Doctors
  getDoctors(): any {
    return this.http.get('getDoctors');
  }

  //Book Appointment
  bookAppointment(appointments: any): Observable<any> {
    return this.http.post('bookAppointment', appointments, { responseType: 'text' });
  }

  //Get PatientList or Get Appointments
  getPatientList(): any {
    return this.http.get('getAppointments');
  }

  initiatePayment(amount: string): Observable<string> {
    return this.http.post<string>('/payment/order', amount, { responseType: 'text' as 'json' });
  }

  openRazorpay(orderId: string, amount: string) {
    const options = {
      "key": "rzp_test_b1lbJXMZHdtNhH",
      "amount": Number(amount) * 100,
      "currency": "INR",
      "order_id": orderId,
      "handler": (response: any) => {
        console.log(response);
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  //Get Patient List By DocId
  getPatByDocId(docId: any): any {
    return this.http.get('getAppointmentsByDocId/' + docId);
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LabtestsComponent } from './labtests/labtests.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { AuthGuard } from './auth.guard';
// import { authGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { SignoutComponent } from './signout/signout.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { DocsignoutComponent } from './docsignout/docsignout.component';
import { RegisterdoctorComponent } from './registerdoctor/registerdoctor.component';
import { ShowlabtestsComponent } from './showlabtests/showlabtests.component';
import { LabsignoutComponent } from './labsignout/labsignout.component';
import { CartComponent } from './cart/cart.component';
import { PatientlistbydocidComponent } from './patientlistbydocid/patientlistbydocid.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signin", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "homepage", canActivate: [AuthGuard], component: HomepageComponent },
  { path: "appointments", canActivate: [AuthGuard], component: AppointmentsComponent },
  { path: "labtests", canActivate: [AuthGuard], component: LabtestsComponent },
  { path: "medicines", canActivate: [AuthGuard], component: MedicinesComponent },
  { path: "healthcare", canActivate: [AuthGuard], component: HealthcareComponent },
  { path: "signout", canActivate: [AuthGuard], component: SignoutComponent },
  { path: "registerdoctor", canActivate: [AuthGuard], component: RegisterdoctorComponent },
  { path: "patientList", canActivate: [AuthGuard], component: PatientlistComponent },
  { path: "showlabtests", canActivate: [AuthGuard], component: ShowlabtestsComponent },
  { path: "docsignout", canActivate: [AuthGuard], component: DocsignoutComponent },
  { path: "labsignout", canActivate: [AuthGuard], component: LabsignoutComponent },
  { path: "cart", canActivate: [AuthGuard], component: CartComponent },
  { path: "patListByDocId", canActivate: [AuthGuard], component: PatientlistbydocidComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

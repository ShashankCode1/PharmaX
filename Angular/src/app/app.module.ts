import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LabtestsComponent } from './labtests/labtests.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignoutComponent } from './signout/signout.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { DoctornavbarComponent } from './doctornavbar/doctornavbar.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { DocsignoutComponent } from './docsignout/docsignout.component';
import { RegisterdoctorComponent } from './registerdoctor/registerdoctor.component';
import { ShowlabtestsComponent } from './showlabtests/showlabtests.component';
import { LabnavbarComponent } from './labnavbar/labnavbar.component';
import { LabsignoutComponent } from './labsignout/labsignout.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { CartComponent } from './cart/cart.component';
import { PatientlistbydocidComponent } from './patientlistbydocid/patientlistbydocid.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    AppointmentsComponent,
    LabtestsComponent,
    HealthcareComponent,
    MedicinesComponent,
    HomepageComponent,
    SignoutComponent,
    DoctornavbarComponent,
    PatientlistComponent,
    DocsignoutComponent,
    RegisterdoctorComponent,
    ShowlabtestsComponent,
    LabnavbarComponent,
    LabsignoutComponent,
    CartComponent,
    PatientlistbydocidComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-position'
    }),
    RecaptchaModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '608230586177-dthnu9o2mm0lbi87pg8eufhgau9h156n.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

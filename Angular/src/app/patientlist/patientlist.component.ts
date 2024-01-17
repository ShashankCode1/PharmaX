import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  appointments: any;

  constructor(private service: PatientService) {
    this.appointments = {
      "pId": "",
      "pName": "",
      "pAge": "",
      "gender": "",
      "pPhoneNo": "",
      "pEmailId": "",
      "appDate": "",
      "docId": ""
    }
  }
  ngOnInit(): void {
    this.service.getPatientList().subscribe((appList: any) => {
      this.appointments = appList;
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-showlabtests',
  templateUrl: './showlabtests.component.html',
  styleUrls: ['./showlabtests.component.css']
})
export class ShowlabtestsComponent implements OnInit {

  labTests: any;

  constructor(private service: PatientService) {
    this.labTests = {
      "patId": "",
      "patName": "",
      "patAge": "",
      "patPhoneNo": "",
      "labTest": "",
      "labDate": ""
    }
  }

  ngOnInit(): void {
    this.service.getLabTests().subscribe((labData: any) => {
      this.labTests = labData;
    });
  }

}

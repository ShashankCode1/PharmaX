import { Component } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientlistbydocid',
  templateUrl: './patientlistbydocid.component.html',
  styleUrls: ['./patientlistbydocid.component.css']
})
export class PatientlistbydocidComponent {

  docId: any;
  app: any;

  constructor(private service: PatientService) {
    this.docId = 0;
  }

  getPatList() {
    this.service.getPatByDocId(this.docId).subscribe((patList: any) => {
      this.app = patList;
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { FhirService } from "./fhir.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pheno-fhir';
  patientId: any;
  patient: any;
  flexSearch = 33;
  flexSearchOffset: number = 33;
  constructor(private fhirService: FhirService) {
  }

  ngOnInit() {

  }

  searchVulcan(){
    console.log("Some patient data");
    this.patient = true;
    this.flexSearchOffset = 0;
  }
}

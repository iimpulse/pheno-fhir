import { Component, OnInit } from '@angular/core';
import { FhirService } from "./fhir.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pheno-fhir';
  patientId: any = "1652";
  patient: any;
  flexSearch = 33;
  flexSearchOffset: number = 33;
  constructor(private fhirService: FhirService) {
  }

  ngOnInit() {

  }

  searchVulcan(){
    this.fhirService.searchPatientFhir(this.patientId).subscribe((fhirResponse) => {
      this.patient = this.reduceFhirPatientResponse(fhirResponse);
      this.flexSearchOffset = 0;
    });
    this.fhirService.searchPatientObservation(this.patientId).subscribe((fhirResponse) => {
      this.patient.observations = this.reduceFhirPatientObservations(fhirResponse);
    });
  }

  reduceFhirPatientResponse(response){
    let ageDiff = Date.now() - new Date(response.birthDate);
    let ageDate = new Date(ageDiff);
    return {
      name: `${response.name[0].given[0]} ${response.name[0].family}`,
      age: Math.abs(ageDate.getUTCFullYear() - 1970),
      gender: response.gender.toUpperCase()
    }
  }

  reduceFhirPatientObservations(response){
    let observations = [];
    console.log(response);
    response.entry.forEach((entry) => {
      observations.push({
        code: entry.resource.code.coding[0].code,
        name: entry.resource.code.coding[0].display,
      });
    });
    return observations;
  }
}

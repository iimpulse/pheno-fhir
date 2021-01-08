import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FhirService } from "./fhir.service";
import { INglDatatableSort } from "ng-lightning";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pheno-fhir';
  patientId: any = "1652";
  patient: { gender: string; observations: any[]; name: any; age: number } = {
    name: null,
    age: null,
    gender: null,
    observations: []
  };
  flexSearch = 33;
  flexSearchOffset: number = 33;
  patients = [];
  formControl = new FormControl("");
  age = null;
  // Initial sort
  sort: INglDatatableSort = { key: 'excluded', order: 'asc' };
  constructor(private fhirService: FhirService) {
  }

  ngOnInit() {
    this.fhirService.getAllPatientsFhir().subscribe((data: any) => {
      data.entry.forEach((entry) => {
        this.patients.push(entry.resource);
      });
    })

    this.formControl.valueChanges.subscribe((id) => {
      this.age = Math.floor((Math.random() * 85) + 1);
      this.fhirService.searchPatientFhir(id).subscribe((fhirResponse) => {
        this.patient = this.reduceFhirPatientResponse(fhirResponse);
        this.flexSearchOffset = 0;
      });
      this.fhirService.searchPatientObservation(id).subscribe((fhirResponse) => {
        this.patient.observations = this.reduceFhirPatientObservations(fhirResponse);
      });
    })
  }

  reduceFhirPatientResponse(response){
    let ageDiff = Date.now() - new Date(response.birthDate).getTime();
    let ageDate = new Date(ageDiff);
    let name = response.name ? `${response.name[0].given[0]} ${response.name[0].family}` : response.id;
    return {
      name: name,
      age: Math.abs(ageDate.getUTCFullYear() - 1970),
      gender: response.gender.toUpperCase(),
      observations: []
    }
  }

  reduceFhirPatientObservations(response){
    let observations = [];
    if(response.entry){
      response.entry.forEach((entry) => {
        let name = entry.resource.code.coding[0].display;
        let excluded = false;
        if(entry.resource.code.coding[0].display.includes("EXCLUDED")){
          name = entry.resource.code.coding[0].display.replace("EXCLUDED ", "");
          excluded = true;
        }

        let start = "-"; 
        let end = "-";
        if(entry.resource.effectivePeriod){
          let effective = entry.resource.effectivePeriod;
          if(effective.start){
            start = new Date(effective.start).toLocaleDateString();
            end = new Date(effective.end).toLocaleDateString();
          } else {
            start = new Date(effective).toLocaleDateString();
            end = new Date(effective).toLocaleDateString();
          }
        }

        observations.push({
          code: entry.resource.code.coding[0].code,
          name: name,
          excluded: excluded,
          start: start,
          end:  end
        });
      });
    }
    return observations;
  }

  selectPatient(patient){
    console.log(patient.name);
    console.log("winner");
  }

  // Custom sort function
  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.patient.observations.sort((a: any, b: any) => {
      return (key === 'excluded' ? b[key] - a[key] * (order === 'desc' ? 1 : -1) : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }
}

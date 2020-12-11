import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FhirService {

  constructor(private httpClient: HttpClient) { }

  searchPatientFhir(){
    return this.httpClient.get(environment.FHIR_PATIENT_URL);
  }
}

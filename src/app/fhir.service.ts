import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FhirService {

  constructor(private httpClient: HttpClient) { }

  searchPatientFhir(id: string){
    return this.httpClient.get(environment.FHIR_PATIENT_URL + id);
  }

  searchPatientObservation(id: string){
    const params = new HttpParams().append("subject", id);
    return this.httpClient.get(environment.FHIR_PATIENT_OBSERVATION_URL, {params: params});
  }
}

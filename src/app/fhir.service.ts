import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FhirService {

  constructor(private httpClient: HttpClient) { }

  getAllPatientsFhir(){
    return this.httpClient.get(environment.FHIR_PATIENT_URL);
  }

  searchPatientFhir(id: string){
    const params = new HttpParams().append("_format", "json");
    return this.httpClient.get(environment.FHIR_PATIENT_URL + id, {params: params});
  }

  searchPatientObservation(id: string){
    const params = new HttpParams().append("subject", id).append("_format", "json").append("category", "phenotype");
    return this.httpClient.get(environment.FHIR_PATIENT_OBSERVATION_URL, {params: params});
  }
}

const FHIR_BASE_URL = "http://vulcan.clinicalprofiles.org:8080/fhir/";
export const environment = {
  production: true,
  FHIR_PATIENT_URL: FHIR_BASE_URL + "Patient/",
  FHIR_PATIENT_OBSERVATION_URL: FHIR_BASE_URL + "Observation"
};

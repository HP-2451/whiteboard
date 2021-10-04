import { LoginType } from "./auth.dto";

export interface SurveyFormType {
  userId: string;
  fullName: string | undefined;
  contact: string | undefined;
  email: string | undefined;
  address1: string | undefined;
  address2: string | undefined;
  landmark: string | undefined;
  state: string | undefined;
  city: string | undefined;
  pinCode: string | undefined;
  vaccine: string;
  vaccinatedDate: string;
  ageGroup: string;
  symptoms: any;
  medicines: any;
  rating: number;
  feedback: string;
  pdfData?: any;
}

export interface User {
  fullName: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
  landmark: string;
  state: string;
  city: string;
  pinCode: string;
}

export interface VaccinationDetail {
  _id: string;
  userId: string;
  vaccine: string;
  vaccinatedDate: string;
  ageGroup: string;
  symptoms: string;
  medicines: string;
  rating: number;
  feedback: string;
}

export interface SurveyReduxState {
  auth: LoginType | undefined;
  user: User | undefined;
  vaccinationDetail: VaccinationDetail | undefined;
  entities: any;
  loading: boolean;
  error: any;
}

export interface SurveyReduxAction {
  type: string;
  payload?: any;
}

export interface RouteParams {
  id: string;
}
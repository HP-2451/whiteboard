import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurveyReduxState } from "../dto/survey.dto";

const initialState: SurveyReduxState = {
  auth: undefined,
  user: undefined,
  vaccinationDetail: undefined,
  entities: null,
  loading: false,
  error: "",
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    fetchRequest(state: SurveyReduxState) {
      state.loading = true;
      // state.vaccinationDetail = undefined
    },
    fetchError(
      state: SurveyReduxState,
      action: PayloadAction<SurveyReduxState>
    ) {
      state.loading = false;
      state.error = action.payload;
      // state.vaccinationDetail = undefined
    },
    fetchSuccess(
      state: SurveyReduxState,
      action: PayloadAction<SurveyReduxState>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.vaccinationDetail = action.payload.vaccinationDetail;
    },
    // fetchSurvey (state: SurveyReduxState, action: PayloadAction<SurveyReduxState>){
    //     state.loading = false
    //     state.vaccinationDetail = action.payload.vaccinationDetail
    // },
    fetchAllSurveys(
      state: SurveyReduxState,
      action: PayloadAction<SurveyReduxState>
    ) {
      state.loading = false;
      state.entities = action.payload.vaccinationDetail;
      // state.vaccinationDetail = undefined
    },
    fetchAllSurveysDetail(
      state: SurveyReduxState,
      action: PayloadAction<SurveyReduxState>
    ) {
      state.loading = false;
      state.entities = action.payload;
      // state.vaccinationDetail = undefined
    },
    handlePopup(state: SurveyReduxState, action: any) {
      let index = state.entities.findIndex(
        (obj: any) => obj._id === action.payload.userId
      );
      let newData = [...state.entities];
      if (index !== -1) {
        newData[index].visible = action.payload.type ? true : false;
        state.entities = newData;
      }
    },
    login(state: SurveyReduxState, action: any){
      state.auth = action.payload
    },
    logout(state: SurveyReduxState){
      state.auth = undefined
      console.log("logout"); 
    }
  },
});

export default surveySlice;

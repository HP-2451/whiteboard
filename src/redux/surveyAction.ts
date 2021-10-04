// import { SurveyReduxAction } from "../dto/survey.dto";
// import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCESS } from "./surveyTypes";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Dispatch } from "redux";
import surveySlice from "./surveySlice";
import { LoginType } from "../dto/auth.dto";

const { actions } = surveySlice;

// export function fetchRequest() {
//   const action: SurveyReduxAction = {
//     type: FETCH_REQUEST,
//   };
//   return action;
// }

// export function fetchError(error: any) {
//   const action: SurveyReduxAction = {
//     type: FETCH_ERROR,
//     payload: error,
//   };
//   return action;
// }

// export function fetchSuccess(data: object) {
//   const action: SurveyReduxAction = {
//     type: FETCH_SUCESS,
//     payload: data,
//   };
//   return action;
// }

export function submitDetail(body: object) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .post(BASE_URL + "/create", body)
      .then((response) => {
        return response;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function getDetail(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .get(BASE_URL + "/submit/detail/" + id + "?type=survey")
      .then((res) => {
        if (res && res.data.success) {
          res.data.data.vaccinationDetail.medicines = res.data.data.vaccinationDetail.medicines.split(",")
          if(res.data.data.vaccinationDetail.symptoms.includes(",")){
            res.data.data.vaccinationDetail.symptoms = res.data.data.vaccinationDetail.symptoms.split(",")
          }else{
            res.data.data.vaccinationDetail.symptoms = [ res.data.data.vaccinationDetail.symptoms]
          }
          dispatch(actions.fetchSuccess(res.data.data));
        }
        return res;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function fetchSurveys(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .get(BASE_URL + "/submit/detail/" + id)
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data.vaccinationDetail.length > 0) {
            res.data.data.vaccinationDetail.forEach(
              (obj: any) => {
                obj.visible = false
                obj.key = obj._id
              }
            );
          }
          dispatch(actions.fetchAllSurveys(res.data.data));
        }
        return res;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function fetchSurvey(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .get(BASE_URL + "/detail/" + id)
      .then((res) => {
        if (res && res.data.success) {
          res.data.data.vaccinationDetail.symptoms = res.data.data.vaccinationDetail.symptoms.toString().split(",")
          res.data.data.vaccinationDetail.medicines = res.data.data.vaccinationDetail.medicines.toString().split(",")
          dispatch(actions.fetchSuccess(res.data.data));
        }
        return res;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function updateSurvey(body: any, id: any) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .put(BASE_URL + "/update/" + id, body)
      .then((res) => {
        return res;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}
export function deleteVaccineDetail(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .delete(BASE_URL + "/delete/" + id)
      .then((response) => {
        return response;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function deleteMultipleVaccineDetail(id: any) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .post(BASE_URL + "/delete", {id})
      .then((response) => {
        return response;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function handlePopup( type: boolean, userId: string) {
  return (dispatch: Dispatch) => {
    console.log(type);
    
    dispatch(actions.handlePopup({ type, userId}));
  };
}


export function fetchAllSurveys() {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .get(BASE_URL + "/")
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(
              (obj: any) => {
                obj.visible = false
                obj.key = obj._id
              }
            );
          }
          dispatch(actions.fetchAllSurveysDetail(res.data.data));
        }
        return res;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function searchSurveyByUserName(name: string, type: string) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .get(BASE_URL + "/search?name=" + name + "&type=" + type)
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(
              (obj: any) => {
                obj.visible = false
                obj.key = obj._id
              }
            );
          }
          dispatch(actions.fetchAllSurveysDetail(res.data.data));
        }
        return res;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function filterByVaccine(vaccine: string) {
  return (dispatch: Dispatch) => {
    dispatch(actions.fetchRequest());
    return axios
      .get(BASE_URL + "/filter?vaccine=" + vaccine)
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(
              (obj: any) => {
                obj.visible = false
                obj.key = obj._id
              }
            );
          }
          dispatch(actions.fetchAllSurveysDetail(res.data.data));
        }
        return res;
      })
      .catch((err: any) => {
        dispatch(actions.fetchError(err.message));
      });
  };
}

export function login(user : LoginType){
  return (dispatch: Dispatch) => {
    dispatch(actions.login(user));
  };
}

export function logout(){
  console.log(logout);
  
  return (dispatch: Dispatch) => {
    dispatch(actions.logout());
  };
}
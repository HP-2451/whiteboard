import { SurveyReduxState, SurveyReduxAction } from "../dto/survey.dto"
import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCESS } from "./surveyTypes"


const intialState: SurveyReduxState = {
    auth: undefined,
    user: undefined,
    vaccinationDetail: undefined,
    entities: [],
    loading: false,
    error: ''
}


const surveyReducer = (state: SurveyReduxState = intialState, action: SurveyReduxAction) => {

    switch(action.type){

        case FETCH_REQUEST : {
            return{
                ...state,
                loading: true,
            }
        }

        case FETCH_ERROR : {
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        }

        case FETCH_SUCESS : {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                vaccinationDetail: action.payload.vaccineDetail
            }
        }

        default: return state
    }

}

export default surveyReducer
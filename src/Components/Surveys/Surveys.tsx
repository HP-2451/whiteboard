// import { Button, Card } from "antd";
import "./Surveys.scss";
import {  useEffect } from "react";
// interface SurveysProps {}
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { fetchSurveys } from "../../redux/surveyAction";
import { RouteParams, VaccinationDetail } from "../../dto/survey.dto";
import { Link, RouteComponentProps } from "react-router-dom";
import SurveyCard from "./SurveyCard";
import SurveyTable from "./survey-list/SurveyTable";

interface MyComponent extends RouteComponentProps<RouteParams> {}
const Surveys: React.FunctionComponent<MyComponent> = (props) => {
 
  const { entities } = useAppSelector(
    (state) => ({
      entities: state.entities,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSurveys(props.match.params.id));
  }, []);

  const history = useHistory();

  return (
      <div className="all-survey-container">
        {/* {entities?.map((survey: VaccinationDetail) => <SurveyCard key={Math.random() * 100} survey={survey}/>
        )} */}
        <SurveyTable id={props.match.params.id}/>
      </div>
  );
};

export default Surveys;

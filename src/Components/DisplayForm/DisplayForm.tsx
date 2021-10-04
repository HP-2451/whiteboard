import React, { useEffect } from "react";
import "./DisplayForm.scss";
import { Link, RouteComponentProps } from "react-router-dom";
import { fetchSurvey, getDetail } from "../../redux/surveyAction";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { RouteParams } from "../../dto/survey.dto";

interface MyComponent extends RouteComponentProps<RouteParams> {}
const DisplayForm: React.FunctionComponent<MyComponent> = (props) => {
  const dispatch = useAppDispatch();
  const { user, vaccinationDetail } = useAppSelector(
    (state) => ({
      user: state.user,
      vaccinationDetail: state.vaccinationDetail,
    }),
    shallowEqual
  );
  const history = useHistory();
  useEffect(() => {
    if (history.location.pathname.includes("submit")) {
      dispatch(getDetail(props?.match?.params?.id)).then((res) => {
        console.log(res);
      });
    } else {
      dispatch(fetchSurvey(props?.match?.params?.id)).then((res) => {
        console.log(res);
      });
    }
  }, [dispatch, props?.match?.params?.id]);
  return (
    <div className="display-container">
      <div className="header">
        <Link to={`/vaccine/all/${vaccinationDetail?.userId}`}>
          <Button className="all-survey-btn" type="primary" ghost>
            Show my all Survey
          </Button>
        </Link>

        {!history.location.pathname.includes("submit") && (
          <Link to={`/edit/${props.match.params.id}`}>
            <Button className="all-survey-btn" type="primary" ghost style={{marginLeft: "10px"}}>
              <EditOutlined />
              Edit Survey
            </Button>
          </Link>
        )}
      </div>
      {history.location.pathname.includes("submit") && (
        <h2>
          Thank you for submitting the survey form.
          <br />
          Your response has been submitted
        </h2>
      )}
      <div className="personal-detail">
        <h3>Personal Detail</h3>
        <div className="detail">
          <label>Name</label>
          <p>{user?.fullName ? user?.fullName : "-"}</p>
        </div>
        <div className="detail">
          <label>Email</label>
          <p>{user?.email ? user?.email : "-"}</p>
        </div>
        <div className="detail">
          <label>Contact</label>
          <p>{user?.contact ? user?.contact : "-"}</p>
        </div>
        <div className="detail">
          <label>Address line 1</label>
          <p>{user?.address1 ? user?.address1 : "-"}</p>
        </div>
        <div className="detail">
          <label>Address line 2</label>
          <p>{user?.address2 ? user?.address2 : "-"}</p>
        </div>
        <div className="detail">
          <label>Landmark</label>
          <p>{user?.landmark ? user?.landmark : "-"}</p>
        </div>
        <div className="detail">
          <label>State</label>
          <p>{user?.state ? user?.state : "-"}</p>
        </div>
        <div className="detail">
          <label>City</label>
          <p>{user?.city ? user?.city : "-"}</p>
        </div>
        <div className="detail">
          <label>Pin code</label>
          <p>{user?.pinCode ? user?.pinCode : "-"}</p>
        </div>
        <div className="detail">
          <label>Age Group</label>
          <p>
            {vaccinationDetail?.ageGroup ? vaccinationDetail?.ageGroup : "-"}
          </p>
        </div>
      </div>

      <div className="personal-detail">
        <h3>Vaccination Survey Detail</h3>
        <div className="detail">
          <label>Vaccine Name</label>
          <p>{vaccinationDetail?.vaccine ? vaccinationDetail?.vaccine : "-"}</p>
        </div>
        <div className="detail">
          <label>Vaccinated Date</label>
          <p>
            {vaccinationDetail?.vaccinatedDate
              ? vaccinationDetail?.vaccinatedDate
              : "-"}
          </p>
        </div>
        <div className="detail">
          <label>Symptoms</label>
          <p>
            {vaccinationDetail?.symptoms ? vaccinationDetail?.symptoms : "-"}
          </p>
        </div>
        <div className="detail">
          <label>Medicines</label>
          <p>
            {vaccinationDetail?.medicines ? vaccinationDetail?.medicines : "-"}
          </p>
        </div>
        <div className="detail">
          <label>Rating</label>
          <p>{vaccinationDetail?.rating ? vaccinationDetail?.rating : "-"}</p>
        </div>
        <div className="detail">
          <label>Feedback</label>
          <p>
            {vaccinationDetail?.feedback ? vaccinationDetail?.feedback : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayForm;

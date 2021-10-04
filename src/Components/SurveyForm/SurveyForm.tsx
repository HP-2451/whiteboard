import {
  Col,
  Input,
  DatePicker,
  Row,
  Radio,
  Select,
  Checkbox,
  Rate,
  Button,
} from "antd";
import React, { useEffect } from "react";
import * as Yup from "yup";
import "./SurveyForm.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Link, RouteComponentProps } from "react-router-dom";
import {
  ADDRESS_REQ,
  AGEGROUP_REQ,
  CITY_REQ,
  CONTACT_ERR,
  CONTACT_REQ,
  COVACCINE,
  COVISHIELD,
  EMAIL_ERR,
  EMAIL_REQ,
  FULL_NAME_REQ,
  MEDICINES_REQ,
  PINCODE_REQ,
  STATE_REQ,
  SYMPTOMS_REQ,
  VACCINATION_DATE_REQ,
  VACCINE_REQ,
} from "../../constants";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { RouteParams, SurveyFormType } from "../../dto/survey.dto";
import {
  fetchSurvey,
  submitDetail,
  updateSurvey,
} from "../../redux/surveyAction";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required(FULL_NAME_REQ),
  contact: Yup.string()
    .required(CONTACT_REQ)
    .min(10, CONTACT_ERR)
    .max(10, CONTACT_ERR),
  email: Yup.string().required(EMAIL_REQ).email(EMAIL_ERR),
  address1: Yup.string().required(ADDRESS_REQ),
  state: Yup.string().required(STATE_REQ),
  city: Yup.string().required(CITY_REQ),
  pinCode: Yup.string().required(PINCODE_REQ),
  vaccine: Yup.string().required(VACCINE_REQ),
  vaccinatedDate: Yup.string().required(VACCINATION_DATE_REQ),
  ageGroup: Yup.string().required(AGEGROUP_REQ),
  symptoms: Yup.array().required(SYMPTOMS_REQ).min(1, SYMPTOMS_REQ),
  medicines: Yup.array().required(MEDICINES_REQ).min(1, MEDICINES_REQ),
});

interface MyComponent extends RouteComponentProps<RouteParams> {}
const SurveyForm: React.FunctionComponent<MyComponent> = (props) => {
  const { user, vaccinationDetail } = useAppSelector(
    (state) => ({
      user: state.user,
      vaccinationDetail: state.vaccinationDetail,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();
  const { TextArea } = Input;
  const { Option } = Select;
  const options = [
    { label: "Cold", value: "Cold" },
    { label: "Fever", value: "Fever" },
    { label: "Cough", value: "Cough" },
    { label: "None", value: "None" },
  ];
  const stateOptions = [
    {
      label: "Gujarat",
      value: "Gujarat",
      city: [
        { label: "Ahmedabad", value: "Ahmedabad" },
        { label: "Surat", value: "Surat" },
      ],
    },
    {
      label: "Maharashtra",
      value: "Maharashtra",
      city: [
        { label: "Mumbai", value: "Mumbai" },
        { label: "Nagpur", value: "Nagpur" },
      ],
    },
    {
      label: "Uttar Pradesh",
      value: "Uttar Preadesh",
      city: [
        { label: "Kanpur", value: "Kanpur" },
        { label: "Lucknow", value: "Lucknow" },
      ],
    },
    {
      label: "Rajesthan",
      value: "Rajesthan",
      city: [
        { label: "Jaipur", value: "Jaipur" },
        { label: "Jaisalmer", value: "Jaisalmer" },
      ],
    },
    {
      label: "Haryana",
      value: "Haryana",
      city: [
        { label: "Faridabad", value: "Faridabad" },
        { label: "Gurugram", value: "Gurugram" },
      ],
    },
  ];
  const history = useHistory();
  const {
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SurveyFormType>({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (history.location.pathname.includes("edit")) {
      dispatch(fetchSurvey(props.match.params.id)).then((res: any) => {

        let makeData: SurveyFormType = {
          fullName: res.data.data.user?.fullName,
          email: res.data.data.user?.email,
          contact: res.data.data.user?.contact,
          address1: res.data.data.user?.address1,
          address2: res.data.data.user?.address2,
          landmark: res.data.data.user?.landmark,
          state: res.data.data.user?.state,
          city: res.data.data.user?.city,
          pinCode: res.data.data.user?.pinCode,
          userId: res.data.data.vaccinationDetail?.userId,
          vaccine: res.data.data.vaccinationDetail?.vaccine,
          vaccinatedDate: res.data.data.vaccinationDetail?.vaccinatedDate,
          ageGroup: res.data.data.vaccinationDetail?.ageGroup,
          symptoms: res.data.data.vaccinationDetail?.symptoms
            .toString()
            .split(","),
          medicines: res.data.data.vaccinationDetail?.medicines
            .toString()
            .split(","),
          rating: res.data.data.vaccinationDetail?.rating,
          feedback: res.data.data.vaccinationDetail?.feedback,
        };
        reset(makeData);
      });
    }
  }, []);
  const selectedState = watch("state");
  const onSubmit = async (data: SurveyFormType) => {
    data.symptoms = data.symptoms.toString();
    data.medicines = data.medicines.toString();
    data.vaccinatedDate = moment(data.vaccinatedDate).format("DD-MM-YYYY");
    data.userId = props.match.params.id;
    if (props.match.params.id) {
      dispatch(updateSurvey(data, vaccinationDetail?._id)).then((res: any) => {
        if (res && res?.data.success) {
          history.push("/vaccine/all/" + res.data.data.userId);
        }
      });
    } else {
      dispatch(submitDetail(data)).then((res: any) => {
        if (res && res?.data.success) {
          history.push("/vaccine/submit/detail/" + res.data.data.userId);
        }
      });
    }
  };

  return (
    <div className="container">
      <h1 className="header">Vaccination Survey form</h1>
      <div className="form">
        <form>
          <Row>
            <Col>
              <div className="form-group">
                <label>
                  Enter Full Name<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="Enter your name"
                      {...field}
                    />
                  )}
                />
                <span className="error-message">
                  {errors.fullName?.message}
                </span>
              </div>

              <div className="form-group">
                <label>
                  Enter Email<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="Enter your email"
                      {...field}
                    />
                  )}
                />
                <span className="error-message">{errors.email?.message}</span>
              </div>

              <div className="form-group">
                <label>
                  Enter Contact<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="contact"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      type="number"
                      placeholder="Enter your contact number"
                      {...field}
                    />
                  )}
                />

                <span className="error-message">{errors.contact?.message}</span>
              </div>

              <div className="form-group">
                <label>
                  Enter Address line 1<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="address1"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="Enter Address line 1"
                      {...field}
                    />
                  )}
                />

                <span className="error-message">
                  {errors.address1?.message}
                </span>
              </div>

              <div className="form-group">
                <label>
                  Enter Address line 2<p>:</p>
                </label>
                <Controller
                  name="address2"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="Enter Address line 2"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="form-group">
                <label>
                  Enter Landmark
                  <p>:</p>
                </label>
                <Controller
                  name="landmark"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="Enter your landmark"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="form-group">
                <label className="l-question">
                  Select State<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select State"
                      optionLabelProp="label"
                      {...field}
                    >
                      {stateOptions.map((option) => (
                        <Option
                          key={Math.random() * 100}
                          value={option.value}
                          label={option.label}
                        >
                          <div className="demo-option-label-item">
                            {option.label}
                          </div>
                        </Option>
                      ))}
                    </Select>
                  )}
                />

                <span className="error-message">{errors.state?.message}</span>
              </div>

              <div className="form-group">
                <label className="l-question">
                  Select City<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select city"
                      optionLabelProp="label"
                      {...field}
                    >
                      {stateOptions[
                        stateOptions.findIndex((x) => x.value === selectedState)
                      ]?.city.map((option) => (
                        <Option
                          key={Math.random() * 100}
                          value={option.value}
                          label={option.label}
                        >
                          <div className="demo-option-label-item">
                            {option.label}
                          </div>
                        </Option>
                      ))}
                      {selectedState === undefined && (
                        <>
                          <Option value="Delhi" label="Delhi">
                            <div className="demo-option-label-item">Delhi</div>
                          </Option>
                          <Option value="Hyderabad" label="Hyderabad">
                            <div className="demo-option-label-item">
                              Hyderabad
                            </div>
                          </Option>
                          <Option value="Ahmedabad" label="Ahmedabad">
                            <div className="demo-option-label-item">
                              Ahmedabad
                            </div>
                          </Option>
                          <Option value="Surat" label="Surat">
                            <div className="demo-option-label-item">Surat</div>
                          </Option>
                          <Option value="Pune" label="Pune">
                            <div className="demo-option-label-item">Pune</div>
                          </Option>
                        </>
                      )}
                    </Select>
                  )}
                />

                <span className="error-message">{errors.city?.message}</span>
              </div>

              <div className="form-group">
                <label>
                  Enter Pincode<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="pinCode"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="Enter pin code"
                      {...field}
                    />
                  )}
                />

                <span className="error-message">{errors.pinCode?.message}</span>
              </div>

              <div className="form-group-d">
                <div className="radio">
                  <label>
                    Which vaccine you have taken?
                    <sup className="required">*</sup>
                  </label>
                  <Controller
                    name="vaccine"
                    control={control}
                    defaultValue={COVACCINE}
                    render={({ field }) => (
                      <Radio.Group
                        className="form-item"
                        {...field}
                        defaultValue={COVACCINE}
                      >
                        <Radio value={COVACCINE}>{COVACCINE}</Radio>
                        <Radio value={COVISHIELD}>{COVISHIELD}</Radio>
                      </Radio.Group>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="question">
                  Select vaccination date<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="vaccinatedDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      defaultValue={
                        props.match.params.id
                          ? moment(vaccinationDetail?.vaccinatedDate)
                          : undefined
                      }
                      onChange={(date) => field.onChange(date)}
                      format="YYYY-MM-DD"
                    />
                  )}
                />

                <span className="error-message">
                  {errors.vaccinatedDate?.message}
                </span>
              </div>
              <div className="form-group">
                <label className="l-question">
                  Select your age group<sup className="required">*</sup>
                  <p>:</p>
                </label>
                <Controller
                  name="ageGroup"
                  control={control}
                  render={({ field }) => (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select age group"
                      optionLabelProp="label"
                      {...field}
                    >
                      <Option value="0-17" label="0-17">
                        <div className="demo-option-label-item">0-17</div>
                      </Option>
                      <Option value="18-45" label="18-45">
                        <div className="demo-option-label-item">18-45</div>
                      </Option>
                      <Option value="46-100" label="46-100">
                        <div className="demo-option-label-item">46-100</div>
                      </Option>
                    </Select>
                  )}
                />

                <span className="error-message">
                  {errors.ageGroup?.message}
                </span>
              </div>
              <div className="form-group-d">
                <label className="l-question">
                  What symptoms you got after vaccination?
                  <sup className="required">*</sup>
                </label>
                <Controller
                  name="symptoms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox.Group
                      className="form-item"
                      options={options}
                      onChange={(value) => field.onChange(value)}
                      // value={props.match.params.id? vaccinationDetail?.symptoms.toString().split(","): []}
                      // value={["Cold"]}
                    />
                  )}
                />
                <span className="error-message">
                  {errors?.symptoms?.message}
                </span>
              </div>
              <div className="form-group-d">
                <label className="l-question">
                  What medicines you got after vaccination?
                  <sup className="required">*</sup>
                </label>
                <Controller
                  name="medicines"
                  control={control}
                  render={({ field }) => (
                    <Select
                      mode="multiple"
                      placeholder="Select medicines"
                      style={{ width: "100%" }}
                      {...field}
                      optionLabelProp="label"
                      // value={props.match.params.id? vaccinationDetail?.medicines.toString().split(","): []}
                    >
                      <Option value="Dollo" label="Dollo">
                        <div className="demo-option-label-item">Dollo 650</div>
                      </Option>
                      <Option value="Paracetamol" label="Paracetamol">
                        <div className="demo-option-label-item">
                          Paracetamol
                        </div>
                      </Option>
                      <Option value="Disprine" label="Disprine">
                        <div className="demo-option-label-item">Disprine</div>
                      </Option>
                      <Option value="Comiflame" label="Comiflame">
                        <div className="demo-option-label-item">Comiflame</div>
                      </Option>
                      <Option value="None" label="None">
                        <div className="demo-option-label-item">None</div>
                      </Option>
                    </Select>
                  )}
                />
                <span className="error-message">
                  {errors.medicines?.message}
                </span>
              </div>
              <div className="form-group">
                <div className="form-item">
                  <label className="l-question">
                    Provide rating to vaccination management system
                  </label>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <Rate
                        allowHalf
                        defaultValue={2.5}
                        onChange={(value: number) => field.onChange(value)}
                        // value={props.match.params.id ? vaccinationDetail?.rating : 2.5}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="feedback-label">
                  Provide your valuable feedback:
                </label>
                <Controller
                  name="feedback"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      rows={4}
                      placeholder="Provide your feedback"
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="form-group-action">
              <Button
                className="submit"
                type="primary"
                onClick={handleSubmit(onSubmit)}
                ghost
              >
                {props.match.params.id ? "Update" : "Submit"}
              </Button>

              {props.match.params.id && (
                <Link to={`/vaccine/all/${vaccinationDetail?.userId}`}>
                  <Button
                    className="reset"
                    // onClick={() => reset({ vaccine: COVACCINE })}
                    danger
                  >
                    Cancel
                  </Button>
                </Link>
              )}
              {!props.match.params.id && (
                <Button
                  className="reset"
                  onClick={() => reset({ vaccine: COVACCINE })}
                  danger
                >
                  Reset
                </Button>
              )}
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Rate,
} from "antd";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { SurveyFormType } from "../../../../../dto/survey.dto";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { fetchSurvey } from "../../../../../redux/surveyAction";
import { Controller, useForm, UseFormWatch } from "react-hook-form";
import { COVACCINE, COVISHIELD, stateOptions } from "../../../../../constants";
import "./DrawerSurveyForm.scss";
import moment from "moment";
interface DrawerSurveyFormProps {
  control: any;
  watch: UseFormWatch<SurveyFormType>;
  errors: any;
  editMode: string;
  viewMode?: string;
}

const DrawerSurveyForm: React.FunctionComponent<DrawerSurveyFormProps> = ({
  editMode,
  viewMode,
  control,
  watch,
  errors,
}) => {
  const options = [
    { label: "Cold", value: "Cold" },
    { label: "Fever", value: "Fever" },
    { label: "Cough", value: "Cough" },
    { label: "None", value: "None" },
  ];
  const { vaccinationDetail } = useAppSelector(
    (state) => ({
      vaccinationDetail: state.vaccinationDetail,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();
  const { TextArea } = Input;
  const { Option } = Select;
  const history = useHistory();
  const selectedState = watch("state");

  return (
    <form id="form" className="drawer-form">
      <Row gutter={16}>
        <Col span={12}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />
            <span className="error-message">{errors.fullName?.message}</span>
          </div>
        </Col>
        <Col span={12}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />
            <span className="error-message">{errors.email?.message}</span>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />

            <span className="error-message">{errors.contact?.message}</span>
          </div>
        </Col>
        <Col span={12}>
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
                  size="large"
                  {...field}
                  open={viewMode !== "" ? false : undefined}
                  // readOnly={viewMode !=="" ? true : false}
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
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />

            <span className="error-message">{errors.address1?.message}</span>
          </div>
        </Col>
        <Col span={12}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />
          </div>
        </Col>
        <Col span={12}>
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
                  size="large"
                  {...field}
                  open={viewMode !== "" ? false : undefined}
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
                        <div className="demo-option-label-item">Hyderabad</div>
                      </Option>
                      <Option value="Ahmedabad" label="Ahmedabad">
                        <div className="demo-option-label-item">Ahmedabad</div>
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
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />

            <span className="error-message">{errors.pinCode?.message}</span>
          </div>
        </Col>
        <Col span={12}>
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
                  size="large"
                  placeholder="Select age group"
                  optionLabelProp="label"
                  {...field}
                  open={viewMode !== "" ? false : undefined}
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

            <span className="error-message">{errors.ageGroup?.message}</span>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div className="form-group-item">
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
                  // readOnly={viewMode !=="" ? true : false}
                >
                  <Radio
                    value={COVACCINE}
                    disabled={viewMode !== "" ? true : false}
                  >
                    {COVACCINE}
                  </Radio>
                  <Radio
                    value={COVISHIELD}
                    disabled={viewMode !== "" ? true : false}
                  >
                    {COVISHIELD}
                  </Radio>
                </Radio.Group>
              )}
            />
          </div>
        </Col>
        <Col span={10}>
          <div className="form-group">
            <label className="question">
              Select vaccination date<sup className="required">*</sup>
              <p>:</p>
            </label>
            <Controller
              name="vaccinatedDate"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <DatePicker
                  disabled={viewMode !== "" ? true : false}
                  // defaultValue={editMode !== "" || viewMode !== ""
                  // ? moment(field.value, "YYYY-MM-DD") : undefined}
                  onChange={(date) => field.onChange(date)}
                  value={
                    editMode !== "" || viewMode !== ""
                      ? moment(field.value, "YYYY-MM-DD")
                      : undefined
                  }
                  format="YYYY-MM-DD"
                  disabledDate={(current) => {
                    return current && current > moment().endOf("day");
                  }}
                  //       disabledDate={(current) => {
                  //         console.log(current);
                  //         const start = moment('2020-01-01','YYYY-MM-DD');
                  // return  current< start || current>moment();
                  //         }}
                />
              )}
            />

            <span className="error-message">
              {errors.vaccinatedDate?.message}
            </span>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div className="form-group-item">
            <label className="l-question">
              Which medicines you got after vaccination?
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
                  disabled={viewMode !== "" ? true : false}
                  // value={props.match.params.id? vaccinationDetail?.medicines.toString().split(","): []}
                >
                  <Option value="Dollo" label="Dollo">
                    <div className="demo-option-label-item">Dollo 650</div>
                  </Option>
                  <Option value="Paracetamol" label="Paracetamol">
                    <div className="demo-option-label-item">Paracetamol</div>
                  </Option>
                  <Option value="Disprine" label="Disprine">
                    <div className="demo-option-label-item">Disprine</div>
                  </Option>
                  <Option value="Comiflame" label="Comiflame">
                    <div className="demo-option-label-item">Comiflame</div>
                  </Option>
                  <Option value="Other" label="Other">
                    <div className="demo-option-label-item">Other</div>
                  </Option>
                  <Option value="None" label="None">
                    <div className="demo-option-label-item">None</div>
                  </Option>
                </Select>
              )}
            />
            <span className="error-message">{errors.medicines?.message}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="form-group-item">
            <label className="l-question1">
              What symptoms you got after vaccination?
              <sup className="required">*</sup>
            </label>
            <Controller
              name="symptoms"
              control={control}
              render={({ field }) => (
                <Checkbox.Group
                  className="checkbox-group"
                  options={options}
                  // onChange={(value) => field.onChange(value)}
                  disabled={viewMode !== "" ? true : false}
                  {...field}
                  // value={vaccinationDetail?.symptoms.toString().split(",")}
                  // value={["Cold"]}
                />
              )}
            />
            <span className="error-message">{errors?.symptoms?.message}</span>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="rating-div" span={24}>
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
                    value={field.value}
                    onChange={(value: number) => field.onChange(value)}
                    disabled={viewMode !== "" ? true : false}
                  />
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
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
                  readOnly={viewMode !== "" ? true : false}
                />
              )}
            />
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default DrawerSurveyForm;

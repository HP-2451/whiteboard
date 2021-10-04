import { Button, Card } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { RouteParams, SurveyFormType } from "../../../../dto/survey.dto";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  fetchAllSurveys,
  fetchSurvey,
  fetchSurveys,
  filterByVaccine,
  searchSurveyByUserName,
  submitDetail,
  updateSurvey,
} from "../../../../redux/surveyAction";
import "./Dashboard.scss";
import { Drawer, Form, Col, Row, Input, Select, DatePicker, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import DrawerSurveyForm from "./drawer-survey-form/DrawerSurveyForm";
import SurveyTable from "./survey-list/SurveyTable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  ADDRESS_REQ,
  AGEGROUP_REQ,
  ALL,
  CITY_REQ,
  CONTACT,
  CONTACT_ERR,
  CONTACT_REQ,
  COVACCINE,
  COVISHIELD,
  EMAIL,
  EMAIL_ERR,
  EMAIL_REQ,
  FULL_NAME_REQ,
  MEDICINES_REQ,
  NAME,
  PINCODE_REQ,
  STATE_REQ,
  SYMPTOMS_REQ,
  VACCINATION_DATE_REQ,
  VACCINE_REQ,
} from "../../../../constants";
import moment from "moment";
import jsPdf from "jspdf";
// import autoTable from 'jspdf-autotable';
import html2canvas from "html2canvas";
interface MyComponent extends RouteComponentProps<RouteParams> {}

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

const Dashboard: React.FunctionComponent<MyComponent> = (props) => {
  const { Option } = Select;
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<string>("");
  const [viewMode, setViewMode] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const history = useHistory();
  const { entities, user, vaccinationDetail } = useAppSelector(
    (state) => ({
      entities: state.entities,
      user: state.user,
      vaccinationDetail: state.vaccinationDetail,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllSurveys());
    reset({});
  }, []);

  useEffect(() => {
    if (editMode !== "" || viewMode !== "") {
      let id = editMode !== "" ? editMode : viewMode !== "" ? viewMode : "";
      dispatch(fetchSurvey(id)).then((res: any) => {
        console.log("res", res.data.data.vaccinationDetail.symptoms);
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
        console.log(makeData.symptoms);

        reset(makeData);
      });
    }
  }, [editMode, viewMode]);

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<SurveyFormType>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SurveyFormType) => {
    data.symptoms = data.symptoms.toString();
    data.medicines = data.medicines.toString();
    data.vaccinatedDate = moment(data.vaccinatedDate).format("YYYY-MM-DD");
    if (editMode) {
      dispatch(updateSurvey(data, vaccinationDetail?._id)).then((res: any) => {
        if (res && res?.data.success) {
          setVisibleDrawer(false);
          setEditMode("");
          setViewMode("");
          reset({});
          dispatch(fetchAllSurveys());
        }
      });
    } else {
      // let pdfData: any = [];
      // entities?.forEach((obj: any) => {
      //   let pdfObj = [
      //    obj.user.fullName,
      //    obj.user.email,
      //    obj.user.contact,
      //    obj.user.pinCode,
      //    obj.vaccine,
      //   ]
      //   pdfData.push(pdfObj);
      // });
      // console.log(pdfData);

      let doc = new jsPdf("l", "mm", "a4");
      let form: any = document.getElementById("form");

      //   // autoTable(doc, {  head: [["Name", "Email", "Contact","PinCode", "Vaccine"]], body:pdfData});
      //   let pdfSampleData = doc.output('datauristring'); //returns raw body
      //   data.pdfData = pdfSampleData
      // console.log(pdfSampleData);
      // doc.text(`Name : ${data.fullName}`, 10, 10)
      // doc.text(`Email : ${data.email}`, 20, 20)

      html2canvas(form).then((canvas) => {
        const img = canvas.toDataURL("image/jpeg");
        console.log("image",img);
        
        doc.addImage(img, "JPEG", 50, 10, 200, 200);
        // doc.save("file.pdf")
        let pdfSampleData = doc.output('dataurlstring');
        
        console.log(pdfSampleData);
        data.pdfData = pdfSampleData;
        // console.log(typeof pdfSampleData);

        dispatch(submitDetail(data)).then((res: any) => {
          if (res && res?.data.success) {
            setVisibleDrawer(false);
            setEditMode("");
            setViewMode("");
            dispatch(fetchAllSurveys());
            // history.push("/vaccine/submit/detail/" + res.data.data.userId);
          }
        });
      });
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      dispatch(fetchAllSurveys());
    } else {
      dispatch(
        searchSurveyByUserName(e.target.value.toLowerCase(), searchType)
      );
    }
    setSearchValue(e.target.value);
  };
  const handleFilter = (value: string) => {
    if (value === "All") {
      dispatch(fetchAllSurveys());
    } else {
      dispatch(filterByVaccine(value));
    }
  };

  const handleFilterVaccinatedDate = (value: moment.Moment | null) => {
    if (value === null) {
      dispatch(fetchAllSurveys());
    } else {
      dispatch(filterByVaccine(moment(value).format("DD-MM-YYYY")));
    }
  };
  return (
    <Card className="dashboard-card">
      <div className="dashboard-header">
        <div className="filter-box">
          <span className="header">Select Search Type : </span>
          <Select
            style={{ width: "100%" }}
            placeholder="Select type"
            optionLabelProp="label"
            onChange={(value: string) => setSearchType(value)}
            defaultValue={NAME}
            // size="medium"
          >
            <Option key={NAME} value={NAME} selected>
              {NAME}
            </Option>
            <Option key={EMAIL} value={EMAIL}>
              {EMAIL}
            </Option>
            <Option key={CONTACT} value={CONTACT}>
              {CONTACT}
            </Option>
          </Select>
        </div>
        <div className="search-box">
          <span>Search By User Detail : </span>
          <Input
            value={searchValue}
            onChange={(e) => handleSearch(e)}
            placeholder="Search Survey Detail"
          ></Input>
        </div>

        <div className="filter-box">
          <span className="header">Filter By Vaccine : </span>
          <Select
            style={{ width: "100%" }}
            placeholder="Select Vaccine"
            optionLabelProp="label"
            onChange={handleFilter}
            defaultValue={ALL}
            // size="medium"
          >
            <Option key={ALL} value={ALL} selected>
              {ALL}
            </Option>
            <Option key={COVACCINE} value={COVACCINE}>
              {COVACCINE}
            </Option>
            <Option key={COVISHIELD} value={COVISHIELD}>
              {COVISHIELD}
            </Option>
          </Select>
        </div>

        {/* <div className="filter-vaccinated-date-box">
          <span className="header">Filter By Vaccinated Date : </span>
          <DatePicker
            disabled={viewMode !== "" ? true : false}
            // defaultValue={editMode !== "" || viewMode !== ""
            // ? moment(field.value, "YYYY-MM-DD") : undefined}
            onChange={handleFilterVaccinatedDate}
            // value={}
            format="YYYY-MM-DD"
            disabledDate={(current) => {
              return current && current > moment().endOf("day");
            }}
          />
        </div> */}

        <Button
          className="add-survey-btn"
          type="primary"
          ghost
          onClick={() => setVisibleDrawer(true)}
        >
          <PlusCircleOutlined />
          Add Survey Form
        </Button>
        <Drawer
          title={
            <div>
              <p>
                {editMode !== ""
                  ? "Edit Survey"
                  : viewMode !== ""
                  ? "View Survey"
                  : "Add Survey"}
              </p>
            </div>
          }
          width={720}
          onClose={() => {
            setEditMode("");
            setViewMode("");
            reset({});
            setVisibleDrawer(false);
          }}
          visible={visibleDrawer}
        >
          <DrawerSurveyForm
            editMode={editMode}
            viewMode={viewMode}
            control={control}
            watch={watch}
            errors={errors}
          />
          <div className="form-action">
            <Button
              className="cancel-btn"
              onClick={() => {
                setEditMode("");
                setViewMode("");
                reset({});
                setVisibleDrawer(false);
              }}
              disabled={viewMode !== "" ? true : false}
            >
              Cancel
            </Button>
            <Button
              className="submit-btn"
              onClick={handleSubmit(onSubmit)}
              type="primary"
              disabled={viewMode !== "" ? true : false}
            >
              {editMode ? "Update" : "Submit"}
            </Button>
          </div>
        </Drawer>
      </div>
      <SurveyTable
        setVisibleDrawer={setVisibleDrawer}
        setEditMode={setEditMode}
        setViewMode={setViewMode}
      />
    </Card>
  );
};

export default Dashboard;

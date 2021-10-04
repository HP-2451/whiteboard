import { Table, Space, Popover, Button } from "antd";
import moment from "moment";
import { useState } from "react";
import { shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import {  VaccinationDetail } from "../../../dto/survey.dto";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deleteMultipleVaccineDetail,
  deleteVaccineDetail,
  fetchSurveys,
  handlePopup,
} from "../../../redux/surveyAction";
import MyPagination from "./Pagination";
import { Select } from "antd";

interface SurveyTableProps {
  id: string;
}

const SurveyTable: React.FunctionComponent<SurveyTableProps> = (props) => {
  const { Option } = Select;
  const [deleteR, setDeleteR] = useState<any>(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { entities } = useAppSelector(
    (state) => ({
      entities: state.entities,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     dispatch(fetchSurveys(props.match.params.id));
  //   }, []);

  const history = useHistory();

  const handleEdit = (record: any) => {
    history.push(`/edit/${record._id}`);
  };
  const handleDelete = (record: VaccinationDetail) => {
    dispatch(deleteVaccineDetail(record._id)).then((res: any) => {
      if (res && res.data.success) {
        dispatch(fetchSurveys(record.userId)).then((res: any) => {
          if (res.data.data.vaccinationDetail.length === 0) {
            history.push("/");
          }
        });
      }
    });
    dispatch(handlePopup(false, record._id));
  };
  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: VaccinationDetail[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setDeleteR(selectedRowKeys);
    },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const handleMultipleDelete = () => {
    dispatch(deleteMultipleVaccineDetail(deleteR)).then((res: any) => {
      if (res && res.data.success) {
        dispatch(fetchSurveys(props.id)).then((res: any) => {
          if (res.data.data.vaccinationDetail.length === 0) {
            history.push("/");
          }
        });
      }
    });
    setDeleteR([]);
  };
  const columns = [
    {
      title: "Vaccine Name",
      dataIndex: "vaccine",
      key: "vaccine",
      //   render: text => <a>{text}</a>,
    },
    {
      title: "Vaccinated Date",
      dataIndex: "age",
      key: "vaccinatedDate",
      render: (text: any) => (
        <p style={{ marginBottom: "0px" }}>
          {moment(text).format("YYYY-MM-DD")}
        </p>
      ),
    },
    {
      title: "Age Group",
      dataIndex: "ageGroup",
      key: "ageGroup",
    },
    {
      title: "Medicines",
      key: "medicines",
      dataIndex: "medicines",
    },
    {
      title: "Symptoms",
      key: "symptoms",
      dataIndex: "symptoms",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text: any) => (
        <p style={{ marginBottom: "0px", textAlign: "center" }}>
          {text ? text : "-"}
        </p>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (text: any) => (
        <p style={{ marginBottom: "0px", textAlign: "center" }}>
          {text ? text : "-"}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space>
          <a onClick={() => handleEdit(record)}>Edit</a>

          <Popover
            visible={record.visible}
            content={
              <>
                <p style={{ color: "red" }}>
                  Do you want to delete this record?
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => handleDelete(record)}>Yes</Button>
                  <Button
                    onClick={() => {
                      dispatch(handlePopup(false, record._id));
                    }}
                    style={{ marginLeft: "15px" }}
                  >
                    NO
                  </Button>
                </div>
              </>
            }
          >
            <a
              onClick={() => {
                dispatch(handlePopup(true, record._id));
              }}
            >
              Delete
            </a>
          </Popover>
        </Space>
      ),
    },
  ];

  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    return entities.slice((current - 1) * pageSize, current * pageSize);
  };

  const handlePageSize = (value: number) => {
    setPageSize(value);
  };

  return (
    <div className="table">
      {deleteR.length > 0 && (
        <div className="delete-btn-container">
          <Button danger ghost onClick={handleMultipleDelete}>
            <DeleteOutlined /> Delete Selected {deleteR.length} Records
          </Button>
        </div>
      )}
      <MyPagination
        total={entities.length}
        current={current}
        onChange={setCurrent}
        pageSize={1}
      />
      <Table
        columns={columns}
        dataSource={entities}
        // pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}}
        pagination={false}
        rowSelection={rowSelection}
      />
      <div className="page-size-container">
        <Select
          style={{ width: "100%" }}
          placeholder="Select Vaccine"
          optionLabelProp="label"
          onChange={handlePageSize}
          defaultValue={5}
          // size="medium"
        >
          <Option key={5} value={5} selected>
            5
          </Option>
          <Option key={10} value={10}>
            {10}
          </Option>
          <Option key={20} value={20}>
            {20}
          </Option>
        </Select>
      </div>
    </div>
  );
};

export default SurveyTable;

import { Table, Tag, Space, Popover, Button, Tooltip } from "antd";
import moment from "moment";
import { Dispatch, SetStateAction, useState } from "react";
import { shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  RouteParams,
  User,
  VaccinationDetail,
} from "../../../../../dto/survey.dto";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { FolderViewOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router-dom";
import {
  deleteMultipleVaccineDetail,
  deleteVaccineDetail,
  fetchAllSurveys,
  fetchSurveys,
  handlePopup,
} from "../../../../../redux/surveyAction";
import { Select } from "antd";
import MyPagination from "./Pagination";
interface SurveyTableProps {
  setVisibleDrawer: Dispatch<SetStateAction<boolean>>;
  setEditMode: Dispatch<SetStateAction<string>>;
  setViewMode: Dispatch<SetStateAction<string>>;
}

let locale = {
  emptyText: <p>No Records Found!</p>,
};
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
  const history = useHistory();

  const handleDelete = (record: VaccinationDetail) => {
    dispatch(deleteVaccineDetail(record._id)).then((res: any) => {
      if (res && res.data.success) {
        dispatch(fetchAllSurveys()).then((res: any) => {});
      }
    });
    dispatch(handlePopup(false, record._id));
  };
  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: VaccinationDetail[] | User[]
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
        dispatch(fetchAllSurveys()).then((res: any) => {});
      }
    });
    setDeleteR([]);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      width: 150,
      sorter: (a: any, b: any, sortOrder: any) =>
        a.user.fullName.localeCompare(b.user.fullName),
      render: (user: User) => (
        <p style={{ marginBottom: "0px" }}>{user.fullName}</p>
      ),

      // sortDirections: ['descend']

      // sorter: (a: User, b: User) => a.fullName > b.fullName,
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "user",
      width: 200,
      sorter: (a: any, b: any, sortOrder: any) =>
        a.user.email.localeCompare(b.user.email),
      render: (user: User) => (
        <p style={{ marginBottom: "0px" }}>{user.email}</p>
      ),
    },
    {
      title: "Contact",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: (user: User) => (
        <p style={{ marginBottom: "0px" }}>{user.contact}</p>
      ),
    },
    // {
    //   title: "Address 1",
    //   dataIndex: "user",
    //   key: "user",
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   width: 150,
    //   render: (user: User) => (
    //     <Tooltip placement="topLeft" title={user.address1}>
    //       <p style={{ marginBottom: "0px" }}>{user.address1}</p>
    //     </Tooltip>
    //   ),
    // },
    // {
    //   title: "Address 2",
    //   dataIndex: "user",
    //   key: "user",
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   width: 150,
    //   render: (user: User) => (
    //     <Tooltip placement="topLeft" title={user.address2}>
    //       <p style={{ marginBottom: "0px" }}>
    //         {user.address2 ? user.address2 : "-"}
    //       </p>
    //     </Tooltip>
    //   ),
    // },
    // {
    //   title: "Landmark",
    //   dataIndex: "user",
    //   key: "user",
    //   width: 150,
    //   sorter: (a: any, b: any, sortOrder: any) =>
    //     a.user.landmark.localeCompare(b.user.landmark),
    //   render: (user: User) => (
    //     <p style={{ marginBottom: "0px" }}>
    //       {user.landmark ? user.landmark : "-"}
    //     </p>
    //   ),
    // },
    // {
    //   title: "State",
    //   dataIndex: "user",
    //   key: "user",
    //   width: 150,
    //   sorter: (a: any, b: any, sortOrder: any) =>
    //     a.user.state.localeCompare(b.user.state),
    //   render: (user: User) => (
    //     <p style={{ marginBottom: "0px" }}>{user.state}</p>
    //   ),
    // },
    // {
    //   title: "City",
    //   dataIndex: "user",
    //   key: "user",
    //   width: 150,
    //   sorter: (a: any, b: any, sortOrder: any) =>
    //     a.user.city.localeCompare(b.user.city),
    //   render: (user: User) => (
    //     <p style={{ marginBottom: "0px" }}>{user.city}</p>
    //   ),
    // },
    {
      title: "Pin Code",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: (user: User) => (
        <p style={{ marginBottom: "0px" }}>{user.pinCode}</p>
      ),
    },
    {
      title: "Vaccine Name",
      dataIndex: "vaccine",
      key: "vaccine",
      width: 150,
      sorter: (a: any, b: any, sortOrder: any) =>
        a.vaccine.localeCompare(b.vaccine),
      //   render: text = <p>{text}</p>>,
    },
    // {
    //   title: "Vaccinated Date",
    //   dataIndex: "age",
    //   key: "vaccinatedDate",
    //   sorter: (a: any, b: any, sortOrder: any) =>
    //     moment(a.vaccinatedDate).unix() - moment(b.vaccinatedDate).unix(),
    //   render: (text: any) => (
    //     <p style={{ marginBottom: "0px" }}>
    //       {moment(text).format("YYYY-MM-DD")}
    //     </p>
    //   ),
    //   width: 150,
    // },
    // {
    //   title: "Age Group",
    //   dataIndex: "ageGroup",
    //   key: "ageGroup",
    //   width: 150,
    // },
    // {
    //   title: "Medicines",
    //   key: "medicines",
    //   dataIndex: "medicines",
    //   width: 150,
    // },
    // {
    //   title: "Symptoms",
    //   key: "symptoms",
    //   dataIndex: "symptoms",
    //   width: 150,
    // },
    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   width: 150,
    //   sorter: (a: any, b: any, sortOrder: any) => a.rating - b.rating,
    //   render: (text: any) => (
    //     <p style={{ marginBottom: "0px", textAlign: "center" }}>
    //       {text ? text : "-"}
    //     </p>
    //   ),
    // },
    // {
    //   title: "Feedback",
    //   dataIndex: "feedback",
    //   key: "feedback",
    //   width: 150,
    //   render: (text: any) => (
    //     <p style={{ marginBottom: "0px", textAlign: "center" }}>
    //       {text ? text : "-"}
    //     </p>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (record: any) => (
        <Space>
          <Tooltip placement="bottom" color="black" title="View record">
            <Button
              className="view-action-btn"
              size="small"
              onClick={() => {
                props.setVisibleDrawer(true);
                props.setViewMode(record._id);
              }}
            >
              <FolderViewOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" color="black" title="Edit record">
            <Button
              className="edit-action-btn"
              size="small"
              onClick={() => {
                props.setVisibleDrawer(true);
                props.setEditMode(record._id);
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>

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
            <Tooltip placement="bottom" color="black" title="Delete record">
              <Button
                className="delete-action-btn"
                size="small"
                onClick={() => {
                  dispatch(handlePopup(true, record._id));
                }}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Popover>
        </Space>
      ),
    },
  ];
  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    return entities?.slice((current - 1) * pageSize, current * pageSize);
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
      <Table
        columns={columns}
        dataSource={getData(current, pageSize)}
        locale={locale}
        pagination={false}
        // pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}}
        rowSelection={rowSelection}
      />
      <div className="table-footer">
        <div className="page-size-container">
          <label>Rows per page : </label>
          <Select
            style={{marginLeft:"10px"}}
            placeholder="Select Page size"
            optionLabelProp="label"
            onChange={handlePageSize}
            defaultValue={5}
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
        <MyPagination
          total={entities?.length}
          current={current}
          onChange={setCurrent}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default SurveyTable;

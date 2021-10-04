import { Grow, MenuList, Popper } from "@material-ui/core";
import { MenuItem, Paper, ClickAwayListener } from "@material-ui/core";
import { Button, Card } from "antd";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { VaccinationDetail } from "../../dto/survey.dto";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteVaccineDetail, fetchSurveys } from "../../redux/surveyAction";
import { useAppDispatch } from "../../redux/store";
interface SurveyCardProps {
  survey: VaccinationDetail;
}

const SurveyCard: React.FunctionComponent<SurveyCardProps> = (props) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLHeadingElement>(null);
  const history = useHistory();
  const Title = () => (
    <div className="header-content">
      <div></div>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleToggle(e)}
      >
        <MoreOutlined />
      </Button>
      <Popper
        className="popper"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  // onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e:any) => {
                      e.stopPropagation();
                      history.push(`/edit/${props.survey.userId}`);
                    }}
                  >
                    <EditOutlined />
                    &nbsp;Edit
                  </MenuItem>
                  <MenuItem
                    onClick={(e:any) => {
                      e.stopPropagation();
                      dispatch(deleteVaccineDetail(props.survey._id))
                      .then((res : any) => {
                          if(res && res.data.success){
                            dispatch(fetchSurveys(props.survey.userId))
                            .then((res : any) => {
                                if(res.data.data.vaccinationDetail.length == 0){
                                    history.push("/")
                                }
                            })
                          }
                      })
                      // membersUIProps.openEditMemberDialog(employee.id);
                    }}
                  >
                    <DeleteOutlined />
                    &nbsp;Delete
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const openDetailView = (e: any) => {
    history.push(`/vaccine/detail/${props.survey.userId}`);
  };
  return (
    <Card
      className="survey-card"
      title={<Title />}
      bordered={false}
      style={{ width: 300 }}
      onClick={openDetailView}
    >
      <div className="card-body">
        <div className="card-detail">
          <label>Vaccine Name</label>
          <p>{props.survey.vaccine ? props.survey.vaccine : "-"}</p>
        </div>
        <div className="card-detail">
          <label>Vaccinated Date</label>
          <p>{props.survey.vaccinatedDate ? props.survey.vaccinatedDate : "-"}</p>
        </div>
        <div className="card-detail">
          <label>Medicines</label>
          <p>{props.survey.medicines ? props.survey.medicines : "-"}</p>
        </div>
        <div className="card-detail">
          <label>Symptoms</label>
          <p>{props.survey.symptoms ? props.survey.symptoms : "-"}</p>
        </div>
        <div className="card-detail">
          <label>Rating</label>
          <p>{props.survey.rating ? props.survey.rating : "-"}</p>
        </div>
        <div className="card-detail">
          <label>Feedback</label>
          <p>{props.survey.feedback ? props.survey.feedback : "-"}</p>
        </div>
      </div>
      {/* <div className="card-footer">
        <div className="created-at">
          <FieldTimeOutlined
            style={{ fontSize: "22px", color: "#08c" }}
          />
          <p>2021-03-02</p>
        </div>
      </div> */}
    </Card>
  );
};

export default SurveyCard;

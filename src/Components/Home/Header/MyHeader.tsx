import { Button } from "antd";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { logout } from "../../../redux/surveyAction";
import "./Header.scss";
interface HeaderProps {}

const MyHeader: React.FunctionComponent<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    history.push("/login");
  };
  return (
    <div className="header-container">
      <Button
        className="signout-btn"
        type="primary"
        ghost
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </div>
  );
};

export default MyHeader;

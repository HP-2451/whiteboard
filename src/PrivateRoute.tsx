// import { Layout } from "antd";
import { Redirect, Route , RouteProps} from "react-router";

import { useAppSelector } from "./redux/store";
import { shallowEqual } from "react-redux";


interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({...rest}) => {
  const { auth } = useAppSelector(
    (state) => ({
      auth: state.auth,
    }),
    shallowEqual
  );

  if(localStorage.getItem("user") === null && auth === undefined) return <Redirect to="/login" />;
  return <Route {...rest} />
};

export default PrivateRoute;

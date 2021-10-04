import React from "react";
import "./App.css";
import SurveyForm from "./Components/SurveyForm";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import DisplayForm from "./Components/DisplayForm";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "./redux/store";
import Surveys from "./Components/Surveys";
import Login from "./Components/Login";
import Home from "./Components/Home";
import PrivateRoute from "./PrivateRoute";
function App() {
  const { auth } = useAppSelector(
    (state) => ({
      auth: state.auth,
    }),
    shallowEqual
  );
 
  return (
    <div className="App">
      <Router>
        <Switch>
          {(localStorage.getItem("user") !== null || auth !== undefined) && (
            <Redirect from="/login" to="/" />
          )}
          <Route exact path="/login" component={Login} />
          <Route exact path="/survey" component={SurveyForm} />
          <Route exact path="/edit/:id" component={SurveyForm} />
          <Route
            exact
            path="/vaccine/submit/detail/:id"
            component={DisplayForm}
          />
          <Route exact path="/vaccine/detail/:id" component={DisplayForm} />
          <Route exact path="/vaccine/all/:id" component={Surveys} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

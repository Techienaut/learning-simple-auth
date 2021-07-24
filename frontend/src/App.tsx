import React from "react";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink activeClassName="active" to="/dashboard">
            Dashboard
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Redirect to="/login" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

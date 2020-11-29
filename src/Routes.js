import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from './contexts/authentication';
import { App } from "./views/App";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import { AccountCreation } from "./views/AccountCreation";
import { FourZeroFour } from "./views/FourZeroFour";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { UnauthenticatedRoute } from "./components/UnauthenticatedRoute";

export default function Routes() {
  const [hasCheckedCredentials, setHasCheckedCredentials] = useState(false);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("userData", JSON.stringify({ token }));
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem("userData");
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.token);
    }

    setHasCheckedCredentials(true);
  }, []);

  return hasCheckedCredentials ? (
    <AuthContext.Provider value={{ isLoggedIn: !!token, login: login, logout: logout }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
        <UnauthenticatedRoute exact path="/signup" component={Signup} />
        <Route exact path="/accounts/new" component={AccountCreation} />
        <AuthenticatedRoute exact path="/accounts/:account_id" component={App} />
        <AuthenticatedRoute exact path="/accounts/:account_id/channels/:channel_id" component={App} />

        <Route component={FourZeroFour} />
      </Switch>
    </AuthContext.Provider>
  ) : null; // TODO: Replace null with loading page
}
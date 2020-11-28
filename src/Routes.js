import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from './contexts/authentication';
import { App } from "./views/App";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { AccountCreation } from "./views/AccountCreation";
import { FourZeroFour } from "./views/FourZeroFour";
import { PrivateRoute } from "./components/PrivateRoute";

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
        <Route exact path="/login" component={Login} />
        <Route exact path="/accounts/new" component={AccountCreation} />
        <PrivateRoute exact path="/accounts/:id" component={App} />

        <Route component={FourZeroFour} /> {/* 404 page not working */}
      </Switch>
    </AuthContext.Provider>
  ) : null; // TODO: Replace null with loading page
}
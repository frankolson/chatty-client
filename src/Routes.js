import React from "react";
import { Switch, Route } from "react-router-dom";
import { App } from "./views/App";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import { AccountCreation } from "./views/AccountCreation";
import { FourZeroFour } from "./views/FourZeroFour";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { UnauthenticatedRoute } from "./components/UnauthenticatedRoute";
import { AuthProvider } from "./contexts/authentication";

export default function Routes() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
        <UnauthenticatedRoute exact path="/signup" component={Signup} />
        <Route exact path="/accounts/new" component={AccountCreation} />
        <AuthenticatedRoute exact path="/accounts/:account_id" component={App} />
        <AuthenticatedRoute exact path="/accounts/:account_id/channels/:channel_id" component={App} />

        <Route component={FourZeroFour} />
      </Switch>
    </AuthProvider>
  );
}
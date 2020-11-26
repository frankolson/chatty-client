import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { FourZeroFour } from "./views/FourZeroFour";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route component={FourZeroFour} />
    </Switch>
  );
}
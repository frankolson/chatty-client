import React, { useContext } from "react";
import { AuthStateContext } from "../../contexts/authentication";
import { Redirect, Route } from "react-router-dom";

export default function AuthenticatedRoute({ component: Component, ...rest }: any) {
  const authStateContext = useContext(AuthStateContext);

  return (
    <Route
      {...rest}
      render={props =>
        !!authStateContext.token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
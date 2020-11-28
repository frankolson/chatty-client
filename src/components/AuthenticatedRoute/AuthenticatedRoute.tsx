import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authentication";
import { Redirect, Route } from "react-router-dom";

export default function AuthenticatedRoute({ component: Component, ...rest }: any) {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        authContext.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
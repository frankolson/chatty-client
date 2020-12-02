import React, { useContext, useState, useEffect } from "react";
import { AuthStateContext, AuthDispatchContext } from "../../contexts/authentication";
import { Redirect, Route, RouteComponentProps, useHistory } from "react-router-dom";
import { getMyProfile } from "../../utils/api";
import { IProfile } from "../../utils/types";

export default function UnauthenticatedRoute({ component: Component, ...rest }: any) {
  const history = useHistory();
  const authStateContext = useContext(AuthStateContext);
  const authDispatchContext = useContext(AuthDispatchContext);
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    if (!!authStateContext.token) {
      getMyProfile(authDispatchContext, history)
        .then((data: IProfile) => setProfile(data));
    }
  }, [authStateContext, authDispatchContext, history]);

  function renderRedirect(props: RouteComponentProps) {
    return profile ? (
      <Redirect to={{ pathname: `/accounts/${profile?.account_id}`, state: { from: props.location } }} />
    ) : null;
  }

  return (
    <Route
      {...rest}
      render={props =>
        !!authStateContext.token ? renderRedirect(props) : <Component {...props} />
      }
    />
  )
}
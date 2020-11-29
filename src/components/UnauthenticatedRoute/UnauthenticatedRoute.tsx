import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authentication";
import { Redirect, Route, RouteComponentProps, useHistory } from "react-router-dom";
import { getMyProfile, IProfile } from "../../utils/api";

export default function UnauthenticatedRoute({ component: Component, ...rest }: any) {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      getMyProfile(authContext, history)
        .then((data: IProfile) => setProfile(data));
    }
  }, [authContext, history]);

  function renderRedirect(props: RouteComponentProps) {
    return profile ? (
      <Redirect to={{ pathname: `/accounts/${profile?.account_id}`, state: { from: props.location } }} />
    ) : null;
  }

  return (
    <Route
      {...rest}
      render={props =>
        authContext.isLoggedIn ? renderRedirect(props) : <Component {...props} />
      }
    />
  )
}
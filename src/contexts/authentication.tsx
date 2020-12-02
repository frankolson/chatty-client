import React, { createContext, useReducer, useEffect, ReactNode, Dispatch, useState } from "react";
import { AuthReducer, authInitialState, IAuthReducerState, IAuthReducerAction, getStoredToken } from "../reducers/authentication";

export interface IAuthProvider {
  children: ReactNode;
}

export function login(dispatch: Dispatch<IAuthReducerAction>, token: string) {
  dispatch({ type: 'LOGIN', payload: { token } })
  localStorage.setItem("userData", JSON.stringify({ token }));
}

export function logout(dispatch: Dispatch<IAuthReducerAction>) {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem("userData");
}

export const AuthStateContext = createContext<IAuthReducerState>(authInitialState);
export const AuthDispatchContext = createContext<Dispatch<IAuthReducerAction>>({} as Dispatch<IAuthReducerAction>);

export function AuthProvider({ children }: IAuthProvider) {
  const [authState, authDispatch] = useReducer(AuthReducer, authInitialState);
  const [hasCheckedCredentials, setHasCheckedCredentials] = useState(false);

  useEffect(() => {
    login(authDispatch, getStoredToken());

    setHasCheckedCredentials(true);
  }, []);

  return hasCheckedCredentials ? (
    <AuthStateContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  ) : null; // TODO: Replace null with loading page
};
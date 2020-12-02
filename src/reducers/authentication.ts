import React from "react";

export interface IAuthReducerState {
  token: string;
}

export type LoginReducerAction = {
  type: "LOGIN";
  payload: {
    token: string;
  }
}

export type LogoutReducerAction = {
  type: "LOGOUT";
}

export type IAuthReducerAction = LoginReducerAction | LogoutReducerAction;

export function getStoredToken() {
  return localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")!).token
    : "";
}

export const authInitialState: IAuthReducerState = {
  token: "" || getStoredToken(),
};

export function AuthReducer(state: IAuthReducerState, action: IAuthReducerAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        token: ""
      };
  }
};
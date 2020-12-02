import { Dispatch } from "react";
import { History } from 'history';
import { logout as contextLogout } from "../contexts/authentication";
import { IAuthReducerAction } from "../reducers/authentication";

const serverAddress = 'http://localhost:3000';

export interface IProfile {
  account_id: number | null;
  name: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  account_id: number | null;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ICreateAccount {
  name: string;
  owner_name: string;
  owner_email: string;
  owner_password: string;
  owner_password_confirmation: string;
}

export function getAuthToken() {
  const storedUserData = JSON.parse(localStorage.getItem("userData") || '{}')

  if (storedUserData && storedUserData.token) {
    return storedUserData.token
  } else {
    return undefined;
  }
}

function checkForAuthError(errorResponse: Response, dispatch: Dispatch<IAuthReducerAction>, history: History) {
  if (errorResponse.status === 401) {
    contextLogout(dispatch);

    if (history.location.pathname !== '/login') {
      history.push('/login');
    }
  }
}

export function login(loginValues: ILogin) {
  return fetch(`${serverAddress}/users/sign_in`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ user: loginValues })
  })
}

export function signup(signupValues: ISignup) {
  return fetch(`${serverAddress}/users`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ user: signupValues })
  })
}

export function listAccounts() {
  return fetch(`${serverAddress}/accounts`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
}

export function getAccount(accountId: string, dispatch: Dispatch<IAuthReducerAction>, history: History): Promise<any> {
  return fetch(`${serverAddress}/accounts/${accountId}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  }).then((response: Response) => {
      if (!response.ok) { throw response; }
      return response;
    })
    .catch((errorResponse: Response) => {
      checkForAuthError(errorResponse, dispatch, history);
      return errorResponse;
    });
}

export function createAccount(createAccountValues: ICreateAccount) {
  return fetch(`${serverAddress}/accounts`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ account: createAccountValues })
  })
}

export function getMyProfile(dispatch: Dispatch<IAuthReducerAction>, history: History) {
  return fetch(`${serverAddress}/my/profile`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  }).then((response: Response) => {
      if (!response.ok) { throw response; }
      return response.json();
    })
    .catch((errorResponse: Response) => {
      checkForAuthError(errorResponse, dispatch, history);
      return errorResponse;
    });
}

export function listChannels(accountId: string, dispatch: Dispatch<IAuthReducerAction>, history: History) {
  return fetch(`${serverAddress}/accounts/${accountId}/channels`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  }).then((response: Response) => {
      if (!response.ok) { throw response; }
      return response;
    })
    .catch((errorResponse: Response) => {
      checkForAuthError(errorResponse, dispatch, history);
      return errorResponse;
    });
}

export function getChannel(accountId: string | number, channelId: string | number, dispatch: Dispatch<IAuthReducerAction>, history: History) {
  return fetch(`${serverAddress}/accounts/${accountId}/channels/${channelId}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    }
  }).then((response: Response) => {
      if (!response.ok) { throw response; }
      return response;
    })
    .catch((errorResponse: Response) => {
      checkForAuthError(errorResponse, dispatch, history);
      return errorResponse;
    });
}
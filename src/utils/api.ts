const serverAddress = 'http://localhost:3000';

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

export function createAccount(createAccountValues: ICreateAccount) {
  return fetch(`${serverAddress}/accounts`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ account: createAccountValues })
  })
}
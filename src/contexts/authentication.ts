import { createContext } from "react";

export interface IAuthContext {
  isLoggedIn: boolean;
  token: string | null;
  login(token: string): void;
  logout(): void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {}
});
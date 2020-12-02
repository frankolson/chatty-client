import { createContext } from "react";
import { IAccount } from "../utils/types";

export interface IAccountContext {
  account: IAccount | null;
  setAccount(): void;
}

export const AccountContext = createContext<IAccountContext>({
  account: null,
  setAccount: () => {}
});
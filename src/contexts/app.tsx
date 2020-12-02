import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import { AppReducer, appInitialState, IAppReducerState, IAppReducerAction } from "../reducers/app";
import { IAccount, IChannel } from "../utils/types";

export interface IAppProvider {
  children: ReactNode;
}

export function updateAccount(dispatch: Dispatch<IAppReducerAction>, account: IAccount) {
  dispatch({ type: 'UPDATE_ACCOUNT', payload: { account } })
}

export function updateChannels(dispatch: Dispatch<IAppReducerAction>, channels: IChannel[]) {
  dispatch({ type: 'UPDATE_CHANNELS', payload: { channels } })
}

export const AppStateContext = createContext<IAppReducerState>(appInitialState);
export const AppDispatchContext = createContext<Dispatch<IAppReducerAction>>({} as Dispatch<IAppReducerAction>);

export function AppProvider({ children }: IAppProvider) {
  const [appState, appDispatch] = useReducer(AppReducer, appInitialState);

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
};
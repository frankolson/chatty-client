import { IAccount, IChannel } from "../utils/types";

export interface IAppReducerState {
  account?: IAccount;
  channels: IChannel[];
}

export type AddAccountAction = {
  type: "UPDATE_ACCOUNT";
  payload: {
    account: IAccount;
  }
}

export type AddChannelsAction = {
  type: "UPDATE_CHANNELS";
  payload: {
    channels: IChannel[];
  }
}

export type IAppReducerAction =
  AddAccountAction |
  AddChannelsAction;

export const appInitialState: IAppReducerState = {
  account: undefined,
  channels: []
}

export function AppReducer(state: IAppReducerState, action: IAppReducerAction) {
  switch (action.type) {
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account
      };
    case "UPDATE_CHANNELS":
      return {
        ...state,
        channels: action.payload.channels
      };
  }
};
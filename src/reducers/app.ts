import { IAccount, IChannel } from "../utils/types";

export interface IAppReducerState {
  account?: IAccount;
  currentChannel?: IChannel;
  channels: IChannel[];
}

export type UpdateAccountAction = {
  type: "UPDATE_ACCOUNT";
  payload: {
    account: IAccount;
  }
}

export type UpdateCurrentChannelAction = {
  type: "UPDATE_CURRENT_CHANNEL";
  payload: {
    currentChannel: IChannel;
  }
}

export type UpdateChannelsAction = {
  type: "UPDATE_CHANNELS";
  payload: {
    channels: IChannel[];
  }
}

export type IAppReducerAction =
  UpdateAccountAction |
  UpdateCurrentChannelAction |
  UpdateChannelsAction;

export const appInitialState: IAppReducerState = {
  account: undefined,
  currentChannel: undefined,
  channels: []
}

export function AppReducer(state: IAppReducerState, action: IAppReducerAction) {
  switch (action.type) {
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account
      };
    case "UPDATE_CURRENT_CHANNEL":
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      };
    case "UPDATE_CHANNELS":
      return {
        ...state,
        channels: action.payload.channels
      };
  }
};
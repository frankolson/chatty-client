export interface IAccount {
  id: number;
  name: string;
  default_channel_id: number;
}

export interface IProfile {
  id: number;
  email: string;
  name: string;
  account_id: number;
}

export interface IChannel {
  id: number;
  name: string;
  account_id: number;
}
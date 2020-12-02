import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getAccount, getChannel, listChannels } from "../../utils/api";
import { IAccount, IChannel } from "../../utils/types";
import { AppStateContext, AppDispatchContext, updateAccount, updateCurrentChannel, updateChannels } from "../../contexts/app";
import { AuthDispatchContext } from "../../contexts/authentication";
import { ChannelHeader } from '../../components/ChannelHeader';
import { Messages } from '../../components/Messages';
import { NewMessageInput } from '../../components/NewMessageInput';
import { AppNavigation } from '../../components/AppNavigation';
// import styles from './App.module.scss';

export default function App(props: any) {
  const authDispatchContext = useContext(AuthDispatchContext);
  const appDispatchContext = useContext(AppDispatchContext);
  const { account, currentChannel } = useContext(AppStateContext);
  const history = useHistory();

  function loadAccountAndDefaultChannel() {
    return getAccount(props.match.params.account_id, authDispatchContext, history)
      .then((response: Response) => response.json())
      .then((data: IAccount) => {
        updateAccount(appDispatchContext, data);
        return data;
      })
      .then((data: IAccount) => {
        if (props.match.params.channel_id) {
          loadChannel(data.id, props.match.params.channel_id);
        } else {
          history.replace(`/accounts/${data.id}/channels/${data.default_channel_id}`);
        }
      })
  }

  function loadChannel(accountId: number, channelId: number) {
    return getChannel(accountId, channelId, authDispatchContext, history)
      .then((response: Response) => response.json())
      .then((data: IChannel) => updateCurrentChannel(appDispatchContext, data));
  }

  function loadChannels() {
    return listChannels(props.match.params.account_id, authDispatchContext, history)
      .then((response: Response) => response.json())
      .then((data: IChannel[]) => updateChannels(appDispatchContext, data));
  }

  useEffect(() => {
    loadAccountAndDefaultChannel();
    loadChannels();
  }, [])

  return (account && currentChannel) ? (
    <AppNavigation>
      <ChannelHeader/>
      <Messages/>
      <NewMessageInput/>
    </AppNavigation>
  ): null;
}

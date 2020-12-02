import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAccount, getChannel, listChannels } from "../../utils/api";
import { IAccount, IChannel } from "../../utils/types";
import { AuthDispatchContext } from "../../contexts/authentication";
import styles from './App.module.scss';
import { ChannelLink } from '../../components/ChannelLink';
import { ChannelHeader } from '../../components/ChannelHeader';
import { Messages } from '../../components/Messages';
import { NewMessageInput } from '../../components/NewMessageInput';

export default function App(props: any) {
  const authDispatchContext = useContext(AuthDispatchContext);
  const history = useHistory();
  const [account, setAccount] = useState<IAccount | null>(null);
  const [channel, setChannel] = useState<IChannel | null>(null);
  const [channels, setChannels] = useState<IChannel[]>([]);

  function loadAccountAndDefaultChannel() {
    return getAccount(props.match.params.account_id, authDispatchContext, history)
      .then((response: Response) => response.json())
      .then((data: IAccount) => {
        setAccount(data);
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
      .then((data: IChannel) => setChannel(data));
  }

  function loadChannels() {
    return listChannels(props.match.params.account_id, authDispatchContext, history)
      .then((response: Response) => response.json())
      .then((data: IChannel[]) => setChannels(data));
  }

  useEffect(() => {
    loadAccountAndDefaultChannel();
    loadChannels();
  }, [])

  return (account && channel) ? (
    <Container fluid className="h-100">
        <Row className="h-100">
          <Col className={`pt-3 ${styles.sidebar}`}>
            <h1>{account.name}</h1>

            <hr className={styles.divider}/>

            <h2>Channels</h2>
            {channels.map((channel: IChannel) => (
              <ChannelLink key={channel.id} channel={channel} />
            ))}
          </Col>

          <Col xs={10} className="d-flex flex-column px-0" as="main">
            <ChannelHeader channel={channel}/>
            <Messages channel={channel}/>
            <NewMessageInput channel={channel}/>
          </Col>
        </Row>
      </Container>
  ) : null;
}

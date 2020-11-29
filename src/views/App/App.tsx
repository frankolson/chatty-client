import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAccount, IAccount, IChannel, listChannels } from "../../utils/api";
import { AuthContext } from "../../contexts/authentication";
import styles from './App.module.scss';
import { ChannelLink } from '../../components/ChannelLink';

export default function App(props: any) {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [account, setAccount] = useState<IAccount | null>(null);
  const [channels, setChannels] = useState<IChannel[]>([]);

  function loadAccount() {
    return getAccount(props.match.params.id, authContext, history)
      .then((response: Response) => response.json())
      .then((data: IAccount) => {
        setAccount(data);
      });
  }

  function loadChannels() {
    // return listChannels(props.match.params.id, authContext, history)
    return listChannels(props.match.params.id, authContext, history)
      .then((response: Response) => response.json())
      .then((data: IChannel[]) => setChannels(data))
  }

  useEffect(() => {
    loadAccount();
    loadChannels();
  }, [])

  function renderApp() {
    return (
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className={`pt-3 ${styles.sidebar}`}>
            <h1>{account!.name}</h1>

            <hr className={styles.divider}/>

            <h2>Channels</h2>

            <div className="pl-3">
              {channels.map((channel: IChannel) => (
                <ChannelLink key={channel.id} channel={channel} />
              ))}
            </div>
          </Col>

          <Col xs={10} className="d-flex flex-column px-0" as="main">
            <div className={`px-3 ${styles.channelHeader}`}>Channel Header</div>
            <div className={`px-3 ${styles.messages}`}>Messages</div>
            <div className={`px-3 ${styles.newMessage}`}>New Message</div>
          </Col>
        </Row>
      </Container>
    );
  }

  return account ? renderApp() : null;
}

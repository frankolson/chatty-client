import React, { ReactNode, useContext } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import styles from './AppNavigation.module.scss';
import { ChannelLink } from '../../components/ChannelLink';
import { AppStateContext } from '../../contexts/app';

export interface IAppNavigation {
  children: ReactNode;
}

export default function AppNavigation({ children }: IAppNavigation) {
  const { account, channels} = useContext(AppStateContext);

  return account ? (
    <Container fluid className="h-100">
        <Row className="h-100">
          <Col className={`pt-3 ${styles.sidebar}`}>
            <h1>{account.name}</h1>

            <hr className={styles.divider}/>

            <h2>Channels</h2>
            {channels.map((channel) => (
              <ChannelLink key={channel.id} channel={channel} />
            ))}
          </Col>

          <Col xs={10} className="d-flex flex-column px-0" as="main">
            {children}
          </Col>
        </Row>
      </Container>
  ) : null;
}

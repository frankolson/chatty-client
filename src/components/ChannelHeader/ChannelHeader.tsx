import React, { useContext } from "react";
import { AppStateContext } from "../../contexts/app";
import styles from "./ChannelHeader.module.scss"

export default function ChannelHeader() {
  const { currentChannel } = useContext(AppStateContext);

  function renderLoading() {
    return (
      <div className={`d-flex align-items-center px-3 ${styles.channelHeader}`}>
        <div className="text-muted"><em>Loading...</em></div>
      </div>
    );
  }

  return currentChannel ? (
    <div className={`d-flex align-items-center px-3 ${styles.channelHeader}`}>
      <div># {currentChannel.name}</div>
    </div>
  ) : renderLoading();
}
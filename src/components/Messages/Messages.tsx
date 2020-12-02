import React, { useContext } from "react";
import { AppStateContext } from "../../contexts/app";
import styles from "./Messages.module.scss"

export default function Messages() {
  const { currentChannel } = useContext(AppStateContext);

  function renderLoading() {
    return (
      <div className={`px-3 ${styles.messages}`}>
        <div className="text-muted"><em>Loading...</em></div>
      </div>
    );
  }

  return currentChannel ? (
    <div className={`px-3 ${styles.messages}`}>
      <div>Messages</div>
    </div>
  ) : renderLoading();
}

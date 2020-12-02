import React, { useContext } from "react";
import { AppStateContext } from "../../contexts/app";
import styles from "./NewMessageInput.module.scss"

export default function NewMessageInput() {
  const { currentChannel } = useContext(AppStateContext);

  function renderLoading() {
    return (
      <div className={`px-3 ${styles.newMessage}`}>
        <div className="text-muted"><em>Loading...</em></div>
      </div>
    );
  }

  return currentChannel ? (
    <div className={`px-3 ${styles.newMessage}`}>
      <div>New Message Input</div>
    </div>
  ) : renderLoading();
}
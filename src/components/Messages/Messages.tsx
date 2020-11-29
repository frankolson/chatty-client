import React from "react";
import { IChannel } from "../../utils/types";
import styles from "./Messages.module.scss"

interface IMessages {
  channel: IChannel;
}

export default function Messages({ channel }: IMessages) {
  return (
    <div className={`px-3 ${styles.messages}`}>
      <div>Messages</div>
    </div>
  )
}
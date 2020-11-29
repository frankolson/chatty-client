import React from "react";
import { IChannel } from "../../utils/types";
import styles from "./NewMessageInput.module.scss"

interface INewMessageInput {
  channel: IChannel;
}

export default function NewMessageInput({ channel }: INewMessageInput) {
  return (
    <div className={`px-3 ${styles.newMessage}`}>
      <div>New Message Input</div>
    </div>
  )
}
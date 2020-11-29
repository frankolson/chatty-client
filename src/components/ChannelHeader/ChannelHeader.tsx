import React from "react";
import { IChannel } from "../../utils/types";
import styles from "./ChannelHeader.module.scss"

interface IChannelHeader {
  channel: IChannel;
}

export default function ChannelHeader({ channel }: IChannelHeader) {
  return (
    <div className={`d-flex align-items-center px-3 ${styles.channelHeader}`}>
      <div># {channel.name}</div>
    </div>
  )
}
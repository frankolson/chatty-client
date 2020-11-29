import React from "react";
import { Link } from "react-router-dom";
import { IChannel } from "../../utils/types";
import styles from "./ChannelLink.module.scss"

interface IChannelLink {
  channel: IChannel;
}

export default function ChannelLink({ channel }: IChannelLink) {
  return (
    <div className={`pl-3 ${styles.link}`}>
      <Link to={`/accounts/${channel.account_id}/channels/${channel.id}`}>
        # {channel.name}
      </Link>
    </div>
  )
}
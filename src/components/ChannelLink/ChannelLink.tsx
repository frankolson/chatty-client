import React from "react";
import { IChannel } from "../../utils/api";

interface IChannelLink {
  channel: IChannel;
}

export default function ChannelLink({ channel }: IChannelLink) {
  return (
    <p># {channel.name}</p>
  )
}
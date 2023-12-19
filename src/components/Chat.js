import React, { useContext } from "react";
import Cam from "../Image/cam.png";
import Add from "../Image/add.png";
import More from "../Image/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>

        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>

      <Messages />
      <Input />
    </div>
  );
}

export default Chat;

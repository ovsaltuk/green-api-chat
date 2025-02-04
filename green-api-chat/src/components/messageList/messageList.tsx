import React from "react";
import { IMessage } from "../../types";
import "./styles.scss"

type TMessageListProps = {
  messages: Pick<IMessage, "idMessage" | "textMessage" | "type">[];
};

const MessageList: React.FC<TMessageListProps> = ({ messages }) => {
  return (
    <ul className="message-list">
      {messages.map((msg) => (
        <li key={msg.idMessage} className={`message ${msg.type}`}>
          {msg.textMessage}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;

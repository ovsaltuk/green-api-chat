import React from "react";
import "./styles.scss";

type TChatInputProps = {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
};

const ChatInput: React.FC<TChatInputProps> = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="chat__input">
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default ChatInput;

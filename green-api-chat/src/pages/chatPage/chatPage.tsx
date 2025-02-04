import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../../components/messageList/messageList";
import { useChat } from "../../hooks/useChat";
import ChatInput from "../../components/chatInput/chatInput";
import "./styles.scss";


const ChatPage: React.FC = () => {
  const navigate = useNavigate();

  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  const chatId = localStorage.getItem("chatId");

  useEffect(() => {
    if (!idInstance || !apiTokenInstance || !chatId) {
      navigate("/");
    }
  }, [idInstance, apiTokenInstance, chatId, navigate]);

  const { chatMessages, message, setMessage, sendMessage } = useChat(
    idInstance || "", 
    apiTokenInstance || "", 
    chatId || ""
  );

  const handleLogout = () => {
    localStorage.setItem("idInstance", "");
    localStorage.setItem("apiTokenInstance", "");
    localStorage.setItem("chatId", "");
    navigate('/')
  }

  return (
    <div className="chat">
      <MessageList messages={chatMessages} />
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
      <button onClick={handleLogout} className="logout">logout</button>
    </div>
  );
};

export default ChatPage;

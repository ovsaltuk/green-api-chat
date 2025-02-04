import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./styles.scss";


const AuthPage: React.FC = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [chatId, setChatId] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
    localStorage.setItem("chatId", chatId);
    navigate("/chat");
  };

  return (
    <div className="auth">
      <h2>Вход в WhatsApp чат</h2>
      <input type="text" placeholder="idInstance" value={idInstance} onChange={(e) => setIdInstance(e.target.value)} />
      <input type="text" placeholder="apiTokenInstance" value={apiTokenInstance} onChange={(e) => setApiTokenInstance(e.target.value)} />
      <input type="text" placeholder="chatId" value={chatId} onChange={(e) => setChatId(e.target.value)} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default AuthPage;

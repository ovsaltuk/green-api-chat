import { useEffect, useState } from "react";
import {
  deleteNotificationAsync,
  getChatHistoryAsync,
  getMessageAsync,
  getNotificationAsync,
  sendMessageAsync,
} from "../api/greenApiService";
import { EMessageType, IMessage } from "../types";

type TChatMessage = Pick<IMessage, "idMessage" | "textMessage" | "type">;

export const useChat = (idInstance: string, apiTokenInstance: string, chatId: string) => {
  const [chatMessages, setChatMessages] = useState<TChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getChatHistoryAsync(idInstance, apiTokenInstance, chatId)
      .then((data) =>
        setChatMessages(
          data.map((item) => ({
            idMessage: item.idMessage,
            textMessage: item.textMessage,
            type: item.type,
          }))
        )
      )
      .catch((error) => console.error("Ошибка загрузки истории чата:", error));
  }, [idInstance, apiTokenInstance, chatId]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const response = await sendMessageAsync(idInstance, apiTokenInstance, chatId, message);
      setChatMessages((prev) => [{ idMessage: response.idMessage, textMessage: message, type: EMessageType.outgoing }, ...prev]);
      setMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const fetchNewMessages = async () => {
    try {
      const notification = await getNotificationAsync(idInstance, apiTokenInstance);
      if (!notification) return;

      const newMessage = await getMessageAsync(idInstance, apiTokenInstance, chatId, notification.body.idMessage);

      setChatMessages((prev) => {
        if (prev.some((msg) => msg.idMessage === newMessage.idMessage)) return prev;
        return [{ idMessage: newMessage.idMessage, textMessage: newMessage.textMessage, type: newMessage.type }, ...prev];
      });

      await deleteNotificationAsync(idInstance, apiTokenInstance, notification.receiptId);
    } catch (error) {
      console.error("Ошибка при получении уведомления:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchNewMessages, 5000);
    return () => clearInterval(interval);
  });

  return { chatMessages, message, setMessage, sendMessage };
};

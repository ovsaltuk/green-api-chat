import axios from "axios";
import { IMessage } from "../types";


const BASE_URL = 'https://api.green-api.com';



export const sendMessageAsync = async (idInstance: string, apiTokenInstance: string, chatId: string, message: string) => {
  const response = await axios.post(`${BASE_URL}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
    chatId: `${chatId}@c.us`,
    message,
  });
  return response.data;
};

export const getNotificationAsync = async (idInstance: string, apiTokenInstance: string) => {
  const response = await axios.get(`${BASE_URL}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`);
  return response.data;
};

export const deleteNotificationAsync = async (idInstance: string, apiTokenInstance: string, receiptId: number) => {
  const response = await axios.delete(
    `${BASE_URL}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
  );
  return response.data;
};

export const getChatHistoryAsync = async (idInstance: string, apiTokenInstance: string, chatId: string): Promise<IMessage[]> => {
  const response = await axios.post(`${BASE_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`, {
    chatId: `${chatId}@c.us`,
  })
  return response.data
};

export const getMessageAsync = async (idInstance: string, apiTokenInstance: string, chatId: string, idMessage: string): Promise<IMessage> => {
  const response = await axios.post(`${BASE_URL}/waInstance${idInstance}/getMessage/${apiTokenInstance}`, {
    chatId: `${chatId}@c.us`,
    idMessage,
  });
  return response.data;
}



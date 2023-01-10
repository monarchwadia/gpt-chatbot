export type ChatMessage = {
  id: string;
  content: string;
  sender: "user" | "bot";
  createdAt: Date;
}

const messages: ChatMessage[] = [
  {
    id: '1',
    content: "Hi. I'm Chatbot, a bot that can help you with your questions. How can I help you today?",
    sender: "bot",
    createdAt: new Date()
  }
];

export const sendMessage = async (message:string): Promise<ChatMessage[]> => {
  messages.push({
    id: '' + messages.length + 1,
    content: message,
    sender: "user",
    createdAt: new Date()
  });

  return Promise.resolve(messages);
}

export const getMessages = async (): Promise<ChatMessage[]> => {
  return Promise.resolve(messages);
}
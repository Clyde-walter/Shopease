
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'support';
  timestamp: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: string, sender: 'user' | 'support') => void;
  unreadCount: number;
  markAllAsRead: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastReadTimestamp, setLastReadTimestamp] = useState<string>('');

  useEffect(() => {
    // Load existing messages from localStorage
    const existingMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const lastRead = localStorage.getItem('lastReadTimestamp') || '';
    setMessages(existingMessages);
    setLastReadTimestamp(lastRead);
  }, []);

  const addMessage = (message: string, sender: 'user' | 'support') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      sender,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    // Auto-response from support for user messages
    if (sender === 'user') {
      setTimeout(() => {
        const autoResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: "Thank you for your message! Our support team will get back to you shortly.",
          sender: 'support',
          timestamp: new Date().toISOString()
        };
        
        const finalMessages = [...updatedMessages, autoResponse];
        setMessages(finalMessages);
        localStorage.setItem('chatMessages', JSON.stringify(finalMessages));
      }, 1000);
    }
  };

  const markAllAsRead = () => {
    const now = new Date().toISOString();
    setLastReadTimestamp(now);
    localStorage.setItem('lastReadTimestamp', now);
  };

  const unreadCount = messages.filter(msg => 
    msg.sender === 'support' && msg.timestamp > lastReadTimestamp
  ).length;

  return (
    <ChatContext.Provider value={{
      messages,
      addMessage,
      unreadCount,
      markAllAsRead
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

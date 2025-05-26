
import React, { useState, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'support';
  timestamp: string;
}

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load existing messages from localStorage
    const existingMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    setMessages(existingMessages);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setNewMessage('');

    // Simulate auto-response from support
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
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Customer Support Chat</h1>
            <p className="text-gray-600">Get help from our support team</p>
          </div>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Support Team - Online
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
                <p className="text-gray-500">Send a message to get help from our support team.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

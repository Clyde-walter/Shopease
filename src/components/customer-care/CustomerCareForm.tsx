
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface CustomerMessage {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  responses?: Array<{
    id: string;
    message: string;
    sender: 'customer' | 'admin';
    timestamp: string;
  }>;
}

interface CustomerCareFormProps {
  onSubmitSuccess: () => void;
}

export function CustomerCareForm({ onSubmitSuccess }: CustomerCareFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerEmail || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newMessage: CustomerMessage = {
      id: Date.now().toString(),
      customerName,
      customerEmail,
      subject,
      message,
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      responses: []
    };

    // Store the message in localStorage (will be synced with admin panel)
    const existingMessages = JSON.parse(localStorage.getItem('customerMessages') || '[]');
    existingMessages.push(newMessage);
    localStorage.setItem('customerMessages', JSON.stringify(existingMessages));

    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours."
    });

    // Reset form
    setCustomerName('');
    setCustomerEmail('');
    setSubject('');
    setMessage('');
    setPriority('medium');
    onSubmitSuccess();
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value as 'low' | 'medium' | 'high');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Name</label>
        <Input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Your full name"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Email</label>
        <Input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Subject</label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Order delivery issue">Order delivery issue</SelectItem>
            <SelectItem value="Product return request">Product return request</SelectItem>
            <SelectItem value="Product inquiry">Product inquiry</SelectItem>
            <SelectItem value="Payment issue">Payment issue</SelectItem>
            <SelectItem value="Technical support">Technical support</SelectItem>
            <SelectItem value="General inquiry">General inquiry</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Priority</label>
        <Select value={priority} onValueChange={handlePriorityChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Message</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe your issue or question..."
          rows={4}
          required
        />
      </div>
      
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </Button>
    </form>
  );
}

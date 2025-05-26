import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Search, Filter, Eye, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  lastResponse?: string;
  aiSuggestion?: string;
  responses: { id: string, message: string, sender: string, timestamp: string }[];
}

export function AdminSupport() {
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [responseText, setResponseText] = useState('');

  // Load messages from localStorage on component mount
  useEffect(() => {
    const loadMessages = () => {
      const storedMessages = JSON.parse(localStorage.getItem('customerMessages') || '[]');
      const defaultMessages = [
        {
          id: '1',
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          subject: 'Order delivery issue',
          message: 'My order #ORD-123456 has not arrived yet. It has been 5 days since the expected delivery date.',
          priority: 'high' as const,
          status: 'open' as const,
          createdAt: '2024-01-15T10:30:00Z',
          aiSuggestion: 'Suggest checking tracking information and offer expedited replacement if package is lost.',
          responses: []
        },
        {
          id: '2',
          customerName: 'Jane Smith',
          customerEmail: 'jane@example.com',
          subject: 'Product return request',
          message: 'I would like to return the wireless headphones I purchased last week. They are not working properly.',
          priority: 'medium' as const,
          status: 'in-progress' as const,
          createdAt: '2024-01-14T14:20:00Z',
          lastResponse: 'Return label has been sent to your email.',
          aiSuggestion: 'Offer troubleshooting steps first, then process return if issue persists.',
          responses: [
            {
              id: 'resp1',
              message: 'Return label has been sent to your email.',
              sender: 'admin' as const,
              timestamp: '2024-01-14T15:30:00Z'
            }
          ]
        }
      ];
      
      const allMessages = [...defaultMessages, ...storedMessages];
      setMessages(allMessages);
    };

    loadMessages();

    // Listen for storage changes to sync across tabs
    const handleStorageChange = () => {
      loadMessages();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStatusUpdate = (messageId: string, newStatus: CustomerMessage['status']) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status: newStatus } : msg
    );
    setMessages(updatedMessages);
    
    // Update localStorage
    const customerMessages = updatedMessages.filter(msg => !['1', '2'].includes(msg.id));
    localStorage.setItem('customerMessages', JSON.stringify(customerMessages));
    
    const order = messages.find(o => o.id === messageId);
    toast({
      title: "Status updated!",
      description: `Message from ${order?.customerName || messageId} status changed to ${newStatus}`
    });
  };

  const handleSendResponse = () => {
    if (!selectedMessage || !responseText.trim()) return;

    const newResponse = {
      id: Date.now().toString(),
      message: responseText,
      sender: 'admin' as const,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = messages.map(msg => 
      msg.id === selectedMessage.id 
        ? { 
            ...msg, 
            lastResponse: responseText, 
            status: 'in-progress' as const,
            responses: [...(msg.responses || []), newResponse]
          }
        : msg
    );
    
    setMessages(updatedMessages);

    // Update localStorage for customer messages
    const customerMessages = updatedMessages.filter(msg => !['1', '2'].includes(msg.id));
    localStorage.setItem('customerMessages', JSON.stringify(customerMessages));

    toast({
      title: "Response sent!",
      description: "Your response has been sent to the customer"
    });

    setResponseText('');
    setSelectedMessage(null);
  };

  const generateAIResponse = (message: CustomerMessage) => {
    const aiResponses = {
      'Order delivery issue': 'Thank you for contacting us. I understand your concern about the delayed delivery. Let me check the tracking information for your order and provide you with an update. We may also offer expedited shipping for a replacement if needed.',
      'Product return request': 'I apologize for the inconvenience with your wireless headphones. Before processing a return, let me help you with some troubleshooting steps that might resolve the issue. If the problem persists, I will be happy to process your return request.',
      'default': 'Thank you for reaching out to us. I have received your message and will review your case carefully. I will get back to you within 24 hours with a detailed response.'
    };

    const response = aiResponses[message.subject] || aiResponses['default'];
    setResponseText(response);
  };

  const stats = {
    total: messages.length,
    open: messages.filter(m => m.status === 'open').length,
    inProgress: messages.filter(m => m.status === 'in-progress').length,
    resolved: messages.filter(m => m.status === 'resolved').length
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Customer Support</h1>
        <p className="text-gray-600">Manage customer inquiries with AI-powered assistance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <Check className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Customer Messages ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{message.customerName}</div>
                      <div className="text-sm text-gray-500">{message.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium">{message.subject}</div>
                      <div className="text-sm text-gray-500 truncate">{message.message}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-white ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-white ${getStatusColor(message.status)}`}>
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Customer Message Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Customer</label>
                                <p>{message.customerName}</p>
                                <p className="text-sm text-gray-500">{message.customerEmail}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Date</label>
                                <p>{new Date(message.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Subject</label>
                              <p>{message.subject}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Message</label>
                              <p className="bg-gray-50 p-3 rounded">{message.message}</p>
                            </div>
                            {message.aiSuggestion && (
                              <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                  <Bot className="w-4 h-4" />
                                  AI Suggestion
                                </label>
                                <p className="bg-blue-50 p-3 rounded text-blue-800">{message.aiSuggestion}</p>
                              </div>
                            )}
                            <div>
                              <label className="text-sm font-medium">Your Response</label>
                              <Textarea
                                value={responseText}
                                onChange={(e) => setResponseText(e.target.value)}
                                placeholder="Type your response..."
                                rows={4}
                              />
                              <div className="flex gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => generateAIResponse(message)}
                                >
                                  <Bot className="w-4 h-4 mr-2" />
                                  Generate AI Response
                                </Button>
                                <Button
                                  onClick={handleSendResponse}
                                  disabled={!responseText.trim()}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Response
                                </Button>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Select
                                value={message.status}
                                onValueChange={(value) => handleStatusUpdate(message.id, value as CustomerMessage['status'])}
                              >
                                <SelectTrigger className="w-48">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Select
                        value={message.status}
                        onValueChange={(value) => handleStatusUpdate(message.id, value as CustomerMessage['status'])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


import React, { useState } from 'react';
import { Send, Users, Mail, FileText, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'newsletter' | 'order' | 'promotion' | 'support';
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Newsletter',
    subject: 'Welcome to ShopEase - Your Premium Shopping Experience',
    content: `
      <h2>Welcome to ShopEase!</h2>
      <p>Dear Valued Customer,</p>
      <p>Thank you for joining our community of fashion enthusiasts. We're excited to have you on board!</p>
      <p>Explore our latest collections and enjoy exclusive member benefits.</p>
      <p>Happy Shopping!</p>
      <p>The ShopEase Team</p>
    `,
    type: 'newsletter'
  },
  {
    id: '2',
    name: 'Order Issue Notification',
    subject: 'Important Update Regarding Your Order',
    content: `
      <h2>Order Update Required</h2>
      <p>Dear Customer,</p>
      <p>We need to inform you about an issue with your recent order. Our team is working to resolve this quickly.</p>
      <p>Order Details: [ORDER_NUMBER]</p>
      <p>Issue: [ISSUE_DESCRIPTION]</p>
      <p>Expected Resolution: [RESOLUTION_DATE]</p>
      <p>We apologize for any inconvenience and appreciate your patience.</p>
      <p>Best regards,<br>ShopEase Support Team</p>
    `,
    type: 'order'
  }
];

export function AdminEmails() {
  const [emailData, setEmailData] = useState({
    recipient: 'all',
    customRecipient: '',
    subject: '',
    content: '',
    template: ''
  });
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setEmailData({
        ...emailData,
        subject: template.subject,
        content: template.content,
        template: templateId
      });
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.subject || !emailData.content) {
      toast({
        title: "Missing Information",
        description: "Please provide both subject and content for the email.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate email sending (in real implementation, this would call your email service)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Email Sent Successfully!",
        description: `Email sent to ${emailData.recipient === 'all' ? 'all users' : emailData.customRecipient}`,
      });
      
      // Reset form
      setEmailData({
        recipient: 'all',
        customRecipient: '',
        subject: '',
        content: '',
        template: ''
      });
      
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "Failed to send email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Email Management</h1>
        <p className="text-gray-600">Create and send custom email messages to your users</p>
      </div>

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="history">Email History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Compose Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Compose Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Recipients</Label>
                  <Select value={emailData.recipient} onValueChange={(value) => setEmailData({...emailData, recipient: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="customers">All Customers</SelectItem>
                      <SelectItem value="subscribers">Newsletter Subscribers</SelectItem>
                      <SelectItem value="custom">Custom Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {emailData.recipient === 'custom' && (
                  <div>
                    <Label htmlFor="customRecipient">Email Address</Label>
                    <Input
                      id="customRecipient"
                      type="email"
                      placeholder="user@example.com"
                      value={emailData.customRecipient}
                      onChange={(e) => setEmailData({...emailData, customRecipient: e.target.value})}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="template">Use Template (Optional)</Label>
                  <Select value={emailData.template} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Email subject line"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Email Content (HTML)</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your email content here... You can use HTML tags for formatting."
                    className="min-h-[300px] font-mono text-sm"
                    value={emailData.content}
                    onChange={(e) => setEmailData({...emailData, content: e.target.value})}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setPreviewMode(!previewMode)} variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    {previewMode ? 'Edit' : 'Preview'}
                  </Button>
                  <Button onClick={handleSendEmail} disabled={isLoading} className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? 'Sending...' : 'Send Email'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Email Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white min-h-[400px]">
                  <div className="mb-4 pb-4 border-b">
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>From:</strong> noreply@shopease.com
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>To:</strong> {emailData.recipient === 'custom' ? emailData.customRecipient : emailData.recipient}
                    </div>
                    <div className="text-lg font-semibold">
                      <strong>Subject:</strong> {emailData.subject || 'Email Subject'}
                    </div>
                  </div>
                  
                  {previewMode ? (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: emailData.content || '<p>Email content will appear here...</p>' }}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700 overflow-auto">
                      {emailData.content || 'Email content will appear here...'}
                    </pre>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Email Templates
                </span>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {template.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.subject}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Email History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No emails sent yet. Your email history will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

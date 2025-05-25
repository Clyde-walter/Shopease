
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Gem, 
  Palette, 
  Clock, 
  DollarSign, 
  Phone, 
  Mail, 
  MessageSquare,
  ArrowRight,
  Star,
  Award,
  Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const designServices = [
  {
    id: 1,
    title: 'Engagement Rings',
    description: 'Create the perfect symbol of your love with our custom engagement ring design service.',
    price: 'Starting from $2,500',
    duration: '4-6 weeks',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Wedding Bands',
    description: 'Design matching wedding bands that perfectly complement your engagement ring.',
    price: 'Starting from $800',
    duration: '3-4 weeks',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Necklaces & Pendants',
    description: 'Craft a unique necklace or pendant that tells your personal story.',
    price: 'Starting from $1,200',
    duration: '3-5 weeks',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Earrings',
    description: 'Design elegant earrings that perfectly frame your face and express your style.',
    price: 'Starting from $600',
    duration: '2-3 weeks',
    image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=300&fit=crop'
  }
];

export function CustomDesign() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    description: '',
    inspiration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.description) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Design request submitted!",
      description: "Our team will contact you within 24 hours to discuss your custom design."
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      budget: '',
      timeline: '',
      description: '',
      inspiration: ''
    });
    setSelectedService(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Custom Jewelry Design
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bring your vision to life with our bespoke jewelry design service. 
            Our master craftsmen will work with you to create a one-of-a-kind piece 
            that perfectly captures your style and story.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-ecommerce-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-ecommerce-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Craftsmanship</h3>
            <p className="text-gray-600">Over 30 years of experience in fine jewelry making</p>
          </div>
          <div className="text-center">
            <div className="bg-ecommerce-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gem className="w-8 h-8 text-ecommerce-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
            <p className="text-gray-600">Only the finest diamonds, gold, and precious stones</p>
          </div>
          <div className="text-center">
            <div className="bg-ecommerce-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-ecommerce-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personal Service</h3>
            <p className="text-gray-600">Dedicated designer assigned to your project</p>
          </div>
        </div>

        {/* Design Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Design Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designServices.map((service) => (
              <Card 
                key={service.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedService === service.id ? 'ring-2 ring-ecommerce-600' : ''
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {selectedService === service.id && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-ecommerce-600">Selected</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-1 text-ecommerce-600" />
                      <span>{service.price}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1 text-ecommerce-600" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Start Your Custom Design</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="over-10000">Over $10,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timeline</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                >
                  <option value="">Select timeline</option>
                  <option value="rush">Rush (2-3 weeks)</option>
                  <option value="standard">Standard (4-6 weeks)</option>
                  <option value="extended">Extended (8+ weeks)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Design Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Please describe your vision, including preferred materials, style, size, and any specific requirements..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Inspiration & References</label>
                <Textarea
                  value={formData.inspiration}
                  onChange={(e) => handleInputChange('inspiration', e.target.value)}
                  placeholder="Share any inspiration sources, reference images, or existing pieces you'd like to incorporate..."
                  rows={3}
                />
              </div>

              {selectedService && (
                <div className="bg-ecommerce-50 p-4 rounded-lg">
                  <p className="text-sm text-ecommerce-700">
                    <strong>Selected Service:</strong> {designServices.find(s => s.id === selectedService)?.title}
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-ecommerce-600 hover:bg-ecommerce-700 py-3 text-lg"
              >
                Submit Design Request
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Prefer to Talk Directly?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-ecommerce-600 mb-4" />
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p className="text-gray-600">(555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-ecommerce-600 mb-4" />
              <h4 className="font-semibold mb-2">Email Us</h4>
              <p className="text-gray-600">design@jewelry.com</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquare className="w-8 h-8 text-ecommerce-600 mb-4" />
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <Button variant="outline" className="mt-2">
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Permission is granted to temporarily download one copy of the materials on ShopEase's website for personal, 
                non-commercial transitory viewing only.
              </p>
              <p className="text-gray-600">Under this license you may not:</p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• Modify or copy the materials</li>
                <li>• Use the materials for any commercial purpose or for any public display</li>
                <li>• Attempt to reverse engineer any software contained on the website</li>
                <li>• Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, 
                pricing, or other content is accurate, complete, reliable, current, or error-free. Colors may vary due to monitor settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing and Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time. 
                Payment must be received before shipment of products.
              </p>
              <p className="text-gray-600">
                We accept major credit cards, PayPal, and other payment methods as indicated during checkout. 
                By providing payment information, you represent that you are authorized to use the payment method.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We will make every effort to ship your order promptly. Delivery times are estimates and not guaranteed. 
                We are not responsible for delays caused by shipping carriers or circumstances beyond our control.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Items may be returned within 30 days of delivery in original condition. Custom items are final sale unless defective. 
                Refunds will be processed within 3-5 business days after we receive your return.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                In no event shall ShopEase or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on ShopEase's website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These terms and conditions are governed by and construed in accordance with the laws of New York 
                and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 space-y-1 text-gray-600">
                <p>Email: legal@shopease.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Jewelry Street, New York, NY 10001</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

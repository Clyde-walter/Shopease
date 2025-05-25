
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <p className="text-gray-600">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us. This may include your name, email address, phone number, 
                  billing and shipping addresses, and payment information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
                <p className="text-gray-600">
                  We automatically collect certain information about your device and how you interact with our website, 
                  including your IP address, browser type, pages visited, and the time and date of your visit.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Process and fulfill your orders</li>
                <li>• Communicate with you about your purchases</li>
                <li>• Provide customer support</li>
                <li>• Send you marketing communications (with your consent)</li>
                <li>• Improve our website and services</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Service providers who assist us in operating our business</li>
                <li>• Payment processors to handle transactions</li>
                <li>• Shipping companies to deliver your orders</li>
                <li>• When required by law or to protect our rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Access your personal information</li>
                <li>• Correct inaccurate information</li>
                <li>• Request deletion of your information</li>
                <li>• Opt out of marketing communications</li>
                <li>• Request a copy of your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, 
                and understand where our visitors are coming from. You can control cookies through your browser settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 space-y-1 text-gray-600">
                <p>Email: privacy@shopease.com</p>
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

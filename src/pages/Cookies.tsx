
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Cookies() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                They help websites remember information about your visit, which can make your next visit easier and the site more useful to you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                <p className="text-gray-600">
                  These cookies are necessary for the website to function properly. They enable core functionality 
                  such as security, network management, and accessibility.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Performance Cookies</h3>
                <p className="text-gray-600">
                  These cookies help us understand how visitors interact with our website by collecting and 
                  reporting information anonymously.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Functional Cookies</h3>
                <p className="text-gray-600">
                  These cookies enable the website to provide enhanced functionality and personalization, 
                  such as remembering your preferences.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                <p className="text-gray-600">
                  These cookies are used to track visitors across websites to display relevant advertisements 
                  and measure the effectiveness of marketing campaigns.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We may use third-party services that set cookies on your device. These include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Google Analytics - for website analytics</li>
                <li>• Payment processors - for secure transactions</li>
                <li>• Social media platforms - for social sharing features</li>
                <li>• Advertising networks - for targeted advertising</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Your Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li>• View what cookies are stored on your device</li>
                <li>• Delete cookies</li>
                <li>• Block cookies from specific sites</li>
                <li>• Block all cookies</li>
                <li>• Delete all cookies when you close your browser</li>
              </ul>
              <p className="text-gray-600">
                Please note that if you disable cookies, some features of our website may not function properly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browser Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Here's how to manage cookies in popular browsers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Chrome</h4>
                  <p className="text-sm text-gray-600">Settings → Privacy and Security → Cookies</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Firefox</h4>
                  <p className="text-sm text-gray-600">Options → Privacy & Security</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Safari</h4>
                  <p className="text-sm text-gray-600">Preferences → Privacy</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Edge</h4>
                  <p className="text-sm text-gray-600">Settings → Cookies and Site Permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Consent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                By continuing to use our website, you consent to our use of cookies as described in this policy. 
                You can withdraw your consent at any time by managing your browser settings.
              </p>
              <Button className="bg-ecommerce-600 hover:bg-ecommerce-700">
                Manage Cookie Preferences
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about our use of cookies, please contact us at:
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

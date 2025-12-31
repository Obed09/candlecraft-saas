'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            Legal Document
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: December 25, 2025
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <CardTitle className="text-2xl">Privacy Policy Agreement</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-250px)] p-6">
              <div className="space-y-8 text-gray-700 dark:text-gray-300">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">Introduction</h2>
                <p className="mb-4">
                  Welcome to our Candle Making Platform <strong>"CandlePilots"</strong> ("we," "us," "our," or "Platform"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By using our Platform, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Table of Contents */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">Table of Contents</h2>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Information We Collect</li>
                  <li>How We Use Your Information</li>
                  <li>How We Share Your Information</li>
                  <li>Cookies and Tracking Technologies</li>
                  <li>Data Security</li>
                  <li>Data Retention</li>
                  <li>Your Privacy Rights</li>
                  <li>Children's Privacy</li>
                  <li>International Data Transfers</li>
                  <li>Third-Party Links and Services</li>
                  <li>Changes to This Privacy Policy</li>
                  <li>Contact Us</li>
                </ol>
              </section>

              {/* 1. Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">1. Information We Collect</h2>
                <p className="mb-4">We collect information that you provide directly, information collected automatically, and information from third-party sources.</p>
                
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">1.1 Information You Provide Directly</h3>
                
                <h4 className="font-semibold mb-2">Account Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Username and password</li>
                  <li>Phone number (optional)</li>
                  <li>Billing address</li>
                  <li>Shipping address</li>
                  <li>Business information (if applicable)</li>
                </ul>

                <h4 className="font-semibold mb-2">Profile Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Profile photo</li>
                  <li>Bio and description</li>
                  <li>Social media links</li>
                  <li>Candle making experience level</li>
                  <li>Business details (if selling candles)</li>
                </ul>

                <h4 className="font-semibold mb-2">Transaction Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Payment card information (processed securely by third-party providers)</li>
                  <li>Billing address</li>
                  <li>Shipping address</li>
                  <li>Purchase history</li>
                  <li>Order details</li>
                </ul>

                <h4 className="font-semibold mb-2">Communication Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Messages sent through the Platform</li>
                  <li>Customer support inquiries</li>
                  <li>Feedback and survey responses</li>
                  <li>Reviews and ratings</li>
                  <li>Forum posts and comments</li>
                </ul>

                <h4 className="font-semibold mb-2">User-Generated Content:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Recipes and formulations</li>
                  <li>Photos and videos</li>
                  <li>Tutorials and guides</li>
                  <li>Comments and discussions</li>
                  <li>Product reviews</li>
                </ul>

                <h4 className="font-semibold mb-2">Optional Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Marketing preferences</li>
                  <li>Newsletter subscriptions</li>
                  <li>Interest categories</li>
                  <li>Demographic information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Information Collected Automatically</h3>
                
                <h4 className="font-semibold mb-2">Device Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Device type (mobile, tablet, desktop)</li>
                  <li>Screen resolution</li>
                  <li>Device identifiers (UDID, advertising ID)</li>
                </ul>

                <h4 className="font-semibold mb-2">Usage Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                  <li>Click patterns</li>
                  <li>Search queries</li>
                  <li>Features used</li>
                  <li>Content viewed</li>
                  <li>Referral source</li>
                  <li>Date and time of access</li>
                </ul>

                <h4 className="font-semibold mb-2">Location Information:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>General geographic location (city, state, country) based on IP address</li>
                  <li>Precise location (only if you grant permission)</li>
                </ul>

                <h4 className="font-semibold mb-2">Performance Data:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Error logs</li>
                  <li>Crash reports</li>
                  <li>Performance metrics</li>
                  <li>Loading times</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Information from Third Parties</h3>
                
                <h4 className="font-semibold mb-2">Social Media:</h4>
                <p className="pl-4 mb-2">If you connect social media accounts, we may receive:</p>
                <ul className="list-disc list-inside pl-8 mb-4 space-y-1">
                  <li>Profile information</li>
                  <li>Friends list</li>
                  <li>Email address</li>
                  <li>Profile picture</li>
                </ul>

                <h4 className="font-semibold mb-2">Payment Processors:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Transaction completion status</li>
                  <li>Payment verification</li>
                  <li>Fraud detection data</li>
                </ul>

                <h4 className="font-semibold mb-2">Analytics Providers:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Demographic information</li>
                  <li>Interest categories</li>
                  <li>Browsing behavior on other sites</li>
                </ul>

                <h4 className="font-semibold mb-2">Marketing Partners:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Advertising campaign performance</li>
                  <li>Conversion data</li>
                  <li>Referral information</li>
                </ul>

                <h4 className="font-semibold mb-2">Business Partners:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Information from suppliers or manufacturers</li>
                  <li>Shipping and fulfillment data</li>
                  <li>Inventory information</li>
                </ul>
              </section>

              {/* 2. How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use your information for the following purposes:</p>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">2.1 Provide and Improve Services</h3>
                
                <h4 className="font-semibold mb-2">Account Management:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Create and manage your account</li>
                  <li>Authenticate your identity</li>
                  <li>Maintain account security</li>
                  <li>Process account updates</li>
                </ul>

                <h4 className="font-semibold mb-2">Platform Functionality:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Enable access to features and content</li>
                  <li>Provide personalized experiences</li>
                  <li>Display relevant content and recommendations</li>
                  <li>Calculate formulations and measurements</li>
                  <li>Store your recipes and projects</li>
                </ul>

                <h4 className="font-semibold mb-2">Customer Support:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Respond to inquiries and requests</li>
                  <li>Troubleshoot technical issues</li>
                  <li>Provide assistance with orders</li>
                  <li>Address complaints and concerns</li>
                </ul>

                <h4 className="font-semibold mb-2">Platform Improvement:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Analyze usage patterns</li>
                  <li>Identify bugs and technical issues</li>
                  <li>Develop new features</li>
                  <li>Enhance user experience</li>
                  <li>Conduct research and testing</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Process Transactions</h3>
                
                <h4 className="font-semibold mb-2">Order Processing:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Process and fulfill orders</li>
                  <li>Arrange shipping and delivery</li>
                  <li>Send order confirmations and updates</li>
                  <li>Handle returns and refunds</li>
                  <li>Maintain transaction records</li>
                </ul>

                <h4 className="font-semibold mb-2">Payment Processing:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Verify payment information</li>
                  <li>Prevent fraud</li>
                  <li>Process refunds</li>
                  <li>Maintain billing records</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Communication</h3>
                
                <h4 className="font-semibold mb-2">Transactional Communications:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Order confirmations and shipping updates</li>
                  <li>Account notifications</li>
                  <li>Security alerts</li>
                  <li>Policy updates</li>
                  <li>Service announcements</li>
                </ul>

                <h4 className="font-semibold mb-2">Marketing Communications (with your consent):</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Newsletters and product updates</li>
                  <li>Promotional offers and discounts</li>
                  <li>Educational content and tutorials</li>
                  <li>Event invitations</li>
                  <li>New feature announcements</li>
                </ul>
                <p className="pl-4 mb-4 italic">You can opt out of marketing communications at any time.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Safety and Security</h3>
                
                <h4 className="font-semibold mb-2">Platform Security:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Detect and prevent fraud</li>
                  <li>Identify suspicious activity</li>
                  <li>Enforce Terms & Conditions</li>
                  <li>Protect against unauthorized access</li>
                  <li>Maintain platform integrity</li>
                </ul>

                <h4 className="font-semibold mb-2">Legal Compliance:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Comply with legal obligations</li>
                  <li>Respond to legal requests</li>
                  <li>Protect our legal rights</li>
                  <li>Prevent illegal activity</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.5 Analytics and Research</h3>
                
                <h4 className="font-semibold mb-2">Data Analysis:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Understand user behavior</li>
                  <li>Track platform performance</li>
                  <li>Measure feature effectiveness</li>
                  <li>Identify trends and patterns</li>
                  <li>Segment user groups</li>
                </ul>

                <h4 className="font-semibold mb-2">Market Research:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Conduct surveys</li>
                  <li>Gather feedback</li>
                  <li>Test new features</li>
                  <li>Improve products and services</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.6 Advertising and Marketing</h3>
                
                <h4 className="font-semibold mb-2">Targeted Advertising:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Display relevant ads</li>
                  <li>Retarget website visitors</li>
                  <li>Measure ad performance</li>
                  <li>Optimize marketing campaigns</li>
                </ul>

                <h4 className="font-semibold mb-2">Personalization:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Recommend products</li>
                  <li>Suggest relevant content</li>
                  <li>Customize user experience</li>
                  <li>Provide relevant search results</li>
                </ul>
              </section>

              {/* 3. How We Share Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">3. How We Share Your Information</h2>
                <p className="mb-4 font-semibold">We do not sell your personal information. We share information only in the following circumstances:</p>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">3.1 Service Providers</h3>
                <p className="mb-3">We share information with third-party service providers who perform services on our behalf:</p>
                
                <h4 className="font-semibold mb-2">Categories of Service Providers:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Payment Processors:</strong> Stripe, PayPal, Square (process transactions)</li>
                  <li><strong>Hosting Providers:</strong> AWS, Google Cloud (store data)</li>
                  <li><strong>Email Services:</strong> Mailchimp, SendGrid (send communications)</li>
                  <li><strong>Analytics:</strong> Google Analytics, Mixpanel (analyze usage)</li>
                  <li><strong>Customer Support:</strong> Zendesk, Intercom (support tickets)</li>
                  <li><strong>Shipping:</strong> FedEx, UPS, USPS (fulfill orders)</li>
                  <li><strong>Marketing:</strong> Facebook, Google Ads (advertising)</li>
                  <li><strong>Security:</strong> Cloudflare, reCAPTCHA (protect platform)</li>
                </ul>

                <h4 className="font-semibold mb-2">Service Provider Requirements:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Process data only as instructed</li>
                  <li>Implement appropriate security measures</li>
                  <li>Use data only for specified purposes</li>
                  <li>Comply with privacy laws</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Business Transfers</h3>
                <p className="mb-3">In the event of a merger, acquisition, sale, or bankruptcy:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Your information may be transferred to the acquiring entity</li>
                  <li>We will notify you before transfer</li>
                  <li>The acquiring entity must honor this Privacy Policy</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Legal Requirements</h3>
                <p className="mb-3">We may disclose information when required to:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Comply with law, regulation, or legal process</li>
                  <li>Respond to government requests or court orders</li>
                  <li>Enforce our Terms & Conditions</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Protect the rights, property, or safety of others</li>
                  <li>Detect, prevent, or address fraud or security issues</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.4 With Your Consent</h3>
                <p className="mb-3">We may share information with third parties when you:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Explicitly consent to sharing</li>
                  <li>Connect third-party services (social media)</li>
                  <li>Participate in promotions or partnerships</li>
                  <li>Request specific integrations</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.5 Public Information</h3>
                <p className="mb-3">Information you share publicly is accessible to others:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Public Profile Information:</strong> Visible to all users</li>
                  <li><strong>Forum Posts and Comments:</strong> Publicly viewable</li>
                  <li><strong>Product Reviews:</strong> Displayed on product pages</li>
                  <li><strong>Shared Recipes:</strong> Accessible to community (if set to public)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.6 Aggregate and De-Identified Data</h3>
                <p className="mb-3">We may share aggregate or de-identified data that cannot identify you individually:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Statistical reports</li>
                  <li>Market research</li>
                  <li>Industry analysis</li>
                  <li>Platform metrics</li>
                </ul>
              </section>

              {/* 4. Cookies and Tracking Technologies */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">4. Cookies and Tracking Technologies</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">4.1 What Are Cookies?</h3>
                <p className="mb-4">Cookies are small text files stored on your device that help websites remember information about your visit.</p>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">4.2 Types of Cookies We Use</h3>
                
                <h4 className="font-semibold mb-2">Essential Cookies (Required):</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Authentication and account access</li>
                  <li>Shopping cart functionality</li>
                  <li>Security features</li>
                  <li>Platform functionality</li>
                  <li>Cannot be disabled</li>
                </ul>

                <h4 className="font-semibold mb-2">Performance Cookies:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Analytics and usage tracking</li>
                  <li>Error monitoring</li>
                  <li>Performance measurement</li>
                  <li>A/B testing</li>
                </ul>

                <h4 className="font-semibold mb-2">Functionality Cookies:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Remember preferences</li>
                  <li>Personalize content</li>
                  <li>Language settings</li>
                  <li>Region preferences</li>
                </ul>

                <h4 className="font-semibold mb-2">Advertising Cookies:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Display targeted ads</li>
                  <li>Track ad effectiveness</li>
                  <li>Retargeting campaigns</li>
                  <li>Frequency capping</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Third-Party Cookies</h3>
                <p className="mb-3">Third-party services may set their own cookies:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Google Analytics:</strong> Usage analytics</li>
                  <li><strong>Facebook Pixel:</strong> Advertising and retargeting</li>
                  <li><strong>Stripe:</strong> Payment processing</li>
                  <li><strong>YouTube:</strong> Embedded videos</li>
                  <li><strong>Social Media:</strong> Sharing buttons</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Cookie Management</h3>
                
                <h4 className="font-semibold mb-2">Browser Controls:</h4>
                <p className="pl-4 mb-2">Most browsers allow you to:</p>
                <ul className="list-disc list-inside pl-8 mb-4 space-y-1">
                  <li>View and delete cookies</li>
                  <li>Block third-party cookies</li>
                  <li>Set cookie preferences</li>
                  <li>Receive cookie notifications</li>
                </ul>

                <h4 className="font-semibold mb-2">Opt-Out Options:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Google Analytics:</strong> Google Analytics Opt-out</li>
                  <li><strong>Facebook:</strong> Ad preferences in your Facebook settings</li>
                  <li><strong>NAI Opt-Out:</strong> Network Advertising Initiative</li>
                  <li><strong>DAA Opt-Out:</strong> Digital Advertising Alliance</li>
                </ul>
                <p className="pl-4 mb-4 italic text-yellow-700 dark:text-yellow-400">Note: Disabling essential cookies may limit platform functionality.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.5 Other Tracking Technologies</h3>
                
                <h4 className="font-semibold mb-2">Web Beacons (Pixels):</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Track email opens</li>
                  <li>Monitor page views</li>
                  <li>Measure campaign effectiveness</li>
                </ul>

                <h4 className="font-semibold mb-2">Local Storage:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Store preferences locally</li>
                  <li>Cache data for performance</li>
                  <li>Enable offline functionality</li>
                </ul>

                <h4 className="font-semibold mb-2">Session Storage:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Maintain session state</li>
                  <li>Temporary data storage</li>
                  <li>Cleared when browser closes</li>
                </ul>
              </section>

              {/* 5. Data Security */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">5. Data Security</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">5.1 Security Measures</h3>
                <p className="mb-4">We implement industry-standard security measures:</p>
                
                <h4 className="font-semibold mb-2">Technical Safeguards:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Encryption:</strong> SSL/TLS for data transmission, encryption at rest</li>
                  <li><strong>Access Controls:</strong> Role-based permissions, multi-factor authentication</li>
                  <li><strong>Firewalls:</strong> Network security and intrusion detection</li>
                  <li><strong>Secure Servers:</strong> Regular security updates and patches</li>
                  <li><strong>Monitoring:</strong> 24/7 security monitoring and logging</li>
                </ul>

                <h4 className="font-semibold mb-2">Administrative Safeguards:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Employee Training:</strong> Privacy and security awareness</li>
                  <li><strong>Background Checks:</strong> Screening of personnel with data access</li>
                  <li><strong>Confidentiality Agreements:</strong> All staff sign NDAs</li>
                  <li><strong>Access Limitations:</strong> Principle of least privilege</li>
                  <li><strong>Incident Response:</strong> Procedures for security breaches</li>
                </ul>

                <h4 className="font-semibold mb-2">Physical Safeguards:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Data Centers:</strong> Secure facilities with restricted access</li>
                  <li><strong>Equipment Security:</strong> Locked server rooms and cabinets</li>
                  <li><strong>Device Security:</strong> Encrypted devices and secure disposal</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Payment Security</h3>
                
                <h4 className="font-semibold mb-2">PCI DSS Compliance:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>We do not store complete payment card information</li>
                  <li>Payments processed by PCI-compliant providers (Stripe, PayPal)</li>
                  <li>Tokenization of payment data</li>
                  <li>Encrypted transmission of payment information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Account Security Best Practices</h3>
                <p className="mb-3">You can enhance your account security by:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Using a strong, unique password</li>
                  <li>Enabling two-factor authentication (if available)</li>
                  <li>Not sharing your login credentials</li>
                  <li>Logging out on shared devices</li>
                  <li>Keeping contact information current</li>
                  <li>Reporting suspicious activity immediately</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Security Limitations</h3>
                <p className="mb-3 font-semibold">No system is 100% secure. Despite our efforts:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Data transmission over the internet carries inherent risks</li>
                  <li>Unauthorized access may occur despite safeguards</li>
                  <li>You use the Platform at your own risk</li>
                  <li>We cannot guarantee absolute security</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.5 Data Breach Notification</h3>
                <p className="mb-3">In the event of a data breach:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>We will investigate promptly</li>
                  <li>Affected users will be notified as required by law</li>
                  <li>We will take steps to mitigate harm</li>
                  <li>Authorities will be notified when required</li>
                  <li>We will provide information about the breach and protective measures</li>
                </ul>
              </section>

              {/* 6. Data Retention */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">6. Data Retention</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">6.1 Retention Periods</h3>
                <p className="mb-4">We retain your information for as long as necessary to fulfill the purposes outlined in this policy:</p>
                
                <h4 className="font-semibold mb-2">Active Accounts:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Retained as long as account is active</li>
                  <li>Plus any required retention period after deactivation</li>
                </ul>

                <h4 className="font-semibold mb-2">Transaction Data:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Minimum 7 years (tax and accounting requirements)</li>
                  <li>May be longer based on legal obligations</li>
                </ul>

                <h4 className="font-semibold mb-2">Marketing Data:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Until you opt out or object</li>
                  <li>Reviewed periodically for continued relevance</li>
                </ul>

                <h4 className="font-semibold mb-2">Legal Data:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>As required by law or legal proceedings</li>
                  <li>Minimum retention periods vary by jurisdiction</li>
                </ul>

                <h4 className="font-semibold mb-2">Security Logs:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Typically 1-2 years for security monitoring</li>
                  <li>Longer if investigating specific incidents</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Deletion</h3>
                
                <h4 className="font-semibold mb-2">Account Deletion:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>You can request account deletion at any time</li>
                  <li>Most data deleted within 30 days</li>
                  <li>Some data retained for legal compliance</li>
                  <li>Backups may retain data for additional period</li>
                </ul>

                <h4 className="font-semibold mb-2">Exceptions to Deletion:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Legal hold or pending litigation</li>
                  <li>Fraud prevention and security</li>
                  <li>Tax and accounting requirements</li>
                  <li>Contractual obligations</li>
                </ul>
              </section>

              {/* 7. Your Privacy Rights */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">7. Your Privacy Rights</h2>
                <p className="mb-4">Depending on your location, you may have specific privacy rights.</p>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">7.1 Rights for All Users</h3>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                  <li><strong>Objection:</strong> Object to certain processing of your data</li>
                  <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.2 GDPR Rights (European Economic Area)</h3>
                <p className="mb-3">If you're in the EEA, you have additional rights under GDPR:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Right to Be Informed:</strong> Transparent information about processing</li>
                  <li><strong>Right of Access:</strong> Obtain confirmation and copy of data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
                  <li><strong>Right to Erasure ("Right to Be Forgotten"):</strong> Delete data in certain circumstances</li>
                  <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Transfer data to another service</li>
                  <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Rights Related to Automated Decision-Making:</strong> Not subject to automated decisions with legal effects</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-4">Legal Basis for Processing:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Consent:</strong> For marketing and optional features</li>
                  <li><strong>Contract:</strong> To provide services you request</li>
                  <li><strong>Legitimate Interests:</strong> Platform improvement and security</li>
                  <li><strong>Legal Obligation:</strong> Compliance with laws</li>
                </ul>

                <p className="pl-4 mb-3"><strong>Withdrawal of Consent:</strong> You can withdraw consent at any time without affecting prior processing.</p>
                <p className="pl-4 mb-4"><strong>Supervisory Authority:</strong> Right to lodge a complaint with your local data protection authority.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.3 CCPA Rights (California Residents)</h3>
                <p className="mb-3">California residents have specific rights under CCPA:</p>
                
                <h4 className="font-semibold mb-2">Right to Know:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Categories of personal information collected</li>
                  <li>Specific pieces of information collected</li>
                  <li>Sources of information</li>
                  <li>Business purposes for collection</li>
                  <li>Third parties with whom we share information</li>
                </ul>

                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Right to Delete:</strong> Request deletion of personal information (with exceptions)</li>
                  <li><strong>Right to Opt-Out:</strong> Opt out of sale of personal information (we do not sell data)</li>
                  <li><strong>Right to Non-Discrimination:</strong> Equal service and pricing regardless of privacy rights exercise</li>
                  <li><strong>Authorized Agent:</strong> Designate an authorized agent to make requests on your behalf</li>
                  <li><strong>California Shine the Light:</strong> Request information about sharing personal information with third parties for their marketing purposes (we do not share for this purpose)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.4 Other Jurisdictions</h3>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Canada (PIPEDA):</strong> Similar rights to GDPR</li>
                  <li><strong>Brazil (LGPD):</strong> Rights similar to GDPR</li>
                  <li><strong>Australia (Privacy Act):</strong> Access and correction rights</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">7.5 How to Exercise Your Rights</h3>
                <p className="mb-3">To exercise your privacy rights:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Email:</strong> info@limenlakay.com</li>
                  <li><strong>Account Settings:</strong> Access some settings directly in your account</li>
                </ul>

                <p className="mb-3 mt-4 font-semibold">We will:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Respond within required timeframes (typically 30-45 days)</li>
                  <li>Verify your identity before processing requests</li>
                  <li>Provide information in a clear, accessible format</li>
                  <li>Honor your requests unless legal exceptions apply</li>
                </ul>
              </section>

              {/* 8. Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">8. Children's Privacy</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">8.1 Age Restrictions</h3>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Our Platform is not intended for children under 13 (or 16 in the EEA).</li>
                  <li>We do not knowingly collect information from children under 13.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Parental Consent</h3>
                <p className="mb-3">For users aged 13-18:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Parental consent required</li>
                  <li>Parents may review and delete child's information</li>
                  <li>Parents responsible for monitoring child's activity</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Discovering Child Data</h3>
                <p className="mb-3">If we discover we've collected data from a child under 13:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>We will delete the information promptly</li>
                  <li>We will deactivate the account</li>
                  <li>We will notify parents if contact information available</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">8.4 Reporting</h3>
                <p className="mb-3">If you believe we have information from a child under 13, contact us immediately at: <strong>info@limenlakay.com</strong></p>
              </section>

              {/* 9. International Data Transfers */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">9. International Data Transfers</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">9.1 Data Location</h3>
                <p className="mb-4">Your information may be transferred to and processed in countries other than your own, including United States.</p>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">9.2 Cross-Border Transfers</h3>
                <h4 className="font-semibold mb-2">Transfer Safeguards:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>EU-US Data Privacy Framework (if applicable)</li>
                  <li>Standard Contractual Clauses (for EEA transfers)</li>
                  <li>Adequacy Decisions (countries with adequate protection)</li>
                  <li>Explicit Consent (when required)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">9.3 Data Protection Standards</h3>
                <p className="mb-3">We ensure transferred data receives adequate protection through:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Contractual obligations</li>
                  <li>Technical safeguards</li>
                  <li>Compliance with local laws</li>
                  <li>Regular audits and assessments</li>
                </ul>
              </section>

              {/* 10. Third-Party Links and Services */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">10. Third-Party Links and Services</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">10.1 External Links</h3>
                <p className="mb-3">Our Platform may contain links to third-party websites. We are not responsible for:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Privacy practices of external sites</li>
                  <li>Content on third-party websites</li>
                  <li>Data collection by linked sites</li>
                </ul>
                <p className="mb-4">We encourage you to review privacy policies of any site you visit.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.2 Third-Party Integrations</h3>
                
                <h4 className="font-semibold mb-2">Social Media:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Facebook, Instagram, Pinterest, Twitter</li>
                  <li>Governed by their own privacy policies</li>
                  <li>We receive only information you authorize</li>
                </ul>

                <h4 className="font-semibold mb-2">Payment Providers:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Stripe, PayPal, Square</li>
                  <li>Subject to their privacy policies</li>
                  <li>We don't store complete payment information</li>
                </ul>

                <h4 className="font-semibold mb-2">Analytics and Advertising:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Google Analytics, Facebook Pixel</li>
                  <li>Subject to their data policies</li>
                  <li>You can opt out through their platforms</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">10.3 Third-Party Responsibility</h3>
                <p className="mb-4">Third parties are independent controllers of data they collect. We are not responsible for their practices.</p>
              </section>

              {/* 11. Changes to This Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">11. Changes to This Privacy Policy</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">11.1 Updates</h3>
                <p className="mb-3">We may update this Privacy Policy periodically to reflect:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Changes in our practices</li>
                  <li>Legal or regulatory requirements</li>
                  <li>New features or services</li>
                  <li>User feedback</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">11.2 Notification</h3>
                
                <h4 className="font-semibold mb-2">Material Changes:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Notification via email to registered address</li>
                  <li>Prominent notice on Platform</li>
                  <li>30-day advance notice (when possible)</li>
                </ul>

                <h4 className="font-semibold mb-2">Minor Changes:</h4>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Updated "Last Updated" date</li>
                  <li>Notification on next login</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">11.3 Review</h3>
                <p className="mb-4">We encourage you to review this Privacy Policy periodically to stay informed about our privacy practices.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">11.4 Continued Use</h3>
                <p className="mb-4">Your continued use of the Platform after changes constitutes acceptance of the updated Privacy Policy.</p>
              </section>

              {/* 12. Contact Us */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">12. Contact Us</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">12.1 Privacy Questions</h3>
                <p className="mb-3">If you have questions or concerns about this Privacy Policy or our privacy practices:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Email:</strong> info@limenlakay.com</li>
                  <li><strong>Subject Line:</strong> "Privacy Inquiry"</li>
                </ul>
                <p className="mb-4"><strong>Response Time:</strong> We aim to respond within 48-72 hours.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Data Protection Officer (if applicable)</h3>
                <p className="mb-4">For GDPR-related inquiries: <strong>info@limenlakay.com</strong></p>

                <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Customer Support</h3>
                <p className="mb-3">For general questions about the Platform:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li><strong>Email:</strong> info@limenlakay.com</li>
                  <li><strong>Phone:</strong> 561 593 0238</li>
                  <li><strong>Live Chat:</strong> Available on Platform</li>
                </ul>
              </section>

              {/* 13. Additional Disclosures */}
              <section>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">13. Additional Disclosures</h2>

                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">13.1 Do Not Track</h3>
                <p className="mb-4">Some browsers have "Do Not Track" (DNT) features. Our Platform does not currently respond to DNT signals, as there is no industry standard for DNT compliance.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">13.2 Social Media Features</h3>
                <p className="mb-3">Social media features and widgets are either:</p>
                <ul className="list-disc list-inside pl-4 mb-4 space-y-1">
                  <li>Hosted by third parties</li>
                  <li>Hosted directly on our Platform</li>
                </ul>
                <p className="mb-4">These features may collect your IP address, pages visited, and may set cookies. Your interactions are governed by the privacy policy of the providing company.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">13.3 Testimonials and Reviews</h3>
                <p className="mb-4">With your consent, we may post testimonials containing personal information. You can request removal at any time.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">13.4 Contests and Promotions</h3>
                <p className="mb-4">Participation may require additional personal information. Contest terms will specify data collection and use.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">13.5 Referral Programs</h3>
                <p className="mb-4">If you refer friends, we collect referrer and referee information only as necessary for the program.</p>
              </section>

              {/* Summary */}
              <section className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">Summary of Key Points</h2>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <strong>What We Collect:</strong> Account info, usage data, transaction details, content you share
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <strong>How We Use It:</strong> Provide services, process orders, improve platform, communicate with you
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <strong>Who We Share With:</strong> Service providers, legal requirements (we don't sell your data)
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🍪</span>
                    <div>
                      <strong>Cookies:</strong> We use cookies for functionality, analytics, and advertising
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <strong>Security:</strong> Industry-standard measures to protect your data
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <strong>Your Rights:</strong> Access, correct, delete, or export your data
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">👶</span>
                    <div>
                      <strong>Children:</strong> Not for users under 13; parental consent for 13-18
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <strong>International:</strong> Data may be transferred internationally with safeguards
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <strong>Contact:</strong> info@limenlakay.com for questions
                    </div>
                  </li>
                </ul>
              </section>

              {/* Final Note */}
              <section className="border-t pt-6">
                <p className="mb-4 font-semibold">
                  Your privacy matters to us. We are committed to transparency, security, and giving you control over your personal information. If you have any questions or concerns, please don't hesitate to contact us.
                </p>
                <p className="mb-4">
                  <strong>This Privacy Policy is effective as of December 25, 2025.</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  This Privacy Policy is provided as a template and should be reviewed by a qualified privacy attorney to ensure compliance with applicable laws in your jurisdiction. Privacy laws vary significantly by region, and professional legal advice is strongly recommended.
                </p>
              </section>

            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

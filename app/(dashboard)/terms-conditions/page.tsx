"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function TermsConditionsPage() {
  return (
    <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            Legal Document
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: December 26, 2025
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <CardTitle className="text-2xl">Terms of Service Agreement</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-250px)] p-6">
              <div className="space-y-8 text-gray-700 dark:text-gray-300">
                
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    1. Agreement to Terms
                  </h2>
                  <div className="space-y-4">
                    <p>
                      Welcome to <strong>CandleFlow</strong> ("Company," "we," "our," "us"). These Terms and Conditions ("Terms") govern your access to and use of our candle-making business management software platform, including our website, mobile applications, and related services (collectively, the "Service").
                    </p>
                    <p>
                      By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.
                    </p>
                    <p className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
                      <strong>Important:</strong> These Terms constitute a legally binding agreement between you and CandleFlow. Please read them carefully.
                    </p>
                  </div>
                </section>

                {/* Service Description */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    2. Description of Service
                  </h2>
                  <div className="space-y-4">
                    <p>
                      CandleFlow provides a comprehensive SaaS platform designed specifically for candle-making businesses. Our Service includes, but is not limited to:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li><strong>Recipe Management:</strong> Create, store, and manage candle recipes with detailed ingredient tracking</li>
                      <li><strong>Inventory Management:</strong> Track wax, fragrances, wicks, containers, and other supplies</li>
                      <li><strong>Cost Calculator:</strong> Calculate production costs, pricing, and profit margins</li>
                      <li><strong>Order Management:</strong> Process and track customer orders</li>
                      <li><strong>Production Planning:</strong> Schedule and manage production batches</li>
                      <li><strong>Supplier Management:</strong> Maintain supplier contacts and purchase history</li>
                      <li><strong>Quality Control:</strong> Log and track product testing and quality metrics</li>
                      <li><strong>Analytics & Reporting:</strong> Business insights and performance tracking</li>
                      <li><strong>Invoice Generation:</strong> Create professional invoices for customers</li>
                      <li><strong>AI-Powered Features:</strong> Scent blending recommendations and business insights</li>
                    </ul>
                    <p>
                      We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice.
                    </p>
                  </div>
                </section>

                {/* User Accounts */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    3. User Accounts and Registration
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">3.1 Account Creation</h3>
                    <p>
                      To use certain features of our Service, you must create an account. You agree to:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Provide accurate, current, and complete information during registration</li>
                      <li>Maintain and promptly update your account information</li>
                      <li>Maintain the security of your password and account</li>
                      <li>Accept all responsibility for activities that occur under your account</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">3.2 Account Eligibility</h3>
                    <p>
                      You must be at least 18 years old and legally capable of entering into binding contracts to use our Service. By creating an account, you represent and warrant that you meet these requirements.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">3.3 Business Use</h3>
                    <p>
                      Our Service is intended for business and commercial use. You may not use the Service for any illegal or unauthorized purpose.
                    </p>
                  </div>
                </section>

                {/* Payment and Billing */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    4. Payment, Fees, and Billing
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">4.1 Subscription Plans</h3>
                    <p>
                      CandleFlow offers various subscription tiers with different features and pricing. Current plans include:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li><strong>Free Tier:</strong> Basic features with limitations</li>
                      <li><strong>Starter Plan:</strong> Enhanced features for growing businesses</li>
                      <li><strong>Professional Plan:</strong> Advanced features and higher limits</li>
                      <li><strong>Enterprise Plan:</strong> Custom solutions with dedicated support</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">4.2 Payment Terms</h3>
                    <p>
                      By subscribing to a paid plan, you agree to:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Pay all fees associated with your chosen subscription plan</li>
                      <li>Provide valid and current payment information</li>
                      <li>Authorize us to charge your payment method on a recurring basis</li>
                      <li>Pay applicable taxes, including VAT, sales tax, or GST</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">4.3 Billing Cycle</h3>
                    <p>
                      Subscription fees are billed in advance on a monthly or annual basis, depending on your chosen plan. Your subscription will automatically renew unless you cancel before the renewal date.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">4.4 Price Changes</h3>
                    <p>
                      We reserve the right to change our pricing at any time. If we increase your subscription price, we will notify you at least 30 days in advance. Continued use of the Service after a price change constitutes acceptance of the new pricing.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">4.5 Refund Policy</h3>
                    <p>
                      Subscription fees are non-refundable except as required by law or as explicitly stated in our refund policy. If you cancel your subscription, you will continue to have access until the end of your current billing period.
                    </p>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    5. Intellectual Property Rights
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">5.1 Our Intellectual Property</h3>
                    <p>
                      The Service and its original content, features, and functionality are owned by CandleFlow and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                    <p>
                      Our trademarks, service marks, logos, and trade dress may not be used without our prior written permission.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">5.2 Your Content</h3>
                    <p>
                      You retain all rights to the content you upload to our Service, including recipes, formulas, customer data, and business information ("Your Content"). By using our Service, you grant us a limited license to:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Store, process, and display Your Content as necessary to provide the Service</li>
                      <li>Use anonymized and aggregated data for service improvement and analytics</li>
                      <li>Create backups and ensure data redundancy for security purposes</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">5.3 Feedback</h3>
                    <p>
                      If you provide us with feedback, suggestions, or ideas about the Service, you grant us a perpetual, worldwide, royalty-free license to use, modify, and incorporate such feedback into our Service without compensation to you.
                    </p>
                  </div>
                </section>

                {/* User Content and Conduct */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    6. User Content and Conduct
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">6.1 Content Responsibility</h3>
                    <p>
                      You are solely responsible for all content you create, upload, or share through our Service. You represent and warrant that:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>You own or have the necessary rights to all content you upload</li>
                      <li>Your content does not violate any third-party rights</li>
                      <li>Your content complies with all applicable laws and regulations</li>
                      <li>Your content does not contain malware, viruses, or harmful code</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">6.2 Prohibited Uses</h3>
                    <p>
                      You agree not to use the Service to:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe upon the rights of others</li>
                      <li>Transmit spam, junk mail, or unsolicited messages</li>
                      <li>Impersonate any person or entity</li>
                      <li>Interfere with or disrupt the Service or servers</li>
                      <li>Attempt to gain unauthorized access to any part of the Service</li>
                      <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                      <li>Use automated systems (bots, scrapers) without our permission</li>
                      <li>Resell or redistribute the Service without authorization</li>
                      <li>Upload malicious code or engage in hacking activities</li>
                    </ul>
                  </div>
                </section>

                {/* Data and Privacy */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    7. Data Protection and Privacy
                  </h2>
                  <div className="space-y-4">
                    <p>
                      Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to our data practices as described in our Privacy Policy.
                    </p>
                    <p>
                      Key privacy highlights:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li><strong>Data Security:</strong> We implement industry-standard security measures to protect your data</li>
                      <li><strong>Data Ownership:</strong> You retain ownership of all your business data</li>
                      <li><strong>Data Export:</strong> You can export your data at any time</li>
                      <li><strong>Data Deletion:</strong> You can request deletion of your account and data</li>
                      <li><strong>GDPR Compliance:</strong> We comply with GDPR and other data protection regulations</li>
                    </ul>
                  </div>
                </section>

                {/* Service Availability */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    8. Service Availability and Support
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">8.1 Uptime</h3>
                    <p>
                      While we strive to provide 99.9% uptime, we do not guarantee uninterrupted access to the Service. The Service may be unavailable due to:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Scheduled maintenance (with advance notice when possible)</li>
                      <li>Emergency maintenance or security updates</li>
                      <li>Events beyond our control (force majeure)</li>
                      <li>Network or infrastructure issues</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">8.2 Customer Support</h3>
                    <p>
                      Support availability varies by subscription tier:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li><strong>Free Tier:</strong> Email support with 72-hour response time</li>
                      <li><strong>Starter Plan:</strong> Email support with 48-hour response time</li>
                      <li><strong>Professional Plan:</strong> Priority email support with 24-hour response time</li>
                      <li><strong>Enterprise Plan:</strong> Dedicated support with phone and chat options</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">8.3 Data Backups</h3>
                    <p>
                      We perform regular automated backups of your data. However, we strongly recommend that you maintain your own backups of critical business information.
                    </p>
                  </div>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    9. Third-Party Services and Links
                  </h2>
                  <div className="space-y-4">
                    <p>
                      Our Service may integrate with or contain links to third-party services, websites, or applications, including:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Payment processors (Stripe, PayPal)</li>
                      <li>Analytics services (Google Analytics)</li>
                      <li>Email services</li>
                      <li>Cloud storage providers</li>
                      <li>Social media platforms</li>
                    </ul>
                    <p>
                      We are not responsible for the content, privacy policies, or practices of third-party services. Your use of third-party services is at your own risk and subject to their respective terms and conditions.
                    </p>
                  </div>
                </section>

                {/* Disclaimers */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    10. Disclaimers and Warranties
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                      <p className="font-semibold mb-2">IMPORTANT LEGAL NOTICE:</p>
                      <p>
                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                      </p>
                    </div>
                    <p>
                      Specifically, we do not warrant that:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>The Service will meet your specific requirements</li>
                      <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                      <li>The results obtained from the Service will be accurate or reliable</li>
                      <li>Any errors in the Service will be corrected</li>
                      <li>The Service is free from viruses or other harmful components</li>
                    </ul>
                    <p>
                      <strong>Recipe and Formula Disclaimer:</strong> Our Service provides tools for managing recipes and formulas. However, we do not guarantee the safety, efficacy, or compliance of any candle recipes created using our platform. You are solely responsible for:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Testing all recipes for safety and quality</li>
                      <li>Ensuring compliance with applicable regulations and standards</li>
                      <li>Verifying all ingredient compatibility and measurements</li>
                      <li>Meeting industry safety standards and certifications</li>
                    </ul>
                  </div>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    11. Limitation of Liability
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                      <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL CANDLEFLOW, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
                      </p>
                    </div>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Loss of profits, revenue, or business opportunities</li>
                      <li>Loss of data or information</li>
                      <li>Loss of goodwill or reputation</li>
                      <li>Business interruption</li>
                      <li>Cost of substitute services</li>
                      <li>Personal injury or property damage</li>
                    </ul>
                    <p>
                      Our total liability to you for any claims arising from or related to the Service shall not exceed the greater of:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>The amount you paid us in the 12 months preceding the claim, or</li>
                      <li>$100 USD</li>
                    </ul>
                    <p>
                      Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
                    </p>
                  </div>
                </section>

                {/* Indemnification */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    12. Indemnification
                  </h2>
                  <div className="space-y-4">
                    <p>
                      You agree to indemnify, defend, and hold harmless CandleFlow, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Your use or misuse of the Service</li>
                      <li>Your violation of these Terms</li>
                      <li>Your violation of any rights of another party</li>
                      <li>Your Content or business activities</li>
                      <li>Products you create, manufacture, or sell using information from the Service</li>
                    </ul>
                  </div>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    13. Termination and Suspension
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">13.1 Termination by You</h3>
                    <p>
                      You may terminate your account at any time by:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Canceling your subscription through account settings</li>
                      <li>Contacting our support team</li>
                    </ul>
                    <p>
                      Upon cancellation, you will continue to have access until the end of your current billing period. No refunds will be provided for unused time.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">13.2 Termination by Us</h3>
                    <p>
                      We may suspend or terminate your account immediately, without prior notice or liability, if:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>You breach these Terms</li>
                      <li>Your account has been inactive for an extended period</li>
                      <li>We are required to do so by law</li>
                      <li>Your use of the Service poses a security risk</li>
                      <li>You engage in fraudulent or illegal activities</li>
                      <li>Payment obligations are not met</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">13.3 Effect of Termination</h3>
                    <p>
                      Upon termination:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Your right to use the Service will immediately cease</li>
                      <li>You will have 30 days to export your data</li>
                      <li>After 30 days, we may permanently delete your data</li>
                      <li>All provisions that should survive termination will remain in effect</li>
                    </ul>
                  </div>
                </section>

                {/* Disputes and Governing Law */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    14. Disputes, Governing Law, and Jurisdiction
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">14.1 Governing Law</h3>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">14.2 Dispute Resolution</h3>
                    <p>
                      In the event of any dispute arising from or relating to these Terms or the Service:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li><strong>Informal Resolution:</strong> We encourage you to contact us first to seek an informal resolution</li>
                      <li><strong>Mediation:</strong> If informal resolution fails, we agree to attempt mediation before pursuing litigation</li>
                      <li><strong>Arbitration:</strong> Any unresolved disputes may be subject to binding arbitration</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">14.3 Class Action Waiver</h3>
                    <p>
                      You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">14.4 Jurisdiction</h3>
                    <p>
                      You agree to submit to the personal jurisdiction of the courts located within [Your Jurisdiction] for the purpose of litigating any claims not subject to arbitration.
                    </p>
                  </div>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    15. Changes to These Terms
                  </h2>
                  <div className="space-y-4">
                    <p>
                      We reserve the right to modify these Terms at any time. We will:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Notify you of material changes via email or in-app notification</li>
                      <li>Update the "Last Updated" date at the top of this page</li>
                      <li>Provide at least 30 days' notice for changes that materially affect your rights</li>
                    </ul>
                    <p>
                      Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the changes, you must stop using the Service and cancel your account.
                    </p>
                  </div>
                </section>

                {/* General Provisions */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    16. General Provisions
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">16.1 Entire Agreement</h3>
                    <p>
                      These Terms, together with our Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and CandleFlow regarding the Service.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">16.2 Severability</h3>
                    <p>
                      If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">16.3 Waiver</h3>
                    <p>
                      Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">16.4 Assignment</h3>
                    <p>
                      You may not assign or transfer these Terms without our prior written consent. We may assign or transfer these Terms without restriction.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">16.5 Force Majeure</h3>
                    <p>
                      We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, riots, labor disputes, or government actions.
                    </p>

                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4">16.6 Survival</h3>
                    <p>
                      Provisions that by their nature should survive termination shall survive, including but not limited to: ownership provisions, warranty disclaimers, indemnity obligations, and limitations of liability.
                    </p>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    17. Contact Information
                  </h2>
                  <div className="space-y-4">
                    <p>
                      If you have any questions, concerns, or disputes regarding these Terms, please contact us:
                    </p>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                      <p className="font-semibold text-lg mb-3">📧 CandleFlow Support</p>
                      <ul className="space-y-2">
                        <li><strong>Email:</strong> legal@candleflow.com</li>
                        <li><strong>Support:</strong> support@candleflow.com</li>
                        <li><strong>Website:</strong> www.candleflow.com</li>
                        <li><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Acknowledgment */}
                <section className="border-t-2 pt-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">
                      ✅ Acknowledgment of Terms
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      By clicking "I Accept," creating an account, or using the CandleFlow Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. You also acknowledge that you have read and understood our Privacy Policy.
                    </p>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                      We recommend that you print or save a copy of these Terms for your records.
                    </p>
                  </div>
                </section>

                {/* Summary Box */}
                <section className="border-t-2 pt-6">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                      📋 Quick Summary
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">✓ You Agree To:</p>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                          <li>• Use the Service responsibly</li>
                          <li>• Pay subscription fees on time</li>
                          <li>• Keep your account secure</li>
                          <li>• Own your content and data</li>
                          <li>• Follow our acceptable use policy</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">✓ We Promise To:</p>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                          <li>• Provide reliable service</li>
                          <li>• Protect your data</li>
                          <li>• Offer customer support</li>
                          <li>• Be transparent about changes</li>
                          <li>• Respect your intellectual property</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Bell, CreditCard, Shield, Upload, X, ShoppingBag, Zap, Save, Building2, Lock, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { getBusinessSettings, saveBusinessSettings, type BusinessSettings } from "@/lib/businessSettings";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// Simple Tooltip Component using title attribute
const Tooltip = ({ text }: { text: string }) => (
  <span className="inline-flex items-center ml-2" title={text}>
    <HelpCircle className="w-4 h-4 text-purple-500 hover:text-purple-700 cursor-help" />
  </span>
);

export default function SettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings>(getBusinessSettings());
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'payment' | 'automation' | 'security'>('profile');

  useEffect(() => {
    const loaded = getBusinessSettings();
    setSettings(loaded);
    setLogoPreview(loaded.logoUrl);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setLogoPreview(dataUrl);
        updateSetting('logoUrl', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    updateSetting('logoUrl', null);
  };

  const updateSetting = (key: keyof BusinessSettings, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveBusinessSettings({ [key]: value });
  };

  const handleSave = () => {
    saveBusinessSettings(settings);
    alert('Settings saved successfully!');
  };

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          Settings
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
              <HelpCircle className="w-6 h-6 text-purple-500 hover:text-purple-600 cursor-help" />
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Content 
                side="right" 
                className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                sideOffset={5}
              >
                Configure your account preferences and business settings. Manage profile, business information, payment gateways, automation rules, and security settings.
                <TooltipPrimitive.Arrow className="fill-white" />
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          </TooltipPrimitive.Root>
        </h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition ${
              activeTab === 'profile'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition ${
              activeTab === 'business'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Business
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition ${
              activeTab === 'payment'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Payment Gateway
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition ${
              activeTab === 'automation'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Zap className="w-4 h-4" />
            Automation
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition ${
              activeTab === 'security'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Lock className="w-4 h-4" />
            Security
          </button>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-2 border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Test Tooltip - Remove after verification */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm flex items-center gap-2">
                    <span>Hover over the icon:</span>
                    <span title="This is a test tooltip!">
                      <HelpCircle className="w-5 h-5 text-blue-600 cursor-help" />
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center">
                      First Name
                      <Tooltip text="Your legal first name as it appears on official documents." />
                    </Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="mt-2"
                      value={settings.firstName}
                      onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center">
                      Last Name
                      <Tooltip text="Your legal last name for invoices and business documents." />
                    </Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="mt-2"
                      value={settings.lastName}
                      onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                    Email Address
                    <Tooltip text="Primary email for account notifications, invoices, and system alerts." />
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="mt-2"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                    Phone Number
                    <Tooltip text="Contact number for urgent notifications and customer support." />
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    className="mt-2"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>

                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-2 border-gray-200 shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-purple-300 transition">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    Email Notifications
                    <Tooltip text="Receive email updates for orders, payments, and system events." />
                  </span>
                  <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-purple-300 transition">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    Low Stock Alerts
                    <Tooltip text="Get notified when inventory levels fall below your threshold." />
                  </span>
                  <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-purple-300 transition">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    Order Updates
                    <Tooltip text="Receive notifications when orders are placed, shipped, or delivered." />
                  </span>
                  <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader className="border-b border-purple-200">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg">Subscription</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-center py-4">
                  <p className="text-sm font-semibold text-purple-900 mb-1">Pro Plan</p>
                  <p className="text-xs text-purple-700 mb-4">Unlimited calculations & recipes</p>
                  <button className="w-full px-4 py-2.5 bg-white border-2 border-purple-300 rounded-lg text-sm font-semibold text-purple-700 hover:bg-purple-100 transition">
                    Manage Plan
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Business Tab */}
      {activeTab === 'business' && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                <div>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Configure your business details and branding</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="pb-6 border-b">
                  <Label className="mb-3 block text-sm font-medium text-gray-700 flex items-center">
                    Business Logo
                    <Tooltip text="Upload your company logo to appear on invoices, reports, and customer communications." />
                  </Label>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      {logoPreview ? (
                        <div className="relative w-32 h-32 rounded-xl border-2 border-gray-200 overflow-hidden bg-white shadow-sm">
                          <Image
                            src={logoPreview}
                            alt="Logo preview"
                            fill
                            className="object-contain p-2"
                          />
                          <button
                            onClick={removeLogo}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
                          <Upload className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="inline-block px-6 py-3 bg-white border-2 border-purple-300 text-purple-700 rounded-lg font-semibold cursor-pointer hover:bg-purple-50 transition"
                      >
                        Upload Logo
                      </label>
                      <p className="text-sm text-gray-600 mt-3">
                        Recommended: Square image, at least 200x200px. Max 2MB.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports: JPG, PNG, SVG
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="businessName" className="text-sm font-medium text-gray-700 flex items-center">
                      Business Name
                      <Tooltip text="Official registered name of your candle business for legal documents." />
                    </Label>
                    <Input 
                      id="businessName" 
                      placeholder="My Candle Co." 
                      className="mt-2"
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-sm font-medium text-gray-700 flex items-center">
                      Website
                      <Tooltip text="Your business website URL to include on invoices and marketing materials." />
                    </Label>
                    <Input 
                      id="website" 
                      type="url" 
                      placeholder="www.yourwebsite.com" 
                      className="mt-2"
                      value={settings.website}
                      onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessPhone" className="text-sm font-medium text-gray-700 flex items-center">
                      Business Phone
                      <Tooltip text="Main contact number for your business to appear on invoices and customer communications." />
                    </Label>
                    <Input 
                      id="businessPhone" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      className="mt-2"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">Business Address</Label>
                    <Input 
                      id="address" 
                      placeholder="123 Main Street" 
                      className="mt-2"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Palm Beach" 
                      className="mt-2"
                      value={settings.city}
                      onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                      <Input 
                        id="state" 
                        placeholder="FL" 
                        className="mt-2"
                        value={settings.state}
                        onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">Zip Code</Label>
                      <Input 
                        id="zipCode" 
                        placeholder="33480" 
                        className="mt-2"
                        value={settings.zipCode}
                        onChange={(e) => setSettings({ ...settings, zipCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Business Details
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Gateway Tab */}
      {activeTab === 'payment' && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <div>
                  <CardTitle>Payment Gateway</CardTitle>
                  <CardDescription>Connect your merchant account to accept payments</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700 flex items-center">
                    Payment Processor
                    <Tooltip text="Choose your payment gateway to process customer payments securely." />
                  </Label>
                  <select
                    value={settings.paymentGateway}
                    onChange={(e) => updateSetting('paymentGateway', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none">None - Select a payment gateway</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="square">Square</option>
                    <option value="bank">Bank Transfer / ACH</option>
                  </select>
                </div>

                {settings.paymentGateway !== 'none' && (
                  <>
                    {settings.paymentGateway !== 'bank' && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                        <div>
                          <span className="text-sm font-medium text-gray-700 flex items-center">
                            Test Mode
                            <Tooltip text="Enable to use sandbox/test credentials for development without processing real payments." />
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">Use test credentials for development</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.paymentTestMode}
                          onChange={(e) => updateSetting('paymentTestMode', e.target.checked)}
                          className="w-5 h-5 text-purple-600 rounded"
                        />
                      </div>
                    )}

                    {settings.paymentGateway === 'bank' ? (
                      <>
                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700">Bank Name</Label>
                          <Input
                            type="text"
                            value={settings.paymentApiKey || ''}
                            onChange={(e) => updateSetting('paymentApiKey', e.target.value)}
                            placeholder="e.g., Chase Bank, Bank of America"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700">Account Holder Name</Label>
                          <Input
                            type="text"
                            value={settings.paymentSecretKey || ''}
                            onChange={(e) => updateSetting('paymentSecretKey', e.target.value)}
                            placeholder="Full name on bank account"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700">Routing Number</Label>
                          <Input
                            type="text"
                            value={settings.paymentMerchantId || ''}
                            onChange={(e) => updateSetting('paymentMerchantId', e.target.value)}
                            placeholder="9-digit routing number"
                            className="font-mono text-sm"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700">Account Number</Label>
                          <Input
                            type="text"
                            value={settings.paymentWebhookUrl || ''}
                            onChange={(e) => updateSetting('paymentWebhookUrl', e.target.value)}
                            placeholder="Your bank account number"
                            className="font-mono text-sm"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700 flex items-center">
                            Publishable Key
                            <Tooltip text="Public API key used for client-side payment processing. Safe to expose in your frontend code." />
                          </Label>
                          <Input
                            type="text"
                            value={settings.paymentApiKey || ''}
                            onChange={(e) => updateSetting('paymentApiKey', e.target.value)}
                            placeholder={settings.paymentTestMode ? "Enter your test API key" : "Enter your live API key"}
                            className="text-sm font-mono"
                          />
                        </div>

                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700 flex items-center">
                            Secret Key
                            <Tooltip text="Private API key for server-side operations. Keep this secure and never expose in client code." />
                          </Label>
                          <Input
                            type="password"
                            value={settings.paymentSecretKey || ''}
                            onChange={(e) => updateSetting('paymentSecretKey', e.target.value)}
                            placeholder={settings.paymentTestMode ? "Enter your test secret key" : "Enter your live secret key"}
                            className="text-sm font-mono"
                          />
                        </div>

                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700 flex items-center">
                            Webhook URL (Optional)
                            <Tooltip text="Endpoint to receive real-time payment notifications from your payment processor." />
                          </Label>
                          <Input
                            type="text"
                            value={settings.paymentWebhookUrl || ''}
                            onChange={(e) => updateSetting('paymentWebhookUrl', e.target.value)}
                            placeholder="https://yourdomain.com/api/webhooks/payment"
                            className="text-sm font-mono"
                          />
                          <p className="text-xs text-gray-500 mt-1.5">
                            Configure this in your {settings.paymentGateway === 'stripe' ? 'Stripe' : settings.paymentGateway === 'paypal' ? 'PayPal' : 'Square'} dashboard to receive payment notifications
                          </p>
                        </div>
                      </>
                    )}

                    {/* Setup Instructions */}
                    {settings.paymentGateway === 'stripe' && (
                      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">Setup Instructions for Stripe</h4>
                        <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
                          <li>Go to <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Stripe Dashboard</a></li>
                          <li>Copy your Publishable key and Secret key</li>
                          <li>Paste them above (use test keys for testing)</li>
                          <li>Enable webhooks in Stripe dashboard for payment notifications</li>
                        </ol>
                      </div>
                    )}

                    {settings.paymentGateway === 'paypal' && (
                      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">Setup Instructions for PayPal</h4>
                        <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
                          <li>Go to <a href="https://developer.paypal.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">PayPal Developer</a></li>
                          <li>Create an app in your dashboard</li>
                          <li>Copy your Client ID (Publishable) and Secret key</li>
                          <li>Paste them above (use sandbox credentials for testing)</li>
                          <li>Configure webhooks in PayPal dashboard for payment events</li>
                        </ol>
                      </div>
                    )}

                    {settings.paymentGateway === 'square' && (
                      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">Setup Instructions for Square</h4>
                        <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
                          <li>Go to <a href="https://developer.squareup.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Square Developer</a></li>
                          <li>Create an application in your dashboard</li>
                          <li>Copy your Application ID and Access Token</li>
                          <li>Paste them above (use sandbox keys for testing)</li>
                          <li>Set up webhooks in Square dashboard for payment notifications</li>
                        </ol>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        <Save className="w-4 h-4" />
                        Save Payment Settings
                      </button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === 'automation' && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-yellow-50 to-amber-50">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <div>
                  <CardTitle>Production Automation</CardTitle>
                  <CardDescription>Configure automated production rules</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <div>
                    <span className="text-base font-semibold text-gray-900 flex items-center">
                      Enable Automation
                      <Tooltip text="Master switch to activate all automated production workflows and inventory management." />
                    </span>
                    <p className="text-sm text-gray-600 mt-1">Turn on automated production workflows</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.automationEnabled}
                    onChange={(e) => updateSetting('automationEnabled', e.target.checked)}
                    className="w-6 h-6 text-purple-600 rounded"
                  />
                </div>

                {settings.automationEnabled && (
                  <div className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700 flex items-center">
                          Low Stock Threshold
                          <Tooltip text="Minimum inventory quantity that triggers automatic reordering or production alerts." />
                        </Label>
                        <Input
                          type="number"
                          value={settings.lowStockThreshold}
                          onChange={(e) => updateSetting('lowStockThreshold', parseInt(e.target.value))}
                          min="1"
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">Trigger automation when stock falls below this number</p>
                      </div>

                      <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700 flex items-center">
                          Production Lead Time (days)
                          <Tooltip text="Average days needed to complete a production batch from start to finish." />
                        </Label>
                        <Input
                          type="number"
                          value={settings.productionLeadTime || 7}
                          onChange={(e) => updateSetting('productionLeadTime', parseInt(e.target.value))}
                          min="1"
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">Average days needed to complete production</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 hover:border-purple-300 transition">
                        <div>
                          <span className="text-sm font-medium text-gray-900 flex items-center">
                            Auto-Production
                            <Tooltip text="Automatically create production batches when inventory falls below threshold." />
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">Automatically create production batches</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.autoProductionEnabled}
                          onChange={(e) => updateSetting('autoProductionEnabled', e.target.checked)}
                          className="w-5 h-5 text-purple-600"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 hover:border-purple-300 transition">
                        <div>
                          <span className="text-sm font-medium text-gray-900 flex items-center">
                            Auto-Reorder
                            <Tooltip text="Automatically generate purchase orders for suppliers when materials are low." />
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">Automatically reorder from suppliers</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.autoReorderEnabled}
                          onChange={(e) => updateSetting('autoReorderEnabled', e.target.checked)}
                          className="w-5 h-5 text-purple-600"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 hover:border-purple-300 transition">
                        <div>
                          <span className="text-sm font-medium text-gray-900 flex items-center">
                            Email Notifications
                            <Tooltip text="Receive email alerts when automation rules trigger production or reordering." />
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">Get notified when automation triggers</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                          className="w-5 h-5 text-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Automation Settings
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-red-50 to-pink-50">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                <div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <button className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                Change Password
              </button>
              <button className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                Enable Two-Factor Authentication
              </button>
              <div className="pt-4 border-t">
                <button className="w-full px-6 py-3 bg-red-50 border-2 border-red-300 rounded-lg text-sm font-semibold text-red-700 hover:bg-red-100 transition">
                  Delete Account
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <div>
                  <CardTitle>Privacy</CardTitle>
                  <CardDescription>Control your data privacy</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 hover:border-purple-300 transition">
                <div>
                  <span className="text-sm font-medium text-gray-900 flex items-center">
                    Activity Tracking
                    <Tooltip text="Allow the system to collect anonymous usage analytics to improve your experience." />
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">Track usage analytics</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 hover:border-purple-300 transition">
                <div>
                  <span className="text-sm font-medium text-gray-900 flex items-center">
                    Marketing Emails
                    <Tooltip text="Receive promotional updates, new features, and product announcements." />
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">Receive product updates</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
              </div>
              <div className="pt-4 border-t">
                <button className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  Download My Data
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </TooltipPrimitive.Provider>
  );
}

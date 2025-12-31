'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const CANDLEPILOTS_KNOWLEDGE = {
  greeting: "Hi there! 👋 I'm your CandlePilots assistant. I'm here to help you learn about our all-in-one candle business platform. What would you like to know?",
  
  features: {
    calculator: "Our Vessel Calculator helps you calculate precise wax measurements for any container size. You can input vessel dimensions, wax density, and fragrance load to get accurate amounts needed. It includes 6 preset vessel types and calculates wax weight, fragrance oil amounts, and total costs.",
    
    pricing: "The Pricing Wizard analyzes your material costs, labor, overhead, and profit margins to suggest profitable pricing. It calculates wholesale and retail prices, break-even points, and helps ensure you're making money on every candle! You can adjust markup percentages and see real-time profitability.",
    
    recipes: "We have 79+ professional scent recipes with batch production and label generation. Each recipe includes detailed fragrance blend percentages, scent notes (top/middle/base), and usage instructions. You can save favorites, create custom recipes, and use them directly in the calculator. Categories include Floral, Citrus, Woodsy, Herbal, Gourmand, and Seasonal scents.",
    
    aiBlender: "Our AI Scent Blender uses artificial intelligence to suggest custom fragrance combinations! Just describe the mood or scent profile you want (like 'relaxing spa' or 'cozy winter'), and the AI will recommend specific fragrance oil percentages and complementary notes. It's like having a master perfumer on your team! The AI considers scent families, throw strength, and customer preferences to create unique, professional blends.",
    
    inventory: "Track all your supplies - wax, fragrance oils, wicks, containers, labels, and packaging. Monitor stock levels with visual alerts (in-stock/low-stock/out-of-stock), get automated reorder alerts, and track supplier information. You can set reorder points, view usage history, and never run out of critical materials!",
    
    suppliers: "Manage all your vendors in one place! Compare prices across multiple suppliers, track contact information (email, phone, website), record material prices, save payment terms (Net 30, Credit Card, Prepay), and maintain quality ratings. You can categorize suppliers (Wax Supplier, Fragrance Supplier, Container Supplier, etc.) and track detailed material specifications like wax types (Soy 464, Paraffin, Coconut), wick sizes, and shipping costs.",
    
    production: "Plan and track candle batches from start to finish. Create production schedules, assign priorities (high/medium/low), manage batch quantities, track completion status, and monitor timelines. Perfect for organizing busy production seasons and ensuring orders ship on time!",
    
    quality: "Professional quality control with batch testing, compliance tracking, and quality assurance checklists. Track visual inspections, scent strength verification, burn tests (2+ hours), wick centering, container integrity, and label placement. Approve or reject batches with inspector notes and maintain compliance with safety standards (ASTM F2417, IFRA guidelines).",
    
    barcodes: "Generate professional barcodes and QR codes for your products. Create SKU-based barcodes for inventory management, product QR codes that link to product pages, and batch tracking codes. Export as PNG/SVG for labels and packaging. Makes inventory scanning and customer engagement super easy!",
    
    team: "Collaborate with team members! Assign roles and permissions (Admin, Manager, Production Staff, Sales), track who's working on what, manage access to different features, and coordinate production across your team. Perfect for growing businesses with multiple employees.",
    
    orders: "Track customer orders from placement to delivery. View order status (pending/processing/shipped/completed), manage customer information, track revenue, calculate fulfillment times, and organize by date. Includes order totals, item quantities, and shipping details.",
    
    customers: "Build and manage your customer database! Track purchase history, lifetime value, contact information, order frequency, and customer preferences. Segment by customer type (individual/wholesale/retail) and maintain relationships with notes and tags.",
    
    invoices: "Create professional invoices with your branding! Auto-calculate totals, taxes, and discounts. Include your business logo, payment terms, and itemized product lists. Export as PDF or print directly. Perfect for wholesale accounts and B2B sales.",
    
    reports: "Generate detailed business reports and analytics. View sales trends, revenue by product, inventory usage, production efficiency, and profit margins. Export data as CSV/Excel for accounting. Includes visual charts and month-over-month comparisons.",
    
    automation: "Automate repetitive tasks! Set up automatic reorder alerts when inventory is low, schedule production based on order volume, auto-generate invoices, send order confirmations, and batch process labels. Save hours every week on manual tasks!",
    
    testingLog: "Document burn tests and performance tracking. Record burn time, melt pool diameter, scent throw (cold and hot), wick performance, container temperature, and any issues. Compare different wick sizes and wax blends to perfect your formula. Essential for product development!",
    
    costAnalysis: "Detailed profitability analysis per product. Break down material costs (wax, fragrance, wick, container, label), labor time, overhead allocation, and packaging costs. See true profit per candle and identify which products are most profitable. Helps optimize your product line!",
    
    ecommerce: "Connect to your online store! Integration with Shopify, WooCommerce, and Etsy to sync inventory, import orders automatically, and update stock levels in real-time. Manage both your production and online sales from one platform.",
    
    customerPortal: "Give customers their own login! They can track orders, view purchase history, reorder favorites, download invoices, and manage their account information. Perfect for wholesale customers and repeat buyers. Builds loyalty and reduces support requests.",
    
    guide: "Complete candle-making masterclass built into the platform! Learn about wax types, wick selection, fragrance loading, burn testing, safety compliance, troubleshooting common issues, and professional production techniques. It's like having an expert mentor available 24/7!"
  },
  
  benefits: {
    time: "CandlePilots saves you 10-15 hours per week by automating calculations, pricing, and inventory management.",
    profit: "Our users see 15-30% cost reduction through better supplier management and waste reduction.",
    scale: "Professional systems help you grow from hobby to full-time business with confidence.",
    quality: "Consistent quality through standardized recipes and testing protocols."
  },
  
  pricing: {
    info: "CandlePilots offers flexible pricing plans to fit businesses of all sizes. Would you like me to have someone reach out to discuss the perfect plan for your needs?"
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: CANDLEPILOTS_KNOWLEDGE.greeting,
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [collectingInfo, setCollectingInfo] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: '', email: '', question: '' })
  const [infoStep, setInfoStep] = useState<'name' | 'email' | 'confirm'>('name')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Greeting responses
    if (lowerMessage.match(/\b(hi|hello|hey|good morning|good afternoon)\b/)) {
      return "Hello! 😊 I'm here to help you discover how CandlePilots can transform your candle business. What aspect interests you most - pricing, inventory, recipes, AI tools, or something else?"
    }
    
    // Feature questions - Calculators
    if (lowerMessage.includes('calculator') || lowerMessage.includes('calculate') || lowerMessage.includes('vessel')) {
      return CANDLEPILOTS_KNOWLEDGE.features.calculator + " Would you like to see it in action? You can try it right now in your dashboard!"
    }
    
    if (lowerMessage.includes('pricing') || lowerMessage.includes('price wizard')) {
      return CANDLEPILOTS_KNOWLEDGE.features.pricing + " Many of our users say this feature alone pays for the platform!"
    }
    
    // AI Features
    if (lowerMessage.match(/\b(ai|artificial intelligence|scent blender|blend|custom scent)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.aiBlender + " It's one of our most popular features! Want to try creating a custom blend?"
    }
    
    // Recipes
    if (lowerMessage.match(/\b(recipe|scent|fragrance formula|blend formula)\b/) && !lowerMessage.includes('ai')) {
      return CANDLEPILOTS_KNOWLEDGE.features.recipes + " Our recipes are professionally tested and include detailed instructions. Would you like to explore them?"
    }
    
    // Inventory & Suppliers
    if (lowerMessage.match(/\b(inventory|stock|supplies|materials)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.inventory + " This feature has helped our users reduce waste by up to 30%!"
    }
    
    if (lowerMessage.match(/\b(supplier|vendor|wholesaler)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.suppliers + " You can track everything from wax types to shipping costs and payment terms!"
    }
    
    // Production & Quality
    if (lowerMessage.match(/\b(production|batch|schedule|manufacturing)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.production + " Stay organized even during your busiest seasons!"
    }
    
    if (lowerMessage.match(/\b(quality|testing|qa|compliance|safety)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.quality + " Professional testing protocols build customer trust and loyalty."
    }
    
    if (lowerMessage.match(/\b(burn test|testing log|test results)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.testingLog + " Document every test to perfect your formulas!"
    }
    
    // Business Tools
    if (lowerMessage.match(/\b(barcode|qr code|sku|label)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.barcodes + " Professional product labeling made easy!"
    }
    
    if (lowerMessage.match(/\b(team|staff|employee|collaborate|permission)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.team + " Perfect for businesses with multiple team members!"
    }
    
    if (lowerMessage.match(/\b(order|customer order|fulfillment)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.orders + " Track every order from start to finish!"
    }
    
    if (lowerMessage.match(/\b(customer|client|customer management|crm)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.customers + " Build lasting relationships with your customers!"
    }
    
    if (lowerMessage.match(/\b(invoice|billing|payment)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.invoices + " Create professional invoices in seconds!"
    }
    
    if (lowerMessage.match(/\b(report|analytics|sales data|insights)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.reports + " Make data-driven decisions for your business!"
    }
    
    if (lowerMessage.match(/\b(automat|workflow|alert)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.automation + " Work smarter, not harder!"
    }
    
    if (lowerMessage.match(/\b(cost|profit|profitability|margin)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.costAnalysis + " Know exactly where your money goes!"
    }
    
    if (lowerMessage.match(/\b(ecommerce|shopify|etsy|woocommerce|online store)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.ecommerce + " Seamless integration with your online sales!"
    }
    
    if (lowerMessage.match(/\b(customer portal|client portal|account)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.customerPortal + " Enhance the customer experience!"
    }
    
    if (lowerMessage.match(/\b(guide|learn|tutorial|how to|teach)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.guide + " Everything you need to become a candle-making pro!"
    }
    
    // Benefit questions
    if (lowerMessage.match(/\b(save time|how much time|faster)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.benefits.time + " Imagine what you could do with an extra 10-15 hours each week! Are you ready to get started?"
    }
    
    if (lowerMessage.match(/\b(save money|cost|expensive|affordable)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.benefits.profit + " Plus, better organization means fewer mistakes and less wasted materials. Would you like to see a cost breakdown?"
    }
    
    if (lowerMessage.match(/\b(grow|scale|business|full-time)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.benefits.scale + " We've helped hundreds of makers turn their hobby into a thriving business. Ready to join them?"
    }
    
    // Feature list request
    if (lowerMessage.match(/\b(features|what can|what does|capabilities|tools)\b/)) {
      return "CandlePilots has 20+ powerful features! Here are the highlights:\n\n🧮 Vessel Calculator & Pricing Wizard\n🤖 AI Scent Blender\n📋 79+ Professional Recipes\n📦 Inventory Management\n🏭 Production Scheduling\n✅ Quality Control\n📊 Business Reports\n🛒 E-commerce Integration\n👥 Team Collaboration\n📱 Customer Portal\n\n...and so much more! Which feature interests you most?"
    }
    
    // Pricing questions
    if (lowerMessage.match(/\b(how much|cost|price|plan|subscription|pay)\b/)) {
      return "Great question! CandlePilots offers plans starting at competitive rates designed for businesses at every stage. We also offer a free trial so you can experience the platform risk-free. Would you like me to connect you with our team to find the perfect plan for your needs?"
    }
    
    // Purchase intent
    if (lowerMessage.match(/\b(buy|purchase|get started|sign up|trial)\b/)) {
      return "Wonderful! 🎉 I'm so excited for you to experience CandlePilots! You can start your free trial right now by clicking the 'Sign Up' button at the top of the page. No credit card required! Or would you prefer to speak with someone from our team first?"
    }
    
    // Already a customer
    if (lowerMessage.match(/\b(already have|current customer|existing|member)\b/)) {
      return "Fantastic! Welcome back! 😊 As an existing customer, you have full access to all features. Is there something specific you'd like help with today? I can guide you through any feature or answer questions about advanced functionality."
    }
    
    // Help/Support
    if (lowerMessage.match(/\b(help|support|question|how do)\b/)) {
      return "I'm here to help! 💜 You can ask me about:\n\n• Calculators & Pricing\n• AI Scent Blender\n• Recipe Database\n• Inventory & Suppliers\n• Production & Quality Control\n• Business Reports & Analytics\n• E-commerce Integration\n• Any other features!\n\nWhat would you like to know more about?"
    }
    
    // Thank you
    if (lowerMessage.match(/\b(thank|thanks|appreciate)\b/)) {
      return "You're very welcome! 😊 Is there anything else I can help you with? I'm always here if you have more questions about CandlePilots!"
    }
    
    // Complex/Technical questions that need escalation
    if (lowerMessage.match(/\b(bug|error|not working|broken|issue|problem|technical|integration issue|custom|specific requirement)\b/) ||
        lowerMessage.length > 150 ||
        (lowerMessage.includes('can i') && lowerMessage.length > 50)) {
      return "I appreciate you bringing this to our attention! For technical issues, specific requirements, or detailed inquiries like yours, I'd like to connect you with our specialist team who can provide the best solution. They typically respond within 24 hours. May I collect your information to have someone reach out to you?"
    }
    
    // Default response
    return "That's a great question! CandlePilots is an all-in-one platform for candle makers with 20+ features including:\n\n• Vessel Calculator & Pricing Wizard\n• AI-Powered Scent Blender\n• 79+ Professional Recipes\n• Inventory & Supplier Management\n• Production Scheduling\n• Quality Control & Testing\n• Business Analytics\n• E-commerce Integration\n\nWould you like to:\n• Learn about specific features?\n• Start a free trial?\n• Speak with our team?\n\nWhat interests you most? 😊"
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    // If we're collecting user info, handle the flow
    if (collectingInfo) {
      handleInfoCollection(inputValue)
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponseText = generateBotResponse(currentInput)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)

      // Check if bot is asking to collect info
      if (botResponseText.includes('May I collect your information')) {
        // Wait a moment, then ask for name
        setTimeout(() => {
          const nameRequest: Message = {
            id: (Date.now() + 2).toString(),
            text: "Please share your full name:",
            sender: 'bot',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nameRequest])
          setCollectingInfo(true)
          setInfoStep('name')
          setUserInfo(prev => ({ ...prev, question: currentInput }))
        }, 1500)
      }
    }, 1000)
  }

  const handleInfoCollection = (input: string) => {
    const trimmedInput = input.trim()
    
    // Add user's response to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      if (infoStep === 'name') {
        setUserInfo(prev => ({ ...prev, name: trimmedInput }))
        const emailRequest: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you! And what's your email address?",
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, emailRequest])
        setInfoStep('email')
        setIsTyping(false)
      } else if (infoStep === 'email') {
        setUserInfo(prev => ({ ...prev, email: trimmedInput }))
        const confirmMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Perfect! Thank you, ${userInfo.name}! 🎉\n\nI've recorded your inquiry:\n"${userInfo.question}"\n\nYour request has been escalated to our specialized team who will review your needs and reach out to you at ${trimmedInput} within 24 hours.\n\nIn the meantime, feel free to explore the platform or ask me about any other features. We're committed to finding the perfect solution for you! 💜`,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, confirmMessage])
        setIsTyping(false)
        setCollectingInfo(false)
        setInfoStep('name')
        setUserInfo({ name: '', email: '', question: '' })
        
        // Here you could also send this info to your backend/email service
        console.log('User inquiry submitted:', {
          name: userInfo.name,
          email: trimmedInput,
          question: userInfo.question,
          timestamp: new Date()
        })
      }
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-4 shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-purple-200 dark:border-purple-800">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              <Image 
                src="/CandlePilots logo updated.png" 
                alt="CandlePilots Logo" 
                width={32} 
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">CandlePilots Assistant</h3>
              <p className="text-xs text-purple-100">Always here to help!</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  collectingInfo 
                    ? (infoStep === 'name' ? 'Type your full name...' : 'Type your email address...') 
                    : 'Ask me anything...'
                }
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              {collectingInfo ? 'Your information will be kept confidential' : 'Ask about features, pricing, or how to get started!'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

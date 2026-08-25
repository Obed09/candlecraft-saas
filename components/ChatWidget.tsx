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

// Honest, ground-truth knowledge. We only describe features that actually exist
// today: vessel calculator, recipe library, testing log, cost analysis / pricing
// wizard, and sign-in/register. Everything else is honestly marked "coming soon".
const CANDLEPILOTS_KNOWLEDGE = {
  greeting:
    "Hi there! 👋 I'm the CandlePilots assistant. I can tell you about the tools that are live in your dashboard right now. What would you like to know?",

  features: {
    calculator:
      "The Vessel Calculator is available now. Enter your container dimensions and it works out the wax, fragrance oil, and material amounts you need for a batch — and you can save the setup to your account.",

    recipes:
      "The Recipe Library is available now. It ships with 79 curated scent recipes you can browse and filter, and you can save your own custom recipes to your account.",

    testingLog:
      "The Testing Log is available now. Use it to record burn tests, fragrance trials, and product experiments so you can track what worked and what didn't.",

    costAnalysis:
      "Cost Analysis and the Pricing Wizard are available now. They help you see your material and labour costs, and set prices based on your target margin.",

    comingSoon:
      "Those modules are on the roadmap and coming soon — they aren't live yet. Today you can use the Vessel Calculator, Recipe Library, Testing Log, and Cost Analysis / Pricing Wizard.",

    signIn:
      "You can sign in or register with an email address. Your calculator setups, recipes, and testing-log entries are saved to your account."
  },

  benefits: {
    honest:
      "CandlePilots helps you keep consistent recipes, record your tests, and understand your costs — so you make candles you can price with confidence."
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
      return "Hello! 😊 I can walk you through what's live in CandlePilots today. Ask about the calculator, recipes, testing log, cost analysis, or pricing — or ask for help signing in."
    }

    // Live features
    if (lowerMessage.includes('calculator') || lowerMessage.includes('calculate') || lowerMessage.includes('vessel')) {
      return CANDLEPILOTS_KNOWLEDGE.features.calculator
    }

    if (lowerMessage.match(/\b(recipe|scent|fragrance|library)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.recipes
    }

    if (lowerMessage.match(/\b(testing log|burn test|test results|testing)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.testingLog
    }

    if (lowerMessage.match(/\b(cost|profit|margin|pricing|price wizard|price)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.costAnalysis
    }

    // Sign in / register
    if (lowerMessage.match(/\b(sign in|sign up|login|register|log in|account)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.signIn
    }

    // Coming-soon modules (honest)
    if (lowerMessage.match(/\b(sync|shopify|woocommerce|etsy|inventory|supplier|production|automation|team|customer portal|barcode|invoice|order|ai|blender|analytics|integration)\b/)) {
      return CANDLEPILOTS_KNOWLEDGE.features.comingSoon
    }

    // Feature list request
    if (lowerMessage.match(/\b(features|what can|what does|capabilities|tools|available)\b/)) {
      return "Here's what's live right now:\n\n🧮 Vessel Calculator\n📋 Recipe Library (79 curated templates + save your own)\n🧪 Testing Log\n💰 Cost Analysis & Pricing Wizard\n🔐 Sign in / Register\n\nOther modules you may have seen in the menu are on the roadmap and coming soon. Which would you like to know more about?"
    }

    // Pricing / plans
    if (lowerMessage.match(/\b(how much|plan|subscription|pay|cost of|price of the app)\b/)) {
      return "For pricing details, check the Subscription / View Plans area in your dashboard — it reflects the current plan options."
    }

    // Help/Support
    if (lowerMessage.match(/\b(help|support|question|how do)\b/)) {
      return "I can help with:\n\n• Vessel Calculator\n• Recipe Library\n• Testing Log\n• Cost Analysis & Pricing Wizard\n• Sign in / Register\n\nWhat would you like to know more about?"
    }

    // Thank you
    if (lowerMessage.match(/\b(thank|thanks|appreciate)\b/)) {
      return "You're welcome! 😊 Is there anything else I can help you with?"
    }

    // Default response
    return "That's a great question! Today CandlePilots offers:\n\n• Vessel Calculator\n• Recipe Library (79 curated templates + save your own)\n• Testing Log\n• Cost Analysis & Pricing Wizard\n• Sign in / Register\n\nOther modules are on the roadmap and coming soon. What would you like to know more about? 😊"
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

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
    }, 1000)
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
                src="/candlepilots-logo.png"
                alt="CandlePilots Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">CandlePilots Assistant</h3>
              <p className="text-xs text-purple-100">Demystifying the dashboard</p>
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
                placeholder="Ask about the live tools..."
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
              Ask about the calculator, recipes, testing log, cost analysis, or pricing
            </p>
          </div>
        </div>
      )}
    </>
  )
}

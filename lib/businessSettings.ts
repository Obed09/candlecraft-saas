// Business Settings Management with localStorage

export interface BusinessSettings {
  businessName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  state: string
  zipCode: string
  logoUrl: string | null
  // Payment Gateway Settings
  paymentGateway: 'stripe' | 'paypal' | 'square' | 'bank' | 'none'
  paymentApiKey: string
  paymentSecretKey: string
  paymentMerchantId: string
  paymentWebhookUrl: string
  paymentTestMode: boolean
  // E-commerce Integration Settings
  shopifyEnabled: boolean
  shopifyStoreName: string
  shopifyApiKey: string
  shopifyAccessToken: string
  etsyEnabled: boolean
  etsyShopName: string
  etsyApiKey: string
  etsySharedSecret: string
  onlineStoreEnabled: boolean
  onlineStoreUrl: string
  // Production Automation Settings
  automationEnabled: boolean
  lowStockThreshold: number
  autoReorderEnabled: boolean
  autoProductionEnabled: boolean
  productionLeadTime: number
  emailNotifications: boolean
}

const DEFAULT_SETTINGS: BusinessSettings = {
  businessName: 'Limen Lakay',
  firstName: '',
  lastName: '',
  email: 'hello@limenlakay.com',
  phone: '+1-561-555-0238',
  website: 'www.limenlakay.com',
  address: '',
  city: 'Palm Beach',
  state: 'FL',
  zipCode: '',
  logoUrl: null,
  // Payment Gateway Defaults
  paymentGateway: 'none',
  paymentApiKey: '',
  paymentSecretKey: '',
  paymentMerchantId: '',
  paymentWebhookUrl: '',
  paymentTestMode: true,
  // E-commerce Integration Defaults
  shopifyEnabled: false,
  shopifyStoreName: '',
  shopifyApiKey: '',
  shopifyAccessToken: '',
  etsyEnabled: false,
  etsyShopName: '',
  etsyApiKey: '',
  etsySharedSecret: '',
  onlineStoreEnabled: false,
  onlineStoreUrl: '',
  // Production Automation Defaults
  automationEnabled: true,
  lowStockThreshold: 20,
  autoReorderEnabled: false,
  autoProductionEnabled: true,
  productionLeadTime: 7,
  emailNotifications: true
}

const STORAGE_KEY = 'candleflow_business_settings'

export function getBusinessSettings(): BusinessSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Error loading business settings:', error)
  }
  
  return DEFAULT_SETTINGS
}

export function saveBusinessSettings(settings: Partial<BusinessSettings>): void {
  if (typeof window === 'undefined') return
  
  try {
    const current = getBusinessSettings()
    const updated = { ...current, ...settings }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    
    // Dispatch custom event so other components can react
    window.dispatchEvent(new CustomEvent('businessSettingsUpdated', { detail: updated }))
  } catch (error) {
    console.error('Error saving business settings:', error)
  }
}

export function resetBusinessSettings(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('businessSettingsUpdated', { detail: DEFAULT_SETTINGS }))
  } catch (error) {
    console.error('Error resetting business settings:', error)
  }
}

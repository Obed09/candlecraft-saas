'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, Plus, RotateCcw, Copy, Sparkles, Package, Tag, HelpCircle } from 'lucide-react'
import { getBusinessSettings, type BusinessSettings } from '@/lib/businessSettings'
import * as Tooltip from '@radix-ui/react-tooltip'

interface Recipe {
  id: number
  name: string
  category?: string
  profile?: string
  purpose?: string
  audience?: string
  occasion?: string
  ingredients: { [key: string]: number }
  isUserRecipe?: boolean
}

interface Vessel {
  id: number
  name: string
  diameter: number
  height: number
  unit: string
  volumeOz: number
}

interface BatchMaterials {
  vessel: Vessel
  volumeOz: number
  waxGrams: number
  waxLbs: number
  fragranceGrams: number
  fragranceLbs: number
  cementGrams: number
  cementLbs: number
  wicksNeeded: number
  singleUnitCost: number
  batchCost: number
}

// 79 Pre-Made Professional Recipes
const initialRecipes: Recipe[] = [
  // FLORAL SCENTS (12 recipes)
  { id: 1, name: 'Lavender Dreams', profile: 'Floral', purpose: 'Sleep/Calming', audience: 'Unisex', ingredients: { 'Lavender': 60, 'Vanilla': 25, 'Chamomile': 15 } },
  { id: 2, name: 'Rose Garden', profile: 'Floral', audience: 'Women\'s', ingredients: { 'Rose': 70, 'Peony': 20, 'Jasmine': 10 } },
  { id: 3, name: 'Jasmine Nights', profile: 'Floral', purpose: 'Meditation', audience: 'Unisex', ingredients: { 'Jasmine': 65, 'White Tea': 25, 'Vanilla': 10 } },
  { id: 4, name: 'Peony Blush', profile: 'Floral', audience: 'Women\'s', ingredients: { 'Peony': 60, 'Rose': 30, 'Citrus': 10 } },
  { id: 5, name: 'Hibiscus Bloom', profile: 'Floral', purpose: 'Uplifting', ingredients: { 'Hibiscus': 55, 'Tropical Fruits': 30, 'Vanilla': 15 } },
  { id: 6, name: 'Lily of the Valley', profile: 'Floral', audience: 'Women\'s', ingredients: { 'Lily': 70, 'Green Leaves': 20, 'Musk': 10 } },
  { id: 7, name: 'Magnolia Spring', profile: 'Floral', purpose: 'Uplifting', ingredients: { 'Magnolia': 60, 'Lemon': 25, 'White Musk': 15 } },
  { id: 8, name: 'Cherry Blossom', profile: 'Floral', audience: 'Women\'s', ingredients: { 'Cherry Blossom': 65, 'Vanilla': 25, 'Sandalwood': 10 } },
  { id: 9, name: 'Gardenia Midnight', profile: 'Floral', purpose: 'Self-Care', ingredients: { 'Gardenia': 70, 'Tuberose': 20, 'Amber': 10 } },
  { id: 10, name: 'Violet Mist', profile: 'Floral', purpose: 'Meditation', ingredients: { 'Violet': 60, 'Iris': 25, 'Powder': 15 } },
  { id: 11, name: 'Wild Orchid', profile: 'Floral', audience: 'Women\'s', ingredients: { 'Orchid': 65, 'Ylang Ylang': 25, 'Vanilla': 10 } },
  { id: 12, name: 'English Garden', profile: 'Floral', purpose: 'Self-Care', ingredients: { 'Rose': 40, 'Lavender': 30, 'Mint': 30 } },

  // CITRUS SCENTS (10 recipes)
  { id: 13, name: 'Lemon Zest', profile: 'Citrus', purpose: 'Focus', audience: 'Unisex', ingredients: { 'Lemon': 70, 'Verbena': 20, 'Basil': 10 } },
  { id: 14, name: 'Orange Sunrise', profile: 'Citrus', purpose: 'Uplifting', ingredients: { 'Sweet Orange': 60, 'Grapefruit': 25, 'Vanilla': 15 } },
  { id: 15, name: 'Lime & Coconut', profile: 'Citrus', purpose: 'Uplifting', ingredients: { 'Lime': 50, 'Coconut': 35, 'Vanilla': 15 } },
  { id: 16, name: 'Grapefruit Mint', profile: 'Citrus', purpose: 'Focus', audience: 'Unisex', ingredients: { 'Grapefruit': 60, 'Mint': 30, 'Eucalyptus': 10 } },
  { id: 17, name: 'Mandarin Spice', profile: 'Citrus', ingredients: { 'Mandarin': 55, 'Cinnamon': 25, 'Clove': 20 } },
  { id: 18, name: 'Bergamot & Sage', profile: 'Citrus', purpose: 'Meditation', audience: 'Unisex', ingredients: { 'Bergamot': 60, 'Sage': 30, 'Cedarwood': 10 } },
  { id: 19, name: 'Blood Orange Amber', profile: 'Citrus', ingredients: { 'Blood Orange': 55, 'Amber': 30, 'Vanilla': 15 } },
  { id: 20, name: 'Lemon Lavender', profile: 'Citrus', purpose: 'Sleep/Calming', audience: 'Unisex', ingredients: { 'Lemon': 45, 'Lavender': 45, 'Vanilla': 10 } },
  { id: 21, name: 'Citrus Medley', profile: 'Citrus', purpose: 'Uplifting', ingredients: { 'Lemon': 30, 'Orange': 30, 'Grapefruit': 25, 'Lime': 15 } },
  { id: 22, name: 'Yuzu & Hinoki', profile: 'Citrus', purpose: 'Meditation', audience: 'Unisex', ingredients: { 'Yuzu': 60, 'Hinoki': 30, 'White Tea': 10 } },

  // FRUITY SCENTS (8 recipes)
  { id: 23, name: 'Strawberry Champagne', profile: 'Fruity', ingredients: { 'Strawberry': 60, 'Champagne': 25, 'Peach': 15 } },
  { id: 24, name: 'Mango Tango', profile: 'Fruity', purpose: 'Uplifting', ingredients: { 'Mango': 65, 'Pineapple': 25, 'Coconut': 10 } },
  { id: 25, name: 'Berry Bliss', profile: 'Fruity', ingredients: { 'Blueberry': 40, 'Raspberry': 35, 'Blackberry': 25 } },
  { id: 26, name: 'Peach Bellini', profile: 'Fruity', ingredients: { 'Peach': 60, 'Prosecco': 25, 'Vanilla': 15 } },
  { id: 27, name: 'Watermelon Mint', profile: 'Fruity', purpose: 'Uplifting', ingredients: { 'Watermelon': 70, 'Mint': 20, 'Lime': 10 } },
  { id: 28, name: 'Apple Orchard', profile: 'Fruity', ingredients: { 'Green Apple': 50, 'Red Apple': 30, 'Cinnamon': 20 } },
  { id: 29, name: 'Pomegranate Noir', profile: 'Fruity', ingredients: { 'Pomegranate': 60, 'Black Currant': 25, 'Plum': 15 } },
  { id: 30, name: 'Tropical Paradise', profile: 'Fruity', purpose: 'Uplifting', ingredients: { 'Pineapple': 40, 'Mango': 30, 'Papaya': 20, 'Coconut': 10 } },

  // GOURMAND SCENTS (12 recipes)
  { id: 31, name: 'Vanilla Bean', profile: 'Gourmand', purpose: 'Self-Care', audience: 'Unisex', ingredients: { 'Madagascar Vanilla': 80, 'Tonka Bean': 15, 'Cream': 5 } },
  { id: 32, name: 'Coffee House', profile: 'Gourmand', purpose: 'Focus', audience: 'Unisex', ingredients: { 'Espresso': 60, 'Vanilla': 25, 'Hazelnut': 15 } },
  { id: 33, name: 'Cinnamon Roll', profile: 'Gourmand', ingredients: { 'Cinnamon': 45, 'Vanilla Frosting': 35, 'Brown Sugar': 20 } },
  { id: 34, name: 'Chocolate Truffle', profile: 'Gourmand', ingredients: { 'Dark Chocolate': 60, 'Espresso': 25, 'Cream': 15 } },
  { id: 35, name: 'Honey Almond', profile: 'Gourmand', purpose: 'Self-Care', ingredients: { 'Honey': 50, 'Almond': 35, 'Vanilla': 15 } },
  { id: 36, name: 'Pumpkin Spice', profile: 'Gourmand', ingredients: { 'Pumpkin': 45, 'Cinnamon': 25, 'Nutmeg': 15, 'Vanilla': 15 } },
  { id: 37, name: 'Caramel Macchiato', profile: 'Gourmand', ingredients: { 'Caramel': 50, 'Coffee': 30, 'Vanilla': 20 } },
  { id: 38, name: 'Maple Bourbon', profile: 'Gourmand', audience: 'Men\'s', ingredients: { 'Maple Syrup': 50, 'Bourbon': 30, 'Oak': 20 } },
  { id: 39, name: 'Cookie Dough', profile: 'Gourmand', ingredients: { 'Brown Sugar': 40, 'Vanilla': 30, 'Butter': 20, 'Chocolate': 10 } },
  { id: 40, name: 'Banana Bread', profile: 'Gourmand', ingredients: { 'Banana': 50, 'Cinnamon': 25, 'Walnut': 15, 'Vanilla': 10 } },
  { id: 41, name: 'Tiramisu', profile: 'Gourmand', ingredients: { 'Espresso': 45, 'Mascarpone': 30, 'Cocoa': 15, 'Rum': 10 } },
  { id: 42, name: 'Crème Brûlée', profile: 'Gourmand', ingredients: { 'Burnt Sugar': 50, 'Vanilla Custard': 40, 'Caramel': 10 } },

  // HERBAL/SPA SCENTS (10 recipes)
  { id: 43, name: 'Eucalyptus Mint', profile: 'Herbal', purpose: 'Focus', audience: 'Unisex', ingredients: { 'Eucalyptus': 60, 'Spearmint': 30, 'Peppermint': 10 } },
  { id: 44, name: 'Sage & Thyme', profile: 'Herbal', purpose: 'Meditation', ingredients: { 'Sage': 55, 'Thyme': 30, 'Rosemary': 15 } },
  { id: 45, name: 'Rosemary Lemon', profile: 'Herbal', purpose: 'Focus', ingredients: { 'Rosemary': 50, 'Lemon': 40, 'Eucalyptus': 10 } },
  { id: 46, name: 'Tea Tree & Lavender', profile: 'Herbal', purpose: 'Sleep/Calming', audience: 'Unisex', ingredients: { 'Tea Tree': 50, 'Lavender': 40, 'Eucalyptus': 10 } },
  { id: 47, name: 'Basil & Lime', profile: 'Herbal', purpose: 'Uplifting', ingredients: { 'Basil': 55, 'Lime': 35, 'Mint': 10 } },
  { id: 48, name: 'Spa Retreat', profile: 'Clean/Spa', purpose: 'Self-Care', audience: 'Unisex', ingredients: { 'Eucalyptus': 40, 'Lavender': 35, 'Mint': 25 } },
  { id: 49, name: 'White Tea & Ginger', profile: 'Clean/Spa', purpose: 'Meditation', ingredients: { 'White Tea': 60, 'Ginger': 25, 'Lemongrass': 15 } },
  { id: 50, name: 'Lemongrass Verbena', profile: 'Herbal', purpose: 'Uplifting', ingredients: { 'Lemongrass': 55, 'Verbena': 35, 'Citrus': 10 } },
  { id: 51, name: 'Peppermint Bark', profile: 'Herbal', ingredients: { 'Peppermint': 60, 'Chocolate': 25, 'Vanilla': 15 } },
  { id: 52, name: 'Chamomile Honey', profile: 'Herbal', purpose: 'Sleep/Calming', ingredients: { 'Chamomile': 60, 'Honey': 30, 'Vanilla': 10 } },

  // SPICY/WARM SCENTS (8 recipes)
  { id: 53, name: 'Cinnamon Chai', profile: 'Spicy', ingredients: { 'Cinnamon': 40, 'Black Tea': 30, 'Cardamom': 15, 'Vanilla': 15 } },
  { id: 54, name: 'Ginger Spice', profile: 'Spicy', purpose: 'Uplifting', ingredients: { 'Ginger': 50, 'Cinnamon': 25, 'Clove': 15, 'Nutmeg': 10 } },
  { id: 55, name: 'Tobacco & Vanilla', profile: 'Spicy', audience: 'Men\'s', ingredients: { 'Tobacco': 55, 'Vanilla': 30, 'Tonka Bean': 15 } },
  { id: 56, name: 'Cardamom & Cream', profile: 'Spicy', ingredients: { 'Cardamom': 50, 'Vanilla Cream': 35, 'Honey': 15 } },
  { id: 57, name: 'Mulled Wine', profile: 'Spicy', ingredients: { 'Red Wine': 45, 'Orange': 25, 'Cinnamon': 15, 'Clove': 15 } },
  { id: 58, name: 'Clove & Amber', profile: 'Spicy', ingredients: { 'Clove': 50, 'Amber': 35, 'Vanilla': 15 } },
  { id: 59, name: 'Nutmeg & Fig', profile: 'Spicy', ingredients: { 'Nutmeg': 45, 'Fig': 40, 'Vanilla': 15 } },
  { id: 60, name: 'Black Pepper & Sage', profile: 'Spicy', audience: 'Men\'s', ingredients: { 'Black Pepper': 50, 'Sage': 35, 'Cedar': 15 } },

  // EARTHY/WOODSY SCENTS (10 recipes)
  { id: 61, name: 'Sandalwood & Amber', profile: 'Earthy', audience: 'Men\'s', ingredients: { 'Sandalwood': 60, 'Amber': 30, 'Vanilla': 10 } },
  { id: 62, name: 'Cedarwood Forest', profile: 'Earthy', purpose: 'Meditation', audience: 'Men\'s', ingredients: { 'Cedarwood': 65, 'Pine': 25, 'Oakmoss': 10 } },
  { id: 63, name: 'Patchouli & Vanilla', profile: 'Earthy', ingredients: { 'Patchouli': 55, 'Vanilla': 35, 'Amber': 10 } },
  { id: 64, name: 'Vetiver & Citrus', profile: 'Earthy', audience: 'Men\'s', ingredients: { 'Vetiver': 60, 'Bergamot': 25, 'Grapefruit': 15 } },
  { id: 65, name: 'Oakmoss & Suede', profile: 'Earthy', audience: 'Men\'s', ingredients: { 'Oakmoss': 50, 'Suede': 35, 'Musk': 15 } },
  { id: 66, name: 'Pine & Birch', profile: 'Earthy', ingredients: { 'Pine': 55, 'Birch': 30, 'Eucalyptus': 15 } },
  { id: 67, name: 'Teakwood & Tobacco', profile: 'Earthy', audience: 'Men\'s', ingredients: { 'Teakwood': 50, 'Tobacco': 35, 'Vanilla': 15 } },
  { id: 68, name: 'Driftwood', profile: 'Earthy', audience: 'Unisex', ingredients: { 'Driftwood': 60, 'Sea Salt': 25, 'Amber': 15 } },
  { id: 69, name: 'Mahogany & Leather', profile: 'Earthy', audience: 'Men\'s', ingredients: { 'Mahogany': 55, 'Leather': 30, 'Vanilla': 15 } },
  { id: 70, name: 'Fir Needle & Moss', profile: 'Earthy', ingredients: { 'Fir Needle': 60, 'Moss': 25, 'Pine': 15 } },

  // CLEAN/FRESH SCENTS (9 recipes)
  { id: 71, name: 'Fresh Linen', profile: 'Clean/Spa', audience: 'Unisex', ingredients: { 'Clean Cotton': 60, 'Lavender': 25, 'Lemon': 15 } },
  { id: 72, name: 'Ocean Breeze', profile: 'Clean/Spa', purpose: 'Uplifting', audience: 'Unisex', ingredients: { 'Sea Salt': 50, 'Ozone': 30, 'Jasmine': 20 } },
  { id: 73, name: 'Rain & Dew', profile: 'Clean/Spa', purpose: 'Meditation', ingredients: { 'Rain': 55, 'Green Leaves': 30, 'White Tea': 15 } },
  { id: 74, name: 'Cotton Clouds', profile: 'Clean/Spa', audience: 'Unisex', ingredients: { 'Cotton': 70, 'Vanilla': 20, 'Powder': 10 } },
  { id: 75, name: 'Sea Mist', profile: 'Clean/Spa', ingredients: { 'Sea Salt': 60, 'Driftwood': 25, 'Lavender': 15 } },
  { id: 76, name: 'Alpine Air', profile: 'Clean/Spa', purpose: 'Focus', ingredients: { 'Mountain Air': 60, 'Pine': 25, 'Eucalyptus': 15 } },
  { id: 77, name: 'Bamboo & Teak', profile: 'Clean/Spa', audience: 'Unisex', ingredients: { 'Bamboo': 55, 'Teak': 30, 'White Tea': 15 } },
  { id: 78, name: 'Cucumber Melon', profile: 'Clean/Spa', purpose: 'Uplifting', ingredients: { 'Cucumber': 55, 'Melon': 35, 'Green Tea': 10 } },
  { id: 79, name: 'Aloe & Water Lily', profile: 'Clean/Spa', purpose: 'Self-Care', ingredients: { 'Aloe': 50, 'Water Lily': 35, 'White Tea': 15 } },
]

export default function RecipesDatabase() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [scentFilter, setScentFilter] = useState('')
  const [audienceFilter, setAudienceFilter] = useState('')
  const [purposeFilter, setPurposeFilter] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [showNewRecipeModal, setShowNewRecipeModal] = useState(false)

  // Batch Production state
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [batchRecipe, setBatchRecipe] = useState<Recipe | null>(null)
  const [batchQuantity, setBatchQuantity] = useState(100)
  const [batchVesselIndex, setBatchVesselIndex] = useState(0)

  // Label Generator state
  const [showLabelModal, setShowLabelModal] = useState(false)
  const [labelRecipe, setLabelRecipe] = useState<Recipe | null>(null)
  const [labelVesselIndex, setLabelVesselIndex] = useState(0)
  const [labelTemplate, setLabelTemplate] = useState<'modern' | 'vintage' | 'minimalist' | 'luxury'>('modern')
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(getBusinessSettings())
  const [labelBurnTime] = useState('40-50 hours')
  const [labelBatchSize, setLabelBatchSize] = useState(1)
  const [labelBatchCode] = useState(`LK-${Date.now().toString().slice(-4)}`)

  // Listen for business settings updates
  useEffect(() => {
    const handleSettingsUpdate = () => {
      setBusinessSettings(getBusinessSettings())
    }
    window.addEventListener('businessSettingsUpdated', handleSettingsUpdate)
    return () => window.removeEventListener('businessSettingsUpdated', handleSettingsUpdate)
  }, [])

  // Default vessels (same as calculator)
  const vessels: Vessel[] = [
    { id: 100, name: "Large Shallow", diameter: 8.2, height: 2.36, unit: "in", volumeOz: 55.2 },
    { id: 101, name: "Medium Cylinder", diameter: 5.43, height: 2.16, unit: "in", volumeOz: 10.1 },
    { id: 102, name: "Small Ribbed", diameter: 2.7, height: 1.4, unit: "in", volumeOz: 2.8 },
    { id: 103, name: "Ribbed Jar Mold", diameter: 9.5, height: 8, unit: "cm", volumeOz: 7.5 },
    { id: 104, name: "Flower Shell", diameter: 3.5, height: 4.8, unit: "cm", volumeOz: 1.5 },
    { id: 105, name: "Bowl Vessel", diameter: 3.25, height: 2.125, unit: "in", volumeOz: 5.8 }
  ]

  // Material prices
  const materialPrices = {
    waxPricePerLb: 8.50,
    fragrancePricePerLb: 40.00,
    cementPricePerLb: 0.50,
    wickPrice: 0.25,
    paintPrice: 0.75,
    fragranceLoad: 10, // 10% of wax weight
  }

  // Calculate batch materials
  const calculateBatchMaterials = (recipe: Recipe, quantity: number, vesselIndex: number): BatchMaterials => {
    const vessel = vessels[vesselIndex]
    const volumeOz = vessel.volumeOz
    const volumeMl = volumeOz * 29.5735
    const volumeCm3 = volumeMl
    const fillPercent = 0.8
    const waxVolume = volumeCm3 * fillPercent
    
    // Wax density: 0.9 g/cm³ for soy
    const waxGrams = waxVolume * 0.9
    const fragranceGrams = waxGrams * (materialPrices.fragranceLoad / 100)
    const cementGrams = volumeCm3 * 2.4 // cement density
    
    const waxLbs = (waxGrams / 453.592) * quantity
    const fragranceLbs = (fragranceGrams / 453.592) * quantity
    const cementLbs = (cementGrams / 453.592) * quantity
    const wicksNeeded = quantity
    
    const singleUnitCost = 
      (waxGrams / 453.592) * materialPrices.waxPricePerLb +
      (fragranceGrams / 453.592) * materialPrices.fragrancePricePerLb +
      (cementGrams / 453.592) * materialPrices.cementPricePerLb +
      materialPrices.wickPrice +
      materialPrices.paintPrice
    
    const batchCost = singleUnitCost * quantity

    return {
      vessel,
      volumeOz,
      waxGrams: waxGrams * quantity,
      waxLbs,
      fragranceGrams: fragranceGrams * quantity,
      fragranceLbs,
      cementGrams: cementGrams * quantity,
      cementLbs,
      wicksNeeded,
      singleUnitCost,
      batchCost
    }
  }

  const batchMaterials = batchRecipe ? calculateBatchMaterials(batchRecipe, batchQuantity, batchVesselIndex) : null

  // Open batch planner
  const openBatchPlanner = (recipe: Recipe) => {
    setBatchRecipe(recipe)
    setShowBatchModal(true)
  }

  // Open label generator
  const openLabelGenerator = (recipe: Recipe) => {
    setLabelRecipe(recipe)
    setShowLabelModal(true)
  }

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.keys(recipe.ingredients).some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = !categoryFilter || 
      (categoryFilter === 'Scent Profile' && recipe.profile) ||
      (categoryFilter === 'Purpose' && recipe.purpose) ||
      (categoryFilter === 'Target Audience' && recipe.audience)
    
    const matchesScent = !scentFilter || scentFilter === 'All' || recipe.profile === scentFilter
    const matchesAudience = !audienceFilter || audienceFilter === 'All' || recipe.audience === audienceFilter
    const matchesPurpose = !purposeFilter || purposeFilter === 'All' || recipe.purpose === purposeFilter

    return matchesSearch && matchesCategory && matchesScent && matchesAudience && matchesPurpose
  })

  // Create new recipe
  const createNewRecipe = () => {
    const newRecipe: Recipe = {
      id: Date.now(),
      name: 'New Recipe',
      profile: 'Floral',
      purpose: 'Self-Care',
      audience: 'Unisex',
      ingredients: {
        'Lavender': 50,
        'Vanilla': 30,
        'Chamomile': 20
      },
      isUserRecipe: true
    }
    setEditingRecipe(newRecipe)
    setShowNewRecipeModal(true)
  }

  // Save new recipe
  const saveNewRecipe = () => {
    if (editingRecipe) {
      setRecipes(prev => [editingRecipe, ...prev])
      setShowNewRecipeModal(false)
      setEditingRecipe(null)
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setCategoryFilter('')
    setScentFilter('')
    setAudienceFilter('')
    setPurposeFilter('')
  }

  // Copy recipe to clipboard
  const copyRecipe = (recipe: Recipe) => {
    const text = `${recipe.name}\n\nIngredients:\n${Object.entries(recipe.ingredients).map(([ing, pct]) => `${ing}: ${pct}%`).join('\n')}\n\n${recipe.profile ? `Profile: ${recipe.profile}\n` : ''}${recipe.purpose ? `Purpose: ${recipe.purpose}\n` : ''}${recipe.audience ? `Audience: ${recipe.audience}` : ''}`
    navigator.clipboard.writeText(text)
    alert('Recipe copied to clipboard!')
  }

  // Export recipe
  const exportRecipe = (recipe: Recipe) => {
    const data = JSON.stringify(recipe, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${recipe.name.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
  }

  return (
    <Tooltip.Provider delayDuration={200}>
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <Card className="mb-6 border-4 border-indigo-300 dark:border-indigo-700">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-100 dark:from-indigo-950 dark:to-purple-900">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
                <Sparkles className="h-8 w-8" />
                Searchable Recipe Database
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <HelpCircle className="w-6 h-6 text-indigo-500 hover:text-indigo-600 cursor-help" />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content 
                      side="right" 
                      className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-xl text-sm max-w-xs z-[9999]"
                      sideOffset={5}
                    >
                      Browse 79 professional scent recipes across all fragrance families. Search by profile, purpose, or audience. Create custom blends and calculate batch quantities.
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </CardTitle>
              <p className="text-indigo-700 dark:text-indigo-300 mt-2">
                79 professional scent recipes • Search, filter & customize • Create your own blends
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Search & Filters */}
          <div className="space-y-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Scent Type</Label>
                <select
                  value={scentFilter}
                  onChange={(e) => setScentFilter(e.target.value)}
                  className="w-full p-2 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All</option>
                  <option value="Floral">Floral</option>
                  <option value="Citrus">Citrus</option>
                  <option value="Fruity">Fruity</option>
                  <option value="Gourmand">Gourmand</option>
                  <option value="Herbal">Herbal</option>
                  <option value="Spicy">Spicy</option>
                  <option value="Clean/Spa">Clean/Spa</option>
                  <option value="Earthy">Earthy</option>
                </select>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Target Audience</Label>
                <select
                  value={audienceFilter}
                  onChange={(e) => setAudienceFilter(e.target.value)}
                  className="w-full p-2 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All</option>
                  <option value="Men's">Men&apos;s</option>
                  <option value="Women's">Women&apos;s</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Pet-Friendly">Pet-Friendly</option>
                </select>
              </div>

              <div>
                <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Purpose</Label>
                <select
                  value={purposeFilter}
                  onChange={(e) => setPurposeFilter(e.target.value)}
                  className="w-full p-2 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All</option>
                  <option value="Sleep/Calming">Sleep/Calming</option>
                  <option value="Meditation">Meditation</option>
                  <option value="Focus">Focus</option>
                  <option value="Uplifting">Uplifting</option>
                  <option value="Self-Care">Self-Care</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-between items-center mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg">
            <div className="text-indigo-900 dark:text-indigo-100 font-semibold">
              Showing <span className="text-indigo-600 dark:text-indigo-400 font-bold">{filteredRecipes.length}</span> of <span className="text-indigo-600 dark:text-indigo-400 font-bold">{recipes.length}</span> recipes
            </div>
            <button
              onClick={createNewRecipe}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create New Recipe
            </button>
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => {
                    setSelectedRecipe(recipe)
                    setEditingRecipe({ ...recipe })
                    setShowRecipeModal(true)
                  }}
                  className="bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Color Bar */}
                  <div className={`h-2 rounded-t-xl ${
                    recipe.profile === 'Floral' ? 'bg-pink-500' :
                    recipe.profile === 'Citrus' ? 'bg-yellow-500' :
                    recipe.profile === 'Fruity' ? 'bg-orange-500' :
                    recipe.profile === 'Gourmand' ? 'bg-amber-700' :
                    recipe.profile === 'Herbal' ? 'bg-green-500' :
                    recipe.profile === 'Spicy' ? 'bg-red-500' :
                    recipe.profile === 'Clean/Spa' ? 'bg-cyan-500' :
                    recipe.profile === 'Earthy' ? 'bg-emerald-700' :
                    'bg-indigo-500'
                  }`} />

                  <div className="p-6">
                    {/* User Badge */}
                    {recipe.isUserRecipe && (
                      <div className="mb-3">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                          ⭐ YOUR RECIPE
                        </span>
                      </div>
                    )}

                    {/* Recipe Name */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {recipe.name}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recipe.profile && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-semibold">
                          {recipe.profile}
                        </span>
                      )}
                      {recipe.purpose && (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-semibold">
                          {recipe.purpose}
                        </span>
                      )}
                      {recipe.audience && (
                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-semibold">
                          {recipe.audience}
                        </span>
                      )}
                    </div>

                    {/* Ingredients */}
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg space-y-2">
                      {Object.entries(recipe.ingredients).map(([ingredient, percent]) => (
                        <div key={ingredient} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{percent}%</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyRecipe(recipe)
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            alert('Load to Calculator: This will copy the recipe to the Vessel Calculator')
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1"
                        >
                          📥 Load
                        </button>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openBatchPlanner(recipe)
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1 w-full"
                      >
                        <Package className="h-4 w-4" />
                        Batch
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openLabelGenerator(recipe)
                          }}
                          className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1"
                        >
                          <Tag className="h-4 w-4" />
                          Label
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No Recipes Found</h3>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Recipe Modal */}
          {showRecipeModal && selectedRecipe && editingRecipe && (
            <div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowRecipeModal(false)
                setEditingRecipe(null)
              }}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
                  <Input
                    value={editingRecipe.name}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                    className="text-2xl font-bold mb-2 bg-white/20 border-white/40 text-white placeholder:text-white/70"
                    placeholder="Recipe name..."
                  />
                  {selectedRecipe.isUserRecipe && (
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ YOUR RECIPE
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setShowRecipeModal(false)
                      setEditingRecipe(null)
                    }}
                    className="absolute top-4 right-4 bg-white text-indigo-600 w-10 h-10 rounded-full font-bold text-xl hover:bg-gray-100 transition-all"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {editingRecipe.profile && (
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                        {editingRecipe.profile}
                      </span>
                    )}
                    {editingRecipe.purpose && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                        {editingRecipe.purpose}
                      </span>
                    )}
                    {editingRecipe.audience && (
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                        {editingRecipe.audience}
                      </span>
                    )}
                  </div>

                  {/* Ingredients */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Ingredients</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total: {Object.values(editingRecipe.ingredients).reduce((a, b) => a + b, 0)}%
                      </span>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(editingRecipe.ingredients).map(([ingredient, percent], idx) => (
                        <div key={idx} className="flex gap-2 items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <Input
                            value={ingredient}
                            onChange={(e) => {
                              const newIngredients = { ...editingRecipe.ingredients }
                              delete newIngredients[ingredient]
                              newIngredients[e.target.value] = percent
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                            }}
                            className="flex-1 text-sm"
                            placeholder="Ingredient name"
                          />
                          <Input
                            type="number"
                            value={percent}
                            onChange={(e) => {
                              const newIngredients = { ...editingRecipe.ingredients }
                              newIngredients[ingredient] = parseInt(e.target.value) || 0
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                            }}
                            className="w-20 text-sm font-bold text-indigo-600 dark:text-indigo-400"
                            min="0"
                            max="100"
                          />
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold">%</span>
                          <button
                            onClick={() => {
                              const newIngredients = { ...editingRecipe.ingredients }
                              delete newIngredients[ingredient]
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                            }}
                            className="text-red-500 hover:text-red-700 font-bold text-lg px-2"
                            title="Remove ingredient"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Ingredient */}
                    <button
                      onClick={() => {
                        const newIngredients = { ...editingRecipe.ingredients }
                        newIngredients['New Ingredient'] = 10
                        setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                      }}
                      className="mt-4 w-full py-2 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                    >
                      + Add Ingredient
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => copyRecipe(editingRecipe)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => exportRecipe(editingRecipe)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      💾 Export
                    </button>
                    <button
                      onClick={() => {
                        setRecipes(prev => prev.map(r => r.id === editingRecipe.id ? editingRecipe : r))
                        setShowRecipeModal(false)
                        setEditingRecipe(null)
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      💾 Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New Recipe Modal */}
          {showNewRecipeModal && editingRecipe && (
            <div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowNewRecipeModal(false)
                setEditingRecipe(null)
              }}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl relative">
                  <Input
                    value={editingRecipe.name}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                    className="text-2xl font-bold mb-2 bg-white/20 border-white/40 text-white placeholder:text-white/70"
                    placeholder="Recipe name..."
                  />
                  <span className="bg-green-300 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
                    ✨ NEW RECIPE
                  </span>
                  <button
                    onClick={() => {
                      setShowNewRecipeModal(false)
                      setEditingRecipe(null)
                    }}
                    className="absolute top-4 right-4 bg-white text-green-600 w-10 h-10 rounded-full font-bold text-xl hover:bg-gray-100 transition-all"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Category Selection */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Scent Profile</Label>
                      <select
                        value={editingRecipe.profile || ''}
                        onChange={(e) => setEditingRecipe({ ...editingRecipe, profile: e.target.value })}
                        className="w-full p-2 border-2 border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">None</option>
                        <option value="Floral">Floral</option>
                        <option value="Citrus">Citrus</option>
                        <option value="Fruity">Fruity</option>
                        <option value="Gourmand">Gourmand</option>
                        <option value="Herbal">Herbal</option>
                        <option value="Spicy">Spicy</option>
                        <option value="Clean/Spa">Clean/Spa</option>
                        <option value="Earthy">Earthy</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Purpose</Label>
                      <select
                        value={editingRecipe.purpose || ''}
                        onChange={(e) => setEditingRecipe({ ...editingRecipe, purpose: e.target.value || undefined })}
                        className="w-full p-2 border-2 border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">None</option>
                        <option value="Sleep/Calming">Sleep/Calming</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Focus">Focus</option>
                        <option value="Uplifting">Uplifting</option>
                        <option value="Self-Care">Self-Care</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Audience</Label>
                      <select
                        value={editingRecipe.audience || ''}
                        onChange={(e) => setEditingRecipe({ ...editingRecipe, audience: e.target.value })}
                        className="w-full p-2 border-2 border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">None</option>
                        <option value="Men's">Men&apos;s</option>
                        <option value="Women's">Women&apos;s</option>
                        <option value="Unisex">Unisex</option>
                        <option value="Pet-Friendly">Pet-Friendly</option>
                      </select>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Ingredients</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total: {Object.values(editingRecipe.ingredients).reduce((a, b) => a + b, 0)}%
                      </span>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(editingRecipe.ingredients).map(([ingredient, percent], idx) => (
                        <div key={idx} className="flex gap-2 items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <Input
                            value={ingredient}
                            onChange={(e) => {
                              const newIngredients = { ...editingRecipe.ingredients }
                              delete newIngredients[ingredient]
                              newIngredients[e.target.value] = percent
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                            }}
                            className="flex-1 text-sm"
                            placeholder="Ingredient name"
                          />
                          <Input
                            type="number"
                            value={percent}
                            onChange={(e) => {
                              const newIngredients = { ...editingRecipe.ingredients }
                              newIngredients[ingredient] = parseInt(e.target.value) || 0
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                            }}
                            className="w-20 text-sm font-bold text-green-600 dark:text-green-400"
                            min="0"
                            max="100"
                          />
                          <span className="text-green-600 dark:text-green-400 font-bold">%</span>
                          <button
                            onClick={() => {
                              const newIngredients = { ...editingRecipe.ingredients }
                              delete newIngredients[ingredient]
                              setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                            }}
                            className="text-red-500 hover:text-red-700 font-bold text-lg px-2"
                            title="Remove ingredient"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Ingredient */}
                    <button
                      onClick={() => {
                        const newIngredients = { ...editingRecipe.ingredients }
                        newIngredients['New Ingredient'] = 10
                        setEditingRecipe({ ...editingRecipe, ingredients: newIngredients })
                      }}
                      className="mt-4 w-full py-2 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                    >
                      + Add Ingredient
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => copyRecipe(editingRecipe)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => exportRecipe(editingRecipe)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      📝 Export
                    </button>
                    <button
                      onClick={saveNewRecipe}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      💾 Save Recipe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Batch Production Modal */}
          {showBatchModal && batchRecipe && batchMaterials && (
            <div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => setShowBatchModal(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-linear-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-2xl relative">
                  <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <Package className="h-8 w-8" />
                    Batch Production Planner
                  </h2>
                  <p className="text-white/90">{batchRecipe.name}</p>
                  <button
                    onClick={() => setShowBatchModal(false)}
                    className="absolute top-4 right-4 bg-white text-orange-600 w-10 h-10 rounded-full font-bold text-xl hover:bg-gray-100 transition-all"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Batch Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block text-lg">
                        Batch Quantity
                      </Label>
                      <Input
                        type="number"
                        value={batchQuantity}
                        onChange={(e) => setBatchQuantity(parseInt(e.target.value) || 1)}
                        min="1"
                        className="text-2xl font-bold"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block text-lg">
                        Vessel Type
                      </Label>
                      <select
                        value={batchVesselIndex}
                        onChange={(e) => setBatchVesselIndex(parseInt(e.target.value))}
                        className="w-full p-3 border-2 border-orange-200 dark:border-orange-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-lg font-semibold"
                      >
                        {vessels.map((vessel, idx) => (
                          <option key={vessel.id} value={idx}>
                            {vessel.name} ({vessel.volumeOz.toFixed(1)} oz)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Cost Summary */}
                  <div className="bg-linear-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-orange-300 dark:border-orange-700 mb-6">
                    <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-4">💰 Cost Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Single Unit</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          ${batchMaterials.singleUnitCost.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Batch Total</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          ${batchMaterials.batchCost.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Units</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {batchQuantity}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Volume Each</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {batchMaterials.volumeOz.toFixed(1)} oz
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shopping List */}
                  <div className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">🛒 Shopping List</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">🕯️ Soy Wax</span>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {batchMaterials.waxGrams.toFixed(0)}g ({batchMaterials.waxLbs.toFixed(2)} lbs)
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600 dark:text-orange-400">
                            ${(batchMaterials.waxLbs * materialPrices.waxPricePerLb).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">🌸 Fragrance Oil</span>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {batchMaterials.fragranceGrams.toFixed(0)}g ({batchMaterials.fragranceLbs.toFixed(2)} lbs)
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600 dark:text-orange-400">
                            ${(batchMaterials.fragranceLbs * materialPrices.fragrancePricePerLb).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">🏗️ Cement/Container</span>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {batchMaterials.cementGrams.toFixed(0)}g ({batchMaterials.cementLbs.toFixed(2)} lbs)
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600 dark:text-orange-400">
                            ${(batchMaterials.cementLbs * materialPrices.cementPricePerLb).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">🧵 Wicks</span>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {batchMaterials.wicksNeeded} wicks needed
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600 dark:text-orange-400">
                            ${(batchMaterials.wicksNeeded * materialPrices.wickPrice).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">🎨 Paint/Finishing</span>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {batchQuantity} units
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600 dark:text-orange-400">
                            ${(batchQuantity * materialPrices.paintPrice).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recipe Ingredients */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-4">🌸 Scent Blend</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(batchRecipe.ingredients).map(([ingredient, percent]) => (
                        <div key={ingredient} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{ingredient}</div>
                          <div className="text-lg text-purple-600 dark:text-purple-400 font-bold">{percent}%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {((batchMaterials.fragranceGrams * percent) / 100).toFixed(1)}g
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const text = `BATCH PRODUCTION - ${batchRecipe.name}\n\nQuantity: ${batchQuantity} units\nVessel: ${batchMaterials.vessel.name}\n\nSHOPPING LIST:\n🕯️ Wax: ${batchMaterials.waxLbs.toFixed(2)} lbs ($${(batchMaterials.waxLbs * materialPrices.waxPricePerLb).toFixed(2)})\n🌸 Fragrance: ${batchMaterials.fragranceLbs.toFixed(2)} lbs ($${(batchMaterials.fragranceLbs * materialPrices.fragrancePricePerLb).toFixed(2)})\n🏗️ Cement: ${batchMaterials.cementLbs.toFixed(2)} lbs ($${(batchMaterials.cementLbs * materialPrices.cementPricePerLb).toFixed(2)})\n🧵 Wicks: ${batchMaterials.wicksNeeded} ($${(batchMaterials.wicksNeeded * materialPrices.wickPrice).toFixed(2)})\n🎨 Paint: $${(batchQuantity * materialPrices.paintPrice).toFixed(2)}\n\nTOTAL COST: $${batchMaterials.batchCost.toFixed(2)}\nCost per unit: $${batchMaterials.singleUnitCost.toFixed(2)}`
                        navigator.clipboard.writeText(text)
                        alert('Shopping list copied to clipboard!')
                      }}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
                    >
                      📋 Copy Shopping List
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all text-lg"
                    >
                      🖨️ Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Label Generator Modal */}
          {showLabelModal && labelRecipe && (
            <div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => setShowLabelModal(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-linear-to-r from-pink-600 to-rose-600 text-white p-6 rounded-t-2xl relative">
                  <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <Tag className="h-8 w-8" />
                    Label Generator
                  </h2>
                  <p className="text-white/90">Create professional candle labels instantly</p>
                  <button
                    onClick={() => setShowLabelModal(false)}
                    className="absolute top-4 right-4 bg-white text-pink-600 w-10 h-10 rounded-full font-bold text-xl hover:bg-gray-100 transition-all"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Configuration Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Template Style</Label>
                      <select
                        value={labelTemplate}
                        onChange={(e) => setLabelTemplate(e.target.value as 'modern' | 'vintage' | 'minimalist' | 'luxury')}
                        className="w-full p-2 border-2 border-pink-200 dark:border-pink-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="modern">Modern</option>
                        <option value="vintage">Vintage</option>
                        <option value="minimalist">Minimalist</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Vessel Type</Label>
                      <select
                        value={labelVesselIndex}
                        onChange={(e) => setLabelVesselIndex(parseInt(e.target.value))}
                        className="w-full p-2 border-2 border-pink-200 dark:border-pink-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        {vessels.map((vessel, idx) => (
                          <option key={vessel.id} value={idx}>
                            {vessel.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Brand Name</Label>
                      <Input
                        value={businessSettings.businessName}
                        onChange={(e) => setBusinessSettings({ ...businessSettings, businessName: e.target.value })}
                        className="bg-white dark:bg-gray-800"
                        placeholder="Your brand name"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-gray-100 font-semibold mb-2 block">Batch Size</Label>
                      <Input
                        type="number"
                        value={labelBatchSize}
                        onChange={(e) => setLabelBatchSize(parseInt(e.target.value) || 1)}
                        min="1"
                        className="bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>

                  {/* Label Previews */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Front Label */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Front Label</h3>
                      <div className={`bg-white dark:bg-gray-700 rounded-2xl p-8 border-4 ${
                        labelTemplate === 'modern' ? 'border-indigo-500' :
                        labelTemplate === 'vintage' ? 'border-amber-600' :
                        labelTemplate === 'minimalist' ? 'border-gray-400' :
                        'border-purple-600'
                      } shadow-2xl min-h-[400px] flex flex-col justify-center items-center text-center relative`}>
                        
                        {/* Logo */}
                        {businessSettings.logoUrl && (
                          <div className="mb-4">
                            <img 
                              src={businessSettings.logoUrl} 
                              alt="Business Logo" 
                              className="w-16 h-16 object-contain"
                            />
                          </div>
                        )}

                        {/* Brand Name */}
                        <div className={`mb-6 ${
                          labelTemplate === 'modern' ? 'text-indigo-600' :
                          labelTemplate === 'vintage' ? 'text-amber-700' :
                          labelTemplate === 'minimalist' ? 'text-gray-700' :
                          'text-purple-700'
                        } ${labelTemplate === 'luxury' ? 'font-serif' : 'font-sans'}`}>
                          <div className="text-sm uppercase tracking-widest font-semibold">{businessSettings.businessName}</div>
                        </div>

                        {/* Recipe Name */}
                        <h2 className={`text-3xl font-bold mb-4 ${
                          labelTemplate === 'modern' ? 'text-gray-900 dark:text-gray-100' :
                          labelTemplate === 'vintage' ? 'text-amber-900 dark:text-amber-100 font-serif' :
                          labelTemplate === 'minimalist' ? 'text-gray-800 dark:text-gray-200' :
                          'text-purple-900 dark:text-purple-100 font-serif'
                        }`}>
                          {labelRecipe.name}
                        </h2>

                        {/* Profile Tag */}
                        {labelRecipe.profile && (
                          <div className={`mb-6 px-4 py-1 rounded-full text-sm font-semibold ${
                            labelTemplate === 'modern' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' :
                            labelTemplate === 'vintage' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                            labelTemplate === 'minimalist' ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' :
                            'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                          }`}>
                            {labelRecipe.profile}
                          </div>
                        )}

                        {/* Decorative Icon/Element */}
                        <div className="mb-6">
                          {labelTemplate === 'modern' && <div className="text-6xl">✨</div>}
                          {labelTemplate === 'vintage' && <div className="text-6xl">🌸</div>}
                          {labelTemplate === 'minimalist' && <div className="w-16 h-16 border-2 border-gray-400 rounded-full"></div>}
                          {labelTemplate === 'luxury' && <div className="text-6xl">♦</div>}
                        </div>

                        {/* Size Info */}
                        <div className="mt-auto text-sm text-gray-600 dark:text-gray-400">
                          <div className="font-bold">{vessels[labelVesselIndex].volumeOz.toFixed(1)} oz ({(vessels[labelVesselIndex].volumeOz * 28.35).toFixed(0)}g)</div>
                          <div className="mt-1">Soy Wax</div>
                        </div>
                      </div>
                    </div>

                    {/* Back Label (Safety & Info) */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Back Label (Safety & Info)</h3>
                      <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border-4 border-gray-300 dark:border-gray-600 shadow-2xl min-h-[400px] text-left">
                        {/* Product Name */}
                        <div className="mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-600">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{labelRecipe.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{labelRecipe.profile}</p>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Ingredients:</h4>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            Soy Wax, Fragrance Oils ({Object.entries(labelRecipe.ingredients).map(([ing, pct]) => `${ing} ${pct}%`).join(', ')}), Wick, Natural Dyes
                          </p>
                        </div>

                        {/* Burn Time */}
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Burn Time:</h4>
                          <p className="text-xs text-gray-700 dark:text-gray-300">{labelBurnTime}</p>
                        </div>

                        {/* Safety Instructions */}
                        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg">
                          <h4 className="text-sm font-bold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Safety Instructions:</h4>
                          <ul className="text-xs text-yellow-800 dark:text-yellow-200 space-y-1">
                            <li>🔥 Keep away from children and pets</li>
                            <li>🕯️ Never leave burning candle unattended</li>
                            <li>✂️ Trim wick to 1/4 inch before each use</li>
                            <li>🛑 Stop use when 1/2 inch of wax remains</li>
                          </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">📧 Contact Us:</h4>
                          <p>{businessSettings.website || 'www.yourwebsite.com'}</p>
                          <p>{businessSettings.email || 'contact@yourcompany.com'}</p>
                          <p>📞 {businessSettings.phone || '+1-555-555-5555'}</p>
                        </div>

                        {/* Barcode/QR Code Section */}
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 flex items-center justify-around">
                          <div className="text-center">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded inline-block mb-1">
                              <div className="w-24 h-16 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded text-[8px] font-mono text-gray-700 dark:text-gray-300">
                                {labelBatchCode}
                              </div>
                            </div>
                            <p className="text-[8px] text-gray-500 dark:text-gray-400">Batch Code</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded inline-block mb-1">
                              <div className="w-16 h-16 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded">
                                <svg viewBox="0 0 40 40" className="w-full h-full">
                                  <rect width="40" height="40" fill="white"/>
                                  <g fill="black">
                                    <rect x="2" y="2" width="4" height="4"/>
                                    <rect x="10" y="2" width="4" height="4"/>
                                    <rect x="18" y="2" width="4" height="4"/>
                                    <rect x="26" y="2" width="4" height="4"/>
                                    <rect x="34" y="2" width="4" height="4"/>
                                    <rect x="2" y="10" width="4" height="4"/>
                                    <rect x="34" y="10" width="4" height="4"/>
                                    <rect x="2" y="18" width="4" height="4"/>
                                    <rect x="18" y="18" width="4" height="4"/>
                                    <rect x="34" y="18" width="4" height="4"/>
                                    <rect x="2" y="26" width="4" height="4"/>
                                    <rect x="34" y="26" width="4" height="4"/>
                                    <rect x="2" y="34" width="4" height="4"/>
                                    <rect x="10" y="34" width="4" height="4"/>
                                    <rect x="18" y="34" width="4" height="4"/>
                                    <rect x="26" y="34" width="4" height="4"/>
                                    <rect x="34" y="34" width="4" height="4"/>
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <p className="text-[8px] text-gray-500 dark:text-gray-400">Scan for Info</p>
                          </div>
                        </div>

                        {/* Made In */}
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 text-center">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{businessSettings.businessName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{businessSettings.city}, {businessSettings.state} • USA</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Label Details */}
                  <div className="bg-pink-50 dark:bg-pink-900/20 border-2 border-pink-300 dark:border-pink-700 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-sm text-pink-700 dark:text-pink-300 font-semibold mb-1">Template:</div>
                        <div className="text-lg font-bold text-pink-900 dark:text-pink-100 capitalize">{labelTemplate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-pink-700 dark:text-pink-300 font-semibold mb-1">Batch Code:</div>
                        <div className="text-lg font-bold text-pink-900 dark:text-pink-100">{labelBatchCode}</div>
                      </div>
                      <div>
                        <div className="text-sm text-pink-700 dark:text-pink-300 font-semibold mb-1">Quantity:</div>
                        <div className="text-lg font-bold text-pink-900 dark:text-pink-100">{labelBatchSize} labels</div>
                      </div>
                      <div>
                        <div className="text-sm text-pink-700 dark:text-pink-300 font-semibold mb-1">Price:</div>
                        <div className="text-lg font-bold text-pink-900 dark:text-pink-100">${(labelBatchSize * 0.45).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => {
                        const text = `${businessSettings.businessName.toUpperCase()}\n\n${labelRecipe.name}\n${labelRecipe.profile}\n\n${vessels[labelVesselIndex].volumeOz.toFixed(1)} oz • Soy Wax\n\nIngredients: ${Object.entries(labelRecipe.ingredients).map(([ing, pct]) => `${ing} ${pct}%`).join(', ')}`
                        navigator.clipboard.writeText(text)
                        alert('Label text copied to clipboard!')
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      📋 Copy Text
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      🖨️ Print Labels
                    </button>
                    <button
                      onClick={() => alert('PDF export coming soon!')}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      📄 Export PDF
                    </button>
                    <button
                      onClick={() => alert('Barcode generator coming soon!')}
                      className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      🔲 Add Barcode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </Tooltip.Provider>
  )
}

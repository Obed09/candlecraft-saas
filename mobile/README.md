# CandleFlow Mobile App

React Native mobile app built with Expo for CandleFlow candle business management.

## 🚀 Features

- **Calculator**: Calculate wax and fragrance amounts based on vessel size, with cost analysis
- **Inventory**: Manage materials inventory with barcode scanning capability
- **Orders**: Track customer orders with status management
- **Production**: Monitor production batches with priority and deadline tracking
- **Recipes**: Browse and use fragrance recipes for candle making

## 📱 Tech Stack

- React Native with Expo
- TypeScript
- React Navigation (Bottom Tabs)
- Supabase (Backend & Auth)
- Expo Barcode Scanner
- Expo Camera

## 🛠️ Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies (already done)
npm install
```

## 🏃 Running the App

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web Browser (for testing)
```bash
npm run web
```

### On Physical Device
1. Install Expo Go app on your device
2. Run `npm start`
3. Scan the QR code with Expo Go (Android) or Camera (iOS)

## 📁 Project Structure

```
mobile/
├── src/
│   ├── screens/         # Screen components
│   │   ├── CalculatorScreen.tsx
│   │   ├── InventoryScreen.tsx
│   │   ├── OrdersScreen.tsx
│   │   ├── ProductionScreen.tsx
│   │   └── RecipesScreen.tsx
│   ├── navigation/      # Navigation config
│   │   └── AppNavigator.tsx
│   ├── services/        # API services
│   │   └── supabase.ts
│   ├── types/          # TypeScript types
│   │   └── index.ts
│   └── components/     # Reusable components (empty)
├── App.tsx             # Root component
└── package.json
```

## 🔧 Configuration

### Supabase Setup
Update the Supabase configuration in `src/services/supabase.ts`:
```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

## 📸 Barcode Scanning

The Inventory screen includes barcode scanning functionality. Camera permissions will be requested when you tap the barcode button.

## 🎨 Design

- Purple theme (#9333ea) matching the web app
- Card-based layouts for all screens
- Bottom tab navigation with Ionicons
- Responsive design for both iOS and Android

## 🔐 Authentication

Authentication is handled through Supabase. Auth screens will be added in future updates.

## 📝 Sample Data

All screens currently use sample data for demonstration. Connect to Supabase backend to use real data.

## 🚧 TODO

- [ ] Add authentication screens
- [ ] Connect all screens to Supabase backend
- [ ] Implement camera for barcode scanning
- [ ] Add AsyncStorage for offline support
- [ ] Add form validation
- [ ] Implement real-time updates
- [ ] Add push notifications
- [ ] Create app icon and splash screen

## 📄 License

Part of the CandleFlow SaaS project.


# PiEat-Me - Food Delivery Platform

A modern food delivery application built on the Pi Network ecosystem, allowing users to order food from restaurants and home food providers using Pi cryptocurrency.

## Project Link

**URL**: https://lovable.dev/projects/a4068971-3b7c-465e-9229-a5ec131e33e4

## Project Overview

PiEat-Me is a comprehensive food delivery platform built on the Pi Network ecosystem. It connects users with both traditional restaurants and home-based food providers, enabling payments via Pi cryptocurrency. The platform features a dual-marketplace model, with separate sections for restaurants and home food providers, integrated wallet systems, and a reward mining feature.

## Project Structure

```
PiEat-Me/
├── public/                   # Static files and assets
│   ├── lovable-uploads/      # Uploaded images
│   ├── favicon.ico           # App favicon
│   ├── manifest.json         # PWA manifest
│   ├── _redirects            # Netlify redirects
│   └── robots.txt            # Search engine instructions
│
├── src/
│   ├── backend/              # Backend services
│   │   ├── integrations/     # External service integrations
│   │   │   └── supabase/     # Supabase client and types
│   │   ├── services/         # API services
│   │   └── index.ts          # Backend exports
│   │
│   ├── components/           # Reusable UI components
│   │   ├── cart/             # Cart-related components
│   │   ├── food-provider/    # Food provider components
│   │   ├── header/           # Header components
│   │   ├── home/             # Home page components
│   │   ├── mining/           # Mining feature components
│   │   ├── restaurant/       # Restaurant-related components
│   │   ├── ui/               # UI library components (shadcn)
│   │   └── Various UI components (CurrencyValue.tsx, PiEatLogo.tsx, etc.)
│   │
│   ├── config/               # Configuration files
│   │   └── piNetwork.ts      # Pi Network configuration
│   │
│   ├── contexts/             # React context providers
│   │   ├── wallet/           # Wallet context implementation
│   │   ├── homefood/         # Home food context
│   │   ├── language/         # Language context
│   │   ├── mining/           # Mining context
│   │   └── Other contexts (Cart, Orders, Payment, etc.)
│   │
│   ├── frontend/             # Frontend-specific code
│   │   ├── components/       # Frontend-only components
│   │   ├── hooks/            # Frontend hooks
│   │   ├── utils/            # Frontend utilities
│   │   └── index.ts          # Frontend exports
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── use-toast.ts      # Toast notification hook
│   │
│   ├── integrations/         # Third-party integrations
│   │   └── supabase/         # Supabase integration
│   │
│   ├── lib/                  # Helper libraries
│   │   ├── date-utils.ts     # Date manipulation utilities
│   │   ├── responsive-utils.ts # Responsive design helpers
│   │   └── utils.ts          # General utilities
│   │
│   ├── locales/              # Translation and localization files
│   │   ├── ar.json           # Arabic translations
│   │   ├── en.json           # English translations
│   │   └── index.ts          # Locales export
│   │
│   ├── pages/                # Application pages
│   │   ├── Index.tsx         # Home page
│   │   ├── Wallet.tsx        # Wallet page
│   │   ├── PiWallet.tsx      # Pi wallet page
│   │   ├── HomeFood.tsx      # Home food page
│   │   ├── Restaurants.tsx   # Restaurants page
│   │   ├── RestaurantDetails.tsx # Restaurant details page
│   │   ├── admin/            # Admin dashboard pages
│   │   │   ├── AdminDashboard.tsx # Main admin dashboard
│   │   │   ├── AdminOrders.tsx    # Orders management
│   │   │   ├── AdminUsers.tsx     # User management
│   │   │   └── Other admin pages
│   │   └── Other application pages
│   │
│   ├── services/             # Application services
│   │   └── piPriceService.ts # Pi price service
│   │
│   ├── styles/               # General styles
│   │   ├── animations.css    # Animation styles
│   │   ├── base.css          # Base styles
│   │   ├── components.css    # Component styles
│   │   ├── responsive.css    # Responsive design styles
│   │   └── rtl.css           # Right-to-left language support
│   │
│   ├── translations/         # Translation files
│   │   ├── ar.ts             # Arabic translations
│   │   └── en.ts             # English translations
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── food.ts           # Food-related types
│   │
│   ├── utils/                # Helper functions
│   │   ├── mobile.ts         # Mobile detection utilities
│   │   └── mobileViewport.ts # Mobile viewport utilities
│   │
│   ├── App.tsx               # Main application component
│   ├── App.css               # Main application styles
│   ├── index.css             # Global CSS
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite environment declarations
│
├── capacitor.config.ts       # Capacitor configuration (for mobile)
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment configuration
└── vite.config.ts            # Vite configuration
```

## Key Features

- **Order from Restaurants and Home Food**: Order from restaurants or home food providers
- **Pi Network Integration**: Pay using Pi cryptocurrency
- **Pi Wallet**: Manage Pi transactions and wallet balance
- **PiEat Wallet**: Internal wallet for platform rewards and transactions
- **Mining System**: Earn rewards through in-app mining feature
- **Multi-language Support**: Supports English and Arabic languages
- **Responsive Design**: Works on mobile and desktop devices
- **Admin Dashboard**: Complete management system for administrators

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Context API, TanStack Query
- **Routing**: React Router
- **Backend Integration**: Supabase
- **Mobile Support**: Capacitor
- **Payment Integration**: Pi Network SDK
- **Charts**: Recharts
- **Toast Notifications**: Sonner

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or bun
- Git

### Setting up the Development Environment

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd pieat-me
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using bun (faster)
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```

4. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using bun
   bun dev
   ```

The application will be available at http://localhost:8080 by default.

## Build & Deployment

### Development Build
```bash
# Using npm
npm run build:dev

# Using bun
bun run build:dev
```

### Production Build
```bash
# Using npm
npm run build

# Using bun
bun run build
```

### Preview Production Build
```bash
# Using npm
npm run preview

# Using bun
bun run preview
```

## Deployment Options

### Option 1: Deploy on Lovable
Click Share -> Publish from the Lovable interface

### Option 2: Connect Custom Domain
1. Go to Project > Settings > Domains
2. Click Connect Domain
3. Follow the instructions to update DNS records

### Option 3: Deploy on Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite

### Option 4: Deploy on Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. The included `netlify.toml` file handles other configuration

## Pi Network Integration

This application integrates with Pi Network SDK to enable payments using Pi cryptocurrency.

### Setting up Pi Network SDK
1. Create a Pi app in the Pi Developer Portal
2. Configure Pi app credentials in `src/config/piNetwork.ts`
3. Implement authentication and payment flows

You can find full documentation for the Pi SDK at [Pi Platform Documentation Repository](https://github.com/pi-apps/pi-platform-docs).

## Supabase Database Integration

To connect to the Supabase database:

1. Create an account at [Supabase](https://supabase.com) and create a new project
2. Get your project URL and anon API key from the Supabase dashboard
3. Add environment variables to a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Define database connection and any necessary tables using the Supabase interface.
Current Supabase project ID: `ntrivhnvoktbgyskfhfl`

## License

This project is licensed under the MIT License.

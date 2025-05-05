
# PiEat-Me - Food Delivery Platform

A modern food delivery application built on the Pi Network ecosystem, allowing users to order food from restaurants and home-based food providers using Pi cryptocurrency.

## Project URL

**URL**: https://lovable.dev/projects/a4068971-3b7c-465e-9229-a5ec131e33e4

## Project Structure

```
PiEat-Me/
├── public/                   # Static files
├── src/
│   ├── backend/              # Backend services
│   │   ├── integrations/     # External service integrations
│   │   ├── services/         # API services
│   │   └── README.md         # Backend documentation
│   │
│   ├── components/           # Reusable UI components
│   │   ├── cart/             # Cart related components
│   │   ├── food-provider/    # Food provider components
│   │   ├── header/           # Header components
│   │   ├── home/             # Home page components
│   │   ├── mining/           # Mining feature components
│   │   ├── restaurant/       # Restaurant related components
│   │   ├── ui/               # UI library components (shadcn)
│   │   └── [Various UI components]
│   │
│   ├── config/               # Configuration files
│   │
│   ├── contexts/             # React Context providers
│   │   ├── wallet/           # Wallet context implementation
│   │   │   ├── WalletContext.tsx    # Wallet provider implementation
│   │   │   ├── WalletTypes.ts       # Wallet type definitions
│   │   │   └── WalletUtils.ts       # Wallet helper functions
│   │   ├── homefood/         # HomeFood context
│   │   ├── language/         # Localization context
│   │   ├── mining/           # Mining context
│   │   └── [Other contexts]
│   │
│   ├── frontend/             # Frontend specific code
│   │   ├── components/       # Frontend only components
│   │   ├── hooks/            # Frontend hooks
│   │   ├── utils/            # Frontend utilities
│   │   └── README.md         # Frontend documentation
│   │
│   ├── hooks/                # Custom React hooks
│   │
│   ├── integrations/         # Third-party integrations
│   │   └── supabase/         # Supabase integration
│   │
│   ├── lib/                  # Utility libraries
│   │
│   ├── locales/              # Localization files
│   │
│   ├── pages/                # Application pages
│   │   ├── Index.tsx         # Home page
│   │   ├── Wallet.tsx        # Wallet page
│   │   ├── PiWallet.tsx      # Pi Wallet page
│   │   ├── HomeFood.tsx      # HomeFood page
│   │   ├── Restaurants.tsx   # Restaurants page
│   │   ├── RestaurantDetails.tsx    # Single restaurant page
│   │   └── [Other pages]
│   │
│   ├── services/             # Application services
│   │
│   ├── styles/               # Global styles
│   │
│   ├── translations/         # Translation files
│   │
│   ├── types/                # TypeScript type definitions
│   │
│   ├── utils/                # Utility functions
│   │
│   ├── App.tsx               # Main application component
│   ├── App.css               # Main application styles
│   ├── index.css             # Global CSS
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite environment declarations
│
├── capacitor.config.ts       # Capacitor config (for mobile)
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## Key Features

- **Restaurant & HomeFood Ordering**: Order from restaurants or home-based food providers
- **Pi Network Integration**: Pay using Pi cryptocurrency
- **Pi Wallet**: Manage Pi transactions and wallet balance
- **PiEat Wallet**: Internal wallet for platform rewards and transactions
- **Mining System**: Earn rewards through the app's mining feature
- **Multi-language Support**: Supports English and Arabic languages
- **Responsive Design**: Works on mobile and desktop devices

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Context API, TanStack Query
- **Routing**: React Router
- **Backend Integration**: Supabase
- **Mobile Support**: Capacitor
- **Payment Integration**: Pi Network SDK
- **Charts**: Recharts
- **Toast Notifications**: Sonner

## Development Setup

### Prerequisites
- Node.js (v16+)
- npm or bun
- Git

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
# OR using bun
bun install

# Start the development server
npm run dev
# OR using bun
bun dev
```

The application will be available at http://localhost:5173 by default.

## Build and Deployment

### Development Build
```bash
npm run build:dev
# OR 
bun run build:dev
```

### Production Build
```bash
npm run build
# OR
bun run build
```

### Preview Production Build
```bash
npm run preview
# OR
bun run preview
```

## Deployment Options

1. **Lovable Platform**: Click on Share -> Publish from the Lovable interface
2. **Custom Domain**: Connect your domain via Project > Settings > Domains
3. **Vercel/Netlify**: Deploy using the included configuration files

## Integration with Pi Network

This application is integrated with the Pi Network SDK to enable payments using Pi cryptocurrency.

### Pi Network SDK Setup
1. Create a Pi App in the Pi Developer Portal
2. Configure the Pi App credentials in `src/config/piNetwork.ts`
3. Implement the authentication and payment flows

## Custom Domain Setup

To connect a custom domain to your Lovable project:
1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the instructions to update DNS records

For more details, see: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

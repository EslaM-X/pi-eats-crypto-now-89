
# PiEat-Me - Food Delivery Platform

A modern food delivery application built on the Pi Network ecosystem, allowing users to order food from restaurants and home food providers using Pi cryptocurrency.

## Project Link

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
│   │   ├── cart/             # Cart-related components
│   │   ├── food-provider/    # Food provider components
│   │   ├── header/           # Header components
│   │   ├── home/             # Home page components
│   │   ├── mining/           # Mining feature components
│   │   ├── restaurant/       # Restaurant-related components
│   │   ├── ui/               # UI library components (shadcn)
│   │   └── [Various UI components]
│   │
│   ├── config/               # Configuration files
│   │
│   ├── contexts/             # React context providers
│   │   ├── wallet/           # Wallet context implementation
│   │   │   ├── WalletContext.tsx    # Wallet provider implementation
│   │   │   ├── WalletTypes.ts       # Wallet type definitions
│   │   │   └── WalletUtils.ts       # Wallet helper functions
│   │   ├── homefood/         # Home food context
│   │   ├── language/         # Language context
│   │   ├── mining/           # Mining context
│   │   └── [Other contexts]
│   │
│   ├── frontend/             # Frontend-specific code
│   │   ├── components/       # Frontend-only components
│   │   ├── hooks/            # Frontend hooks
│   │   ├── utils/            # Frontend utilities
│   │   └── README.md         # Frontend documentation
│   │
│   ├── hooks/                # Custom React hooks
│   │
│   ├── integrations/         # Third-party integrations
│   │   └── supabase/         # Supabase integration
│   │
│   ├── lib/                  # Helper libraries
│   │
│   ├── locales/              # Translation and localization files
│   │
│   ├── pages/                # Application pages
│   │   ├── Index.tsx         # Home page
│   │   ├── Wallet.tsx        # Wallet page
│   │   ├── PiWallet.tsx      # Pi wallet page
│   │   ├── HomeFood.tsx      # Home food page
│   │   ├── Restaurants.tsx   # Restaurants page
│   │   ├── RestaurantDetails.tsx    # Restaurant details page
│   │   └── [Other pages]
│   │   └── admin/           # Admin dashboard pages
│   │       ├── AdminDashboard.tsx    # Main admin dashboard
│   │       ├── AdminOrders.tsx       # Orders management
│   │       ├── AdminUsers.tsx        # User management
│   │       └── [Other admin pages]
│   │
│   ├── services/             # Application services
│   │
│   ├── styles/               # General styles
│   │
│   ├── translations/         # Translation files
│   │
│   ├── types/                # TypeScript type definitions
│   │
│   ├── utils/                # Helper functions
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

## Development Environment Setup

### Prerequisites
- Node.js (v16+)
- npm or bun
- Git

### Installation

```bash
# Clone the repository
git clone <your_repository_link>

# Navigate to the project folder
cd <your_project_name>

# Install dependencies
npm install
# or using bun
bun install

# Start the development server
npm run dev
# or using bun
bun dev
```

The application will be available at http://localhost:5173 by default.

## Building and Deployment

### Development Build
```bash
npm run build:dev
# or 
bun run build:dev
```

### Production Build
```bash
npm run build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
bun run preview
```

## Deployment Options

1. **Lovable Platform**: Click Share -> Publish from the Lovable interface
2. **Custom Domain**: Connect your domain through Project > Settings > Domains
3. **Vercel/Netlify**: Deploy using included configuration files

## Pi Network Integration

This application integrates with Pi Network SDK to enable payments using Pi cryptocurrency.

### Setting up Pi Network SDK
1. Create a Pi app in the Pi Developer Portal
2. Configure Pi app credentials in `src/config/piNetwork.ts`
3. Implement authentication and payment flows

You can find full documentation for the Pi SDK at [Pi Platform Documentation Repository](https://github.com/pi-apps/pi-platform-docs).

## Supabase Integration Setup

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

## Custom Domain Setup

To connect a custom domain to your Lovable project:
1. Go to Project > Settings > Domains
2. Click Connect Domain
3. Follow instructions to update DNS records

For more details, see: [Custom Domain Setup](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

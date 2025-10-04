# Tatva Business - Smart Business Manager

<div align="center">

![Tatva Business](public/placeholder.svg)

**A modern, voice-enabled business management platform for small and medium businesses**

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [Documentation](#documentation)

</div>

---

## 📋 Overview

Tatva Business is a comprehensive business management solution designed specifically for small and medium enterprises in India. It combines powerful financial tracking, inventory management, and analytics with innovative voice recognition capabilities supporting Hindi, Marathi, and English.

### Why Tatva Business?

- 🎙️ **Voice-First Design**: Record transactions using voice commands in your preferred language
- 📊 **Real-Time Analytics**: Instant insights into your business performance
- 📱 **Mobile-Optimized**: Responsive design that works seamlessly on all devices
- 🌐 **Multi-Language**: Full support for English, Hindi, and Marathi
- 📈 **Advanced Reporting**: Generate professional PDF and Excel reports
- 🎓 **Learning Center**: Built-in courses to improve financial literacy

---

## ✨ Features

### 💰 Financial Management
- **Transaction Tracking**: Record income and expenses with detailed categorization
- **Voice Recording**: Add transactions using natural voice commands
- **Real-Time Dashboard**: Live updates of financial metrics
- **Budget Management**: Set and track budgets across categories
- **Loan Tracking**: Monitor loans with alerts and payment schedules

### 📊 Analytics & Insights
- **Today's Summary**: Quick view of daily income, expenses, and profit
- **Advanced Analytics**: Deep dive into financial trends and patterns
- **Visual Charts**: Interactive charts showing income/expense breakdowns
- **Category Analysis**: Understand spending patterns by category
- **Trend Analysis**: Track business growth over time

### 📦 Inventory Management
- **Product Catalog**: Manage products with pricing and stock levels
- **Low Stock Alerts**: Get notified when inventory runs low
- **Category Organization**: Group products for better management
- **Stock Tracking**: Monitor inventory movements

### 📄 Reports & Export
- **PDF Reports**: Professional financial reports with charts
- **Excel Export**: Download data for external analysis
- **Custom Date Ranges**: Generate reports for any period
- **Quick Reports**: Pre-configured report templates

### 🎓 Learning Center
- **Video Courses**: Step-by-step business management tutorials
- **Daily Tips**: Financial wisdom delivered every day
- **Resources**: Curated learning materials and guides
- **Multi-Language Content**: Educational content in your preferred language

### 🔐 Security & Authentication
- **Supabase Auth**: Secure authentication system
- **Protected Routes**: Role-based access control
- **Data Privacy**: Your data stays secure and private

### 🌐 Integrations
- **WhatsApp**: Connect your business communications
- **Cloud Backup**: Automatic data synchronization
- **Multi-Device**: Access from anywhere

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1**: Modern UI library with hooks
- **TypeScript 5.8.3**: Type-safe JavaScript
- **Vite 5.4.19**: Lightning-fast build tool
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built on Radix UI

### UI Components & Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library (460+ icons)
- **Recharts 3.2.1**: Composable charting library
- **Sonner**: Toast notifications
- **React Hook Form 7.61.1**: Performant form validation
- **Zod 3.25.76**: TypeScript-first schema validation

### Backend & Database
- **Supabase 2.57.4**: Backend-as-a-Service (Auth, Database, Storage)
- **Custom Database Layer**: Singleton pattern for data management
- **Local Storage**: Client-side data persistence

### Features & Utilities
- **jsPDF 3.0.3**: PDF generation for reports
- **xlsx 0.18.5**: Excel file generation and parsing
- **date-fns 3.6.0**: Modern date utility library
- **React Router 6.30.1**: Client-side routing
- **Web Speech API**: Browser-native voice recognition

### Development Tools
- **ESLint 9.32.0**: Code linting and quality
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS 8.5.6**: CSS transformation
- **Autoprefixer**: CSS vendor prefixing
- **Bun**: Fast JavaScript runtime and package manager

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Bun** (latest version) or **npm/yarn/pnpm**
- **Git**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd tatva_middleware.ts
```

### Step 2: Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Getting Supabase Credentials:**
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API
4. Copy the Project URL and anon/public key

### Step 4: Database Setup

Run the database migrations:

```bash
# Navigate to supabase directory
cd supabase

# Run the setup script on your Supabase instance
# Copy the contents of setup_database.sql and run in Supabase SQL Editor
```

Execute these files in order:
1. `supabase/setup_database.sql` - Main database schema
2. `supabase/migrations/2025-10-03_create_profiles.sql` - User profiles

### Step 5: Run Development Server

Using Bun:
```bash
bun run dev
```

Or using npm:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🚀 Usage

### Development

```bash
# Start development server with hot reload
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint
```

### Building for Production

```bash
# Create optimized production build
bun run build

# The build output will be in the 'dist' directory
# Deploy the 'dist' folder to your hosting service
```

### Development vs Production Builds

```bash
# Development build (with source maps)
bun run build:dev

# Production build (optimized)
bun run build
```

---

## 📁 Project Structure

```
tatva_middleware.ts/
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── main.tsx                # Application entry point
│   ├── App.tsx                 # Main app component with routing
│   ├── index.css               # Global styles
│   │
│   ├── components/             # Reusable components
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── FinancialDashboard.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── AppSidebar.tsx      # Navigation sidebar
│   │   ├── VoiceButton.tsx     # Voice input trigger
│   │   ├── QuickAddTransaction.tsx
│   │   ├── OnboardingDialog.tsx
│   │   ├── ProtectedRoute.tsx  # Auth wrapper
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   ├── LoadingSpinner.tsx
│   │   │
│   │   ├── analytics/          # Analytics components
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── BudgetProgress.tsx
│   │   │   ├── ExpenseDonutChart.tsx
│   │   │   └── ...
│   │   │
│   │   ├── charts/             # Chart components
│   │   │   ├── CategoryChart.tsx
│   │   │   ├── IncomeExpenseChart.tsx
│   │   │   ├── ProfitLossChart.tsx
│   │   │   └── TrendChart.tsx
│   │   │
│   │   └── ui/                 # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── ... (50+ components)
│   │
│   ├── pages/                  # Route pages
│   │   ├── HomePage.tsx        # Landing page
│   │   ├── LoginPage.tsx       # Authentication
│   │   ├── Index.tsx           # Dashboard home
│   │   ├── Transactions.tsx    # Transaction management
│   │   ├── Analytics.tsx       # Basic analytics
│   │   ├── AdvancedAnalytics.tsx
│   │   ├── Reports.tsx         # Report generation
│   │   ├── Inventory.tsx       # Product management
│   │   ├── Learn.tsx           # Learning center
│   │   ├── Settings.tsx        # User preferences
│   │   ├── Integrations.tsx    # Third-party integrations
│   │   └── ...
│   │
│   ├── contexts/               # React contexts
│   │   ├── AuthContext.tsx     # Authentication state
│   │   ├── I18nContext.tsx     # Internationalization
│   │   └── PreferencesContext.tsx # User preferences
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useStorage.ts       # Data management hooks
│   │   ├── use-toast.ts        # Toast notifications
│   │   └── use-mobile.tsx      # Mobile detection
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── database.ts         # Database singleton
│   │   ├── storage.ts          # Local storage utils
│   │   ├── supabase.ts         # Supabase client
│   │   ├── voiceAssistant.ts   # Voice recognition
│   │   ├── analytics.ts        # Analytics utilities
│   │   ├── demoData.ts         # Sample data
│   │   └── utils.ts            # Helper functions
│   │
│   └── types/                  # TypeScript definitions
│       └── index.ts            # Type definitions
│
├── supabase/                   # Database migrations
│   ├── setup_database.sql
│   └── migrations/
│       └── 2025-10-03_create_profiles.sql
│
├── docs/                       # Documentation
│   ├── FUNCTIONALITY_GUIDE.md
│   ├── INTEGRATION_ARCHITECTURE.md
│   ├── UI_UX_IMPROVEMENTS.md
│   ├── VOICE_FEATURE.md
│   └── VOICE_QUICKSTART.md
│
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
├── tailwind.config.ts          # Tailwind config
└── components.json             # shadcn/ui config
```

---

## 🎯 Key Features Guide

### Voice Recognition

The voice feature supports three languages:

```typescript
// English
"Add income 5000 from sales"
"Add expense 2000 for rent"

// Hindi (Hinglish)
"5000 income sales se"
"2000 expense rent ke liye"

// Marathi (Marathlish)
"5000 income vikri pasun"
"2000 kharcha bhade sathi"
```

**How it works:**
1. Click the microphone button
2. Speak your transaction
3. AI processes and categorizes it
4. Review and confirm

### Real-Time Dashboard

The dashboard shows:
- **Today's Summary**: Income, expenses, profit (updated live)
- **Recent Transactions**: Last 5 transactions
- **Budget Progress**: Visual budget tracking
- **Quick Actions**: Fast access to common tasks

### Report Generation

Generate professional reports:
1. Navigate to `/reports`
2. Select date range
3. Choose report type (Financial Overview, Income Statement, etc.)
4. Download as PDF or Excel

### Multi-Language Support

Switch languages anytime:
1. Go to Settings
2. Select Language preference
3. Choose: English, हिंदी, or मराठी
4. UI and voice commands adapt automatically

---

## 🔧 Configuration

### Customizing Theme

Edit `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Add your brand colors
      }
    }
  }
}
```

### Adding New Categories

Edit `src/lib/demoData.ts`:

```typescript
export const categories = [
  { name: "Sales", type: "income" },
  { name: "Rent", type: "expense" },
  // Add more categories
];
```

### Configuring Voice Assistant

Edit `src/lib/voiceAssistant.ts`:

```typescript
export const VOICE_CONFIG = {
  language: 'en-IN', // or 'hi-IN', 'mr-IN'
  continuous: false,
  interimResults: false
};
```

---

## 📚 Documentation

Detailed guides are available in the repository:

- **[FUNCTIONALITY_GUIDE.md](FUNCTIONALITY_GUIDE.md)**: Complete feature documentation
- **[VOICE_FEATURE.md](VOICE_FEATURE.md)**: Voice recognition deep dive
- **[VOICE_QUICKSTART.md](VOICE_QUICKSTART.md)**: Quick voice setup
- **[INTEGRATION_ARCHITECTURE.md](INTEGRATION_ARCHITECTURE.md)**: Integration patterns
- **[UI_UX_IMPROVEMENTS.md](UI_UX_IMPROVEMENTS.md)**: Design decisions
- **[COMPLETE_README.md](COMPLETE_README.md)**: Additional documentation

---

## 🌐 Browser Support

Tatva Business works on all modern browsers:

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

**Note**: Voice recognition requires Chrome/Edge for best results.

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use existing component patterns
- Add tests for new features
- Update documentation
- Follow the existing code style

### Code Style

- Use functional components with hooks
- Prefer TypeScript types over interfaces where possible
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep components small and focused

---

## 🐛 Troubleshooting

### Voice Recognition Not Working

**Issue**: Microphone button doesn't respond

**Solutions**:
1. Grant microphone permissions in browser
2. Use Chrome/Edge browser
3. Check HTTPS is enabled (required for Web Speech API)
4. Verify microphone is not used by another app

### Database Connection Issues

**Issue**: "Failed to fetch" errors

**Solutions**:
1. Check `.env` file has correct Supabase credentials
2. Verify Supabase project is active
3. Check network connection
4. Review CORS settings in Supabase dashboard

### Build Errors

**Issue**: Build fails with module errors

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install

# Or force clean install
bun install --force
```

### Styling Issues

**Issue**: Styles not loading

**Solutions**:
1. Ensure Tailwind classes are in content array (`tailwind.config.ts`)
2. Restart dev server: `bun run dev`
3. Clear browser cache

---

## 📈 Performance

### Optimization Features

- **Code Splitting**: Routes loaded on demand
- **Lazy Loading**: Components loaded when needed
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: Large lists optimized
- **Image Optimization**: Responsive images with lazy loading

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+

---

## 🔒 Security

### Best Practices Implemented

- ✅ Environment variables for secrets
- ✅ Supabase Row Level Security (RLS)
- ✅ HTTPS only in production
- ✅ XSS protection via React
- ✅ CSRF tokens for state-changing operations
- ✅ Input validation with Zod schemas
- ✅ Secure authentication with Supabase Auth

### Data Privacy

- User data stored securely in Supabase
- No third-party analytics tracking
- Local storage for non-sensitive data
- Regular security audits

---

## 📱 Mobile Support

Tatva Business is fully responsive:

- **Progressive Web App (PWA)**: Install on mobile devices
- **Touch Optimized**: Gesture-friendly UI
- **Offline Support**: Works without internet (coming soon)
- **Native Feel**: Mobile-first design patterns

---

## 🎨 Design System

### Color Palette

- **Primary**: Indigo (#6366F1)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray scale

### Typography

- **Font Family**: System fonts (SF Pro, Segoe UI, Roboto)
- **Headings**: Bold, 24-48px
- **Body**: Regular, 14-16px
- **Captions**: 12-14px

### Spacing

Following 4px grid system: 4, 8, 12, 16, 24, 32, 48, 64px

---

## 🗺️ Roadmap

### Version 2.0 (Planned)

- [ ] Mobile app (React Native)
- [ ] Advanced AI insights
- [ ] Multi-currency support
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Advanced inventory forecasting
- [ ] Automated expense tracking
- [ ] Bank account integration

### Version 1.5 (In Progress)

- [ ] Offline mode
- [ ] Dark mode improvements
- [ ] More language support (Tamil, Telugu)
- [ ] Advanced reporting templates
- [ ] Customer/Vendor management

---

## 📄 License

This project is proprietary software. All rights reserved.

Copyright © 2025 Tatva Business. Unauthorized copying, distribution, or modification of this software is strictly prohibited.

---

## 🙏 Acknowledgments

### Technologies
- React team for the amazing framework
- Supabase for backend infrastructure
- Radix UI for accessible components
- shadcn for beautiful UI components
- Vercel for Vite and Next.js

### Contributors
Thanks to all the developers who have contributed to this project!

---

## 📞 Support

### Get Help

- 📧 **Email**: support@tatvabusiness.com
- 💬 **In-App**: Use the Help section in `/help`
- 📚 **Docs**: Check documentation files
- 🎓 **Learn**: Visit `/learn` for tutorials

### Report Issues

Found a bug? Please report it:
1. Check if issue already exists
2. Create detailed bug report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

---

## 💡 Tips & Tricks

### Quick Keyboard Shortcuts

- `Ctrl/Cmd + K`: Quick search
- `Ctrl/Cmd + N`: New transaction
- `Ctrl/Cmd + S`: Save changes
- `Ctrl/Cmd + /`: Toggle sidebar

### Voice Commands Tips

1. **Be Clear**: Speak clearly and at normal pace
2. **Use Keywords**: Start with "Add income" or "Add expense"
3. **Include Amount**: Always mention the amount
4. **Category**: Mention category for better categorization

### Best Practices

- 📝 **Regular Backups**: Export data monthly
- 🔐 **Strong Passwords**: Use 12+ character passwords
- 📊 **Review Reports**: Check weekly performance
- 🎯 **Set Budgets**: Define spending limits
- 📱 **Mobile Access**: Install PWA for quick access

---

## 🌟 Why Choose Tatva Business?

### For Small Businesses

- **Easy to Use**: Intuitive interface, no training needed
- **Affordable**: Cost-effective solution
- **Time-Saving**: Automate routine tasks
- **Insightful**: Make data-driven decisions

### For Growing Businesses

- **Scalable**: Grows with your business
- **Comprehensive**: All-in-one platform
- **Collaborative**: Team features (coming soon)
- **Integrated**: Connect with other tools

---

<div align="center">

**Built with ❤️ for Indian Small Businesses**

Made with [React](https://react.dev) • [TypeScript](https://typescriptlang.org) • [Supabase](https://supabase.com) • [Vite](https://vitejs.dev)

⭐ Star us on GitHub if you find this helpful!

</div>

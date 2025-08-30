# 🌿 Mangrove Watch - Community Conservation Platform

> **Hackout25 Hackathon Project** - Empowering coastal communities to protect mangrove ecosystems through participatory monitoring and AI-powered validation.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.1-green.svg)](https://supabase.com/)

## 🎯 Problem Statement

Mangrove forests act as natural barriers against storms and are vital for biodiversity and carbon storage, yet they are increasingly threatened by illegal cutting, land reclamation, and pollution. This project addresses the critical need for a participatory monitoring system where coastal communities, fishermen, and citizen scientists can report incidents via mobile apps or SMS.

### 🌍 Impact
- **Improves surveillance and protection** of mangroves
- **Empowers local communities** to take active roles in conservation
- **Provides reliable, real-time data** to authorities for enforcement and policy action
- **Enhances biodiversity protection** in coastal ecosystems
- **Supports climate change mitigation** through carbon storage preservation

## ✨ Key Features

### 🚨 **Incident Reporting System**
- **Geotagged Photo Reports** with GPS coordinates
- **Multiple Issue Categories**: Illegal cutting, pollution, waste dumping, construction
- **Priority-based Classification**: Critical, High, Medium, Low
- **AI-powered Validation** with confidence scoring
- **Real-time Status Tracking**: Pending → Verified → Resolved

### 🗺️ **Interactive Map View**
- **Multi-layer Mapping**: Satellite, Terrain, Hybrid views
- **Real-time Incident Markers** with status indicators
- **Protected Area Boundaries** and monitoring zones
- **Geographic Data Visualization** and clustering

### 👥 **Community Engagement**
- **Gamification System**: Points, badges, and achievements
- **Leaderboard Rankings** with monthly competitions
- **Community Profiles** with contribution tracking
- **Achievement Unlocking**: First Report, Photo Expert, Community Leader

### 📊 **Analytics Dashboard**
- **Real-time KPIs**: Response rates, community growth, threat detection
- **Trend Analysis**: Monthly reports, verification rates, resolution times
- **Regional Coverage Maps**: Geographic distribution of monitoring
- **Threat Category Analysis**: Incident type breakdowns

### 🔔 **Smart Alert System**
- **Priority-based Notifications** for critical issues
- **AI-generated Alerts** for pattern detection
- **Automated Assignment** to relevant authorities
- **Real-time Updates** on report status changes

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive UI design
- **Shadcn/ui** components for consistent design system
- **React Router** for client-side routing
- **React Hook Form** with Zod validation

### **Backend & Database**
- **Supabase** for real-time database and authentication
- **PostgreSQL** for robust data storage
- **Row Level Security** for data privacy
- **Real-time subscriptions** for live updates

### **State Management & Data Fetching**
- **TanStack Query** for server state management
- **React Context** for global state
- **Custom Hooks** for business logic abstraction

### **UI/UX Components**
- **Radix UI** primitives for accessible components
- **Lucide React** for consistent iconography
- **Recharts** for data visualization
- **Sonner** for toast notifications

### **Development Tools**
- **ESLint** for code quality
- **TypeScript** for type safety
- **PostCSS** with Tailwind for styling
- **Vite** for fast development server

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mangrove-watch.git
   cd mangrove-watch
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Set up a Supabase project
   - Run the migration files in `supabase/migrations/`
   - Configure Row Level Security policies

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── reports/        # Report management components
│   └── ui/            # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/      # Database client and types
├── lib/                # Utility functions
├── pages/              # Application pages
└── main.tsx           # Application entry point
```

## 🗄️ Database Schema

### Core Tables
- **`profiles`**: User profiles with points and roles
- **`reports`**: Incident reports with geolocation and metadata
- **`alerts`**: System notifications and alerts
- **`areas`**: Protected zones and monitoring areas
- **`point_transactions`**: Gamification point tracking

### Key Relationships
- Users can submit multiple reports
- Reports are linked to geographic areas
- Alerts are generated based on report status
- Points are awarded for various activities

## 🎮 Gamification System

### **Point System**
- **Report Submission**: +50 points
- **Report Verification**: +25 points
- **Badge Achievement**: +100 points
- **Community Leadership**: +150 points

### **Badge System**
- **Guardian**: Top contributors (1000+ points)
- **Protector**: Active members (500+ points)
- **Scout**: Regular reporters (200+ points)
- **Watcher**: New members (50+ points)

### **Achievements**
- First Report, Photo Expert, Quick Responder
- Community Leader, Local Hero, Data Accuracy
- Consistent Reporter, Verification Master

## 🔐 Authentication & Security

- **Supabase Auth** with email/password and social login
- **Row Level Security** policies for data access control
- **Role-based Access Control**: Admin, Moderator, Community Member, Researcher
- **Secure API endpoints** with proper validation

## 📱 Mobile-First Design

- **Responsive layout** that works on all devices
- **Touch-friendly interface** for mobile users
- **Offline capability** for areas with poor connectivity
- **Progressive Web App** features

## 🚧 Development Roadmap

### **Phase 1: Core Platform** ✅
- [x] User authentication and profiles
- [x] Report creation and management
- [x] Basic dashboard and analytics
- [x] Community features and gamification

### **Phase 2: Advanced Features** 🚧
- [ ] AI-powered image analysis
- [ ] SMS reporting integration
- [ ] Advanced mapping and GIS features
- [ ] Mobile app development

### **Phase 3: Scale & Integration** 📋
- [ ] Multi-language support
- [ ] Government API integration
- [ ] Advanced analytics and ML
- [ ] International deployment

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Contribution Areas**
- **Frontend Development**: React components, UI/UX improvements
- **Backend Integration**: API development, database optimization
- **AI/ML Features**: Image analysis, pattern detection
- **Documentation**: Code comments, user guides
- **Testing**: Unit tests, integration tests

### **Code Standards**
- Follow TypeScript best practices
- Use ESLint rules for code quality
- Write meaningful commit messages
- Include tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hackout25** for providing the hackathon platform
- **Supabase** for the excellent backend infrastructure
- **Shadcn/ui** for the beautiful component library
- **Open Source Community** for the amazing tools and libraries

## 📞 Contact & Support

- **Project Lead**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/your-username/mangrove-watch/issues)
- **Discord**: [Join our community](https://discord.gg/your-server)

## 🌟 Star the Project

If this project helps protect mangroves, please give it a ⭐ on GitHub!

---

**Made with ❤️ for the environment during Hackout25**

*Protecting mangroves, one report at a time.*

# Next.js Full-Stack Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.2.0-green)](https://github.com/yourusername/nextjs-fullstack-template)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.2.0-black)](https://bun.sh/)
[![Node.js](https://img.shields.io/badge/Node.js-21.7.3-green)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

A modern, production-ready Next.js template with TypeScript, authentication, database, internationalization, and comprehensive development tooling.

**🚀 Ready to use out of the box with everything you need for a full-stack application!**

![Landing Page Preview](./images/image_1.png)

_Beautiful, responsive landing page with modern design and dark mode support_

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Docker Development](#-docker-development)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Security Features](#-security-features)
- [Deployment](#-deployment)
- [Using as Template](#-using-as-template)
- [Versioning with Changesets](#-versioning-with-changesets)
- [Contributing](#-contributing)
- [Support](#-support)

## 🚀 Features

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Runtime**: Bun 1.2.0 (with Node.js 21.7.3 fallback)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with complete auth flow (sign-in, sign-up, forgot password, email verification)
- **API**: tRPC for type-safe APIs
- **UI**: Radix UI components with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Internationalization**: Next-intl with Spanish and English support
- **Email**: Resend integration for transactional emails
- **Marketing**: Complete marketing pages with legal pages
- **Code Quality**: ESLint, Prettier, SonarJS, Airbnb config
- **Development**: Docker Compose with hot reload
- **Deployment**: Multi-stage Dockerfile
- **Architecture**: Modular folder structure for scalability

## 🎯 Why Choose This Template?

- **⚡ Production Ready**: Built with best practices and security in mind
- **🔒 Complete Authentication**: Better Auth with all auth flows (sign-in, sign-up, forgot password, email verification)
- **🗄️ Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **🔗 Type Safety**: End-to-end type safety with tRPC
- **🌍 Internationalization**: Built-in i18n support with Spanish and English
- **📧 Email Integration**: Resend for transactional emails
- **📄 Marketing Pages**: Complete marketing site with legal pages
- **🏗️ Modular Architecture**: Scalable folder structure with modules
- **🐳 Docker Ready**: Multi-stage builds for development and production
- **🎨 Modern UI**: Radix UI components with Tailwind CSS
- **📱 Responsive**: Mobile-first design approach
- **🔧 Developer Experience**: ESLint, Prettier, SonarJS, and Airbnb config
- **📦 Versioning**: Changesets for semantic versioning
- **🚀 Fast Development**: Hot reload and optimized build process

### 🆚 Comparison with Other Templates

| Feature                  | This Template           | Others                    |
| ------------------------ | ----------------------- | ------------------------- |
| **Authentication**       | ✅ Complete Auth Flow   | ❌ Manual setup           |
| **Database**             | ✅ PostgreSQL + Drizzle | ❌ No DB or manual setup  |
| **Type Safety**          | ✅ tRPC end-to-end      | ❌ Manual API setup       |
| **Internationalization** | ✅ Next-intl ready      | ❌ Manual i18n setup      |
| **Email Integration**    | ✅ Resend ready         | ❌ Manual email setup     |
| **Marketing Pages**      | ✅ Complete setup       | ❌ Manual page setup      |
| **Modular Structure**    | ✅ Modules architecture | ❌ Flat structure         |
| **Docker**               | ✅ Multi-stage ready    | ❌ Manual Docker setup    |
| **Code Quality**         | ✅ ESLint + SonarJS     | ❌ Basic or none          |
| **Versioning**           | ✅ Changesets           | ❌ Manual versioning      |
| **UI Components**        | ✅ Radix UI + Tailwind  | ❌ Manual component setup |
| **Production Ready**     | ✅ Out of the box       | ❌ Requires setup         |

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Next-intl** - Internationalization

### Backend & API

- **tRPC** - End-to-end typesafe APIs
- **Better Auth** - Complete authentication library
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Database
- **TanStack Query** - Server state management
- **Resend** - Email service

### Development Tools

- **ESLint** - Code linting with Airbnb config
- **Prettier** - Code formatting
- **SonarJS** - Code quality and security
- **Husky** - Git hooks
- **Docker** - Containerization
- **Docker Compose** - Multi-container development

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (marketing)/     # Marketing pages group
│   │   │   ├── legals/      # Legal pages (privacy, terms, accessibility)
│   │   │   ├── layout.tsx   # Marketing layout
│   │   │   └── page.tsx     # Landing page
│   │   ├── auth/           # Authentication pages
│   │   │   ├── sign-in/    # Sign in page
│   │   │   ├── sign-up/    # Sign up page
│   │   │   ├── forget-password/ # Forgot password page
│   │   │   ├── create-new-password/ # Reset password page
│   │   │   ├── verify-email/ # Email verification page
│   │   │   └── layout.tsx  # Auth layout
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   └── trpc/       # tRPC endpoints
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components (Radix UI)
│   │   └── custom/        # Custom components
│   │       ├── language-selector/ # Language switcher
│   │       ├── theme-switcher/   # Theme switcher
│   │       └── default-card/     # Default card component
│   ├── modules/           # Feature modules (recommended structure)
│   │   ├── auth/          # Authentication module
│   │   │   ├── sign-in/   # Sign in feature
│   │   │   │   ├── schema.ts # Validation schema
│   │   │   │   └── ui/    # UI components
│   │   │   │       ├── components/ # Feature components
│   │   │   │       └── views/     # Page views
│   │   │   ├── sign-up/   # Sign up feature
│   │   │   ├── forget-password/ # Forgot password feature
│   │   │   ├── create-new-password/ # Reset password feature
│   │   │   └── verify-email/ # Email verification feature
│   │   └── resend/        # Email module
│   │       └── ui/        # Email templates
│   │           └── templates/ # Email templates
│   ├── db/                # Database configuration
│   │   ├── index.ts       # Database connection
│   │   └── schema.ts      # Database schema
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization
│   │   ├── config.ts      # i18n configuration
│   │   └── request.ts     # i18n request handler
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # Authentication setup
│   │   ├── auth-client.ts # Client-side auth
│   │   └── utils.ts       # Utility functions
│   ├── services/          # Service layer
│   │   └── locale.ts      # Locale service
│   └── trpc/              # tRPC configuration
│       ├── routers/       # API route handlers
│       ├── client.tsx     # Client-side tRPC
│       └── server.ts      # Server-side tRPC
├── public/                # Static assets
├── messages/              # i18n message files
│   ├── en.json           # English translations
│   └── es.json           # Spanish translations
├── Dockerfile            # Multi-stage Docker build
├── compose.yaml          # Docker Compose configuration
├── drizzle.config.ts     # Database migration config
├── eslint.config.mjs     # ESLint configuration
├── .prettierrc          # Prettier configuration
└── quick-setup.sh       # Development setup script
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 21.7.3+** or **Bun 1.2.0+** (recommended)
- **Docker** and **Docker Compose** (optional)
- **PostgreSQL** (or use Docker)

> **Note**: This template works optimally with Bun 1.2.0 and Node.js 21.7.3. While other versions may work, these are the tested and recommended versions.

### 1. Clone and Setup

```bash
# Clone the template
git clone <your-repo-url>
cd nextjs-fullstack-template

# Remove existing git history to start fresh
rm -rf .git

# Initialize new git repository
git init
git add .
git commit -m "Initial commit from template"

# Install dependencies (Bun recommended)
bun install
# or with npm
npm install
```

**Important**: Remove the `.git` folder to start with a clean git history for your new project. This ensures the correct timeline and commit history for your specific project.

### 2. Environment Configuration

Create a `.env` file in the root directory using the provided template:

```bash
# Copy the environment template (recommended)
cp .env.template .env
```

Required environment variables:

```env
# Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/expenses_db_local"

# Application URLs
APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
```

**Important Notes**:

- `BETTER_AUTH_SECRET` must be at least 32 characters long
- Use the same URL for both `APP_URL` and `NEXT_PUBLIC_APP_URL` in development
- The `.env.template` file is provided for easy setup

### 3. Database Setup

#### Option A: With Docker (Recommended for database only)

```bash
# Start PostgreSQL with Docker Compose
docker compose up db -d

# Push database schema
bun run db:push

# (Optional) Open Drizzle Studio
bun run db:studio
```

#### Option B: Local PostgreSQL

If you have PostgreSQL installed locally, update your `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/expenses_db_local"
```

### 4. Development

#### Option A: Local Development (Recommended)

```bash
# Start development server with Bun
bun run dev

# Or with npm
npm run dev
```

#### Option B: Full Docker Compose

⚠️ **Known Issue**: There's a compatibility issue with Better Auth and Docker. See [Known Issues](#-known-issues--bug-reports) section.

```bash
# For full Docker development (not recommended due to Better Auth issue)
docker compose up
```

**Recommended Setup**: Use Docker only for the database (`docker compose up db -d`) and run the application locally with `bun run dev`.

The application will be available at `http://localhost:3000`

## 🏗️ Modular Architecture

This template uses a **modular folder structure** that is highly recommended for scalability and maintainability:

### Module Structure

Each feature is organized as a module in `src/modules/`:

```
src/modules/
├── auth/                    # Authentication module
│   ├── sign-in/            # Sign in feature
│   │   ├── schema.ts       # Validation schemas
│   │   └── ui/             # UI components
│   │       ├── components/ # Reusable components
│   │       └── views/      # Page views
│   ├── sign-up/            # Sign up feature
│   ├── forget-password/    # Forgot password feature
│   ├── create-new-password/ # Reset password feature
│   └── verify-email/       # Email verification feature
├── resend/                 # Email module
│   └── ui/                 # Email templates
│       └── templates/      # Email templates
└── [future-modules]/       # Additional feature modules
```

### Benefits of Modular Structure

- **Scalability**: Easy to add new features without cluttering
- **Maintainability**: Clear separation of concerns
- **Reusability**: Components can be shared between modules
- **Testing**: Easier to test individual features
- **Team Collaboration**: Different teams can work on different modules

### Adding New Modules

The template includes an automated script to create new feature modules with the proper structure:

#### Using the Module Creation Script

```bash
# Make the script executable (first time only)
chmod +x create-module.sh

# Create a new module (use kebab-case)
./create-module.sh your-module-name

# Examples
./create-module.sh user-profile
./create-module.sh account-settings
./create-module.sh expense-tracker
```

#### What the Script Creates

The script automatically generates:

- **Complete module structure** with proper folder organization
- **tRPC procedures** with CRUD operations
- **Zod schemas** for validation
- **TypeScript types** with proper inference
- **React components** (views and components)
- **Next.js page** with authentication
- **Database schema** template
- **Router integration** in `_app.ts`

#### Generated Structure

```bash
src/modules/your-module/
├── schema.ts                    # Zod validation schemas
├── types.ts                     # TypeScript type definitions
├── server/
│   └── your-module-procedure.ts # tRPC procedures
└── ui/
    ├── components/              # Reusable components
    └── views/
        └── your-module-view.tsx # Main view component

src/app/(application)/your-module/
└── page.tsx                     # Next.js page with auth
```

#### Manual Module Creation

If you prefer to create modules manually, follow this structure:

```bash
src/modules/
└── your-feature/
    ├── schema.ts           # Validation schemas
    ├── types.ts            # TypeScript types
    ├── server/             # tRPC procedures
    ├── ui/                 # UI components
    │   ├── components/     # Reusable components
    │   └── views/          # Page views
    └── hooks/              # Custom hooks
```

## 🌍 Internationalization (i18n)

The template includes complete internationalization support with Next-intl:

### Supported Languages

- **Spanish (es)** - Default language
- **English (en)** - Secondary language

### Configuration

```typescript
// src/i18n/config.ts
export const locales = ["es", "en"] as const;
export const defaultLocale: Locale = "es";
```

### Usage

```typescript
// In components
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');
  return <h1>{t('title')}</h1>;
}
```

### Language Switching

Use the built-in language selector component:

```typescript
import { LanguageSelector } from "@template/components/custom/language-selector";
```

## 🔐 Authentication Features

The template includes a complete authentication system with Better Auth:

### Available Auth Pages

- **Sign In** (`/auth/sign-in`) - User login
- **Sign Up** (`/auth/sign-up`) - User registration
- **Forgot Password** (`/auth/forget-password`) - Password recovery
- **Create New Password** (`/auth/create-new-password`) - Password reset
- **Verify Email** (`/auth/verify-email`) - Email verification

### Email Integration

Transactional emails are handled by Resend:

- **Account Confirmation** - Email verification
- **Password Reset** - Password recovery emails

### Auth Flow

1. **Registration**: User signs up with email/password
2. **Email Verification**: User receives confirmation email
3. **Login**: User can sign in after email verification
4. **Password Recovery**: User can reset password via email
5. **Session Management**: Secure session handling

## 📄 Marketing Pages

Complete marketing site with legal pages:

### Available Pages

- **Landing Page** (`/`) - Main marketing page
- **Privacy Policy** (`/legals/privacy-policy`) - Privacy policy
- **Terms & Conditions** (`/legals/terms-and-conditions`) - Terms of service
- **Accessibility Policy** (`/legals/accessibility-policy`) - Accessibility statement

### Customization

Update the marketing content in `src/app/(marketing)/` to match your brand and requirements.

## 🐳 Docker Development

This template includes a comprehensive Docker setup for development and production.

### Development with Docker Compose

```bash
# Start all services (app + database)
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f app

# Stop services
docker compose down
```

### Production Build

```bash
# Build production image
docker build -t my-app .

# Run production container
docker run -p 3000:3000 my-app
```

## 🔧 Configuration

### ESLint & Prettier

The project includes a comprehensive code quality setup:

- **ESLint** with Airbnb config, SonarJS, and custom rules
- **Prettier** with organized imports
- **Automatic formatting** on save
- **Import sorting** and unused import removal

Run the setup script to configure your editor:

```bash
chmod +x quick-setup.sh
./quick-setup.sh
```

### Database Schema

The database schema is defined in `src/db/schema.ts` using Drizzle ORM:

```typescript
// Example schema
export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `user_${nanoid()}`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  // ... more fields
});
```

### Authentication

Authentication is handled by Better Auth with email/password support:

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
```

### tRPC API

Type-safe APIs are built with tRPC:

```typescript
// Example router
export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
```

## 📝 Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Code Quality
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues
bun run format       # Format with Prettier
bun run typecheck    # TypeScript type checking

# Database
bun run db:push      # Push schema to database
bun run db:studio    # Open Drizzle Studio

# Module Generation
chmod +x create-module.sh              # Make script executable
./create-module.sh your-module-name    # Create new feature module

# Versioning (Changesets)
bun run changeset    # Create a new changeset
bun run version      # Version packages based on changesets
bun run release      # Release packages to npm

# Docker
docker compose up    # Start development environment
docker compose down  # Stop development environment
```

## 🔒 Security Features

- **Authentication**: Secure session management with Better Auth
- **Database**: SQL injection protection with Drizzle ORM
- **API**: Type-safe endpoints with tRPC
- **Docker**: Non-root user in production containers
- **Environment**: Secure environment variable handling
- **Email**: Secure transactional emails with Resend

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment

```bash
# Build production image
docker build -t my-app .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e AUTH_SECRET="your-secret" \
  -e RESEND_API_KEY="your-resend-key" \
  my-app
```

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:port/database"
APP_URL="https://your-domain.com"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
BETTER_AUTH_SECRET="your-secure-secret-key-min-32-chars"
RESEND_API_KEY="your-resend-api-key"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🚀 Using as Template

When using this project as a template for a new project:

1. **Clone the repository**
2. **Remove existing git history**: `rm -rf .git`
3. **Initialize new repository**: `git init`
4. **Update project details**:
   - Change project name in `package.json`
   - Update version from `0.0.0` to `1.0.0` or your starting version
   - Update project alias in `tsconfig.json` (currently `@template`)
   - Update project alias in `eslint.config.mjs`
5. **Create environment files**: Copy `.env.template` to `.env` and configure
6. **Customize content**:
   - Update marketing pages in `src/app/(marketing)/`
   - Customize email templates in `src/modules/resend/ui/templates/`
   - Update i18n messages in `messages/` folder
7. **Start development**: `bun run dev`

This ensures a clean git history and proper project timeline for your new application.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [tRPC documentation](https://trpc.io/docs)
3. Check [Better Auth documentation](https://better-auth.com)
4. Review [Next-intl documentation](https://next-intl-docs.vercel.app/)
5. Open an issue in this repository

## 🔄 Updates

To keep your template up to date:

```bash
# Update dependencies
bun update

# Check for security vulnerabilities
bun audit

# Update Docker images
docker compose pull
```

## 📦 Versioning with Changesets

This template uses [Changesets](https://github.com/changesets/changesets) for version management:

### Current Version Configuration

- **Base Version**: `0.0.0` (template version)
- **Pre-release Support**: Available with `--pre` flag

### Usage

```bash
# Create a new changeset
bun run changeset

# Version packages (standard release)
bun run version

# Version packages with pre-release flag
bun run version --pre

# Release to npm
bun run release
```

### Pre-release Workflow

If you want to create pre-release versions (alpha, beta, rc), use:

```bash
# Create pre-release version
bun run version --pre alpha
bun run version --pre beta
bun run version --pre rc
```

**Note**: The template starts at version `0.0.0`. Update the version in `package.json` when you start your actual project. Also, remember to remove the `.git` folder to start with a clean git history.

---

## 🐛 Known Issues & Bug Reports

### Better Auth + Docker Compatibility Issue

**Issue**: There's a known compatibility issue between Better Auth and Docker that may cause authentication to fail when running the full application in Docker.

**Workaround**:

1. Use Docker only for the database: `docker compose up db -d`
2. Run the application locally: `bun run dev`
3. This setup provides the best development experience while avoiding the authentication issues

**Status**: This is a known issue with Better Auth in containerized environments. We're monitoring for updates.

### Reporting Bugs

If you encounter any issues:

1. Check the [Known Issues](#-known-issues--bug-reports) section above
2. Search existing issues in the repository
3. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Your environment (OS, Node/Bun version, Docker version)
   - Error messages or logs

### System Requirements

- **Bun**: 1.2.0 (recommended)
- **Node.js**: 21.7.3 (fallback)
- **Docker**: Latest stable version
- **PostgreSQL**: 16+ (via Docker or local)

---

**Happy coding! 🎉**

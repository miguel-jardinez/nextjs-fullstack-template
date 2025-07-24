# Next.js Full-Stack Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-black)](https://bun.sh/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

A modern, production-ready Next.js template with TypeScript, authentication, database, and comprehensive development tooling.

**🚀 Ready to use out of the box with everything you need for a full-stack application!**

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
- **Runtime**: Bun (with Node.js fallback)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password
- **API**: tRPC for type-safe APIs
- **UI**: Radix UI components with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Code Quality**: ESLint, Prettier, SonarJS, Airbnb config
- **Development**: Docker Compose with hot reload
- **Deployment**: Multi-stage Dockerfile

## 🎯 Why Choose This Template?

- **⚡ Production Ready**: Built with best practices and security in mind
- **🔒 Authentication**: Better Auth with email/password support out of the box
- **🗄️ Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **🔗 Type Safety**: End-to-end type safety with tRPC
- **🐳 Docker Ready**: Multi-stage builds for development and production
- **🎨 Modern UI**: Radix UI components with Tailwind CSS
- **📱 Responsive**: Mobile-first design approach
- **🔧 Developer Experience**: ESLint, Prettier, SonarJS, and Airbnb config
- **📦 Versioning**: Changesets for semantic versioning
- **🚀 Fast Development**: Hot reload and optimized build process

### 🆚 Comparison with Other Templates

| Feature              | This Template           | Others                    |
| -------------------- | ----------------------- | ------------------------- |
| **Authentication**   | ✅ Better Auth          | ❌ Manual setup           |
| **Database**         | ✅ PostgreSQL + Drizzle | ❌ No DB or manual setup  |
| **Type Safety**      | ✅ tRPC end-to-end      | ❌ Manual API setup       |
| **Docker**           | ✅ Multi-stage ready    | ❌ Manual Docker setup    |
| **Code Quality**     | ✅ ESLint + SonarJS     | ❌ Basic or none          |
| **Versioning**       | ✅ Changesets           | ❌ Manual versioning      |
| **UI Components**    | ✅ Radix UI + Tailwind  | ❌ Manual component setup |
| **Production Ready** | ✅ Out of the box       | ❌ Requires setup         |

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

### Backend & API

- **tRPC** - End-to-end typesafe APIs
- **Better Auth** - Authentication library
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Database
- **TanStack Query** - Server state management

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
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   └── trpc/       # tRPC endpoints
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   └── ui/            # Reusable UI components
│   ├── db/                # Database configuration
│   │   ├── index.ts       # Database connection
│   │   └── schema.ts      # Database schema
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # Authentication setup
│   │   └── utils.ts       # Utility functions
│   └── trpc/              # tRPC configuration
│       ├── routers/       # API route handlers
│       ├── client.tsx     # Client-side tRPC
│       └── server.ts      # Server-side tRPC
├── public/                # Static assets
├── Dockerfile            # Multi-stage Docker build
├── compose.yaml          # Docker Compose configuration
├── drizzle.config.ts     # Database migration config
├── eslint.config.mjs     # ESLint configuration
├── .prettierrc          # Prettier configuration
└── quick-setup.sh       # Development setup script
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** or **Bun 1.0+**
- **Docker** and **Docker Compose**
- **PostgreSQL** (or use Docker)

### 1. Clone and Setup

```bash
# Clone the template
git clone <your-repo-url>
cd personal-expenses

# Remove existing git history to start fresh
rm -rf .git

# Initialize new git repository
git init
git add .
git commit -m "Initial commit from template"

# Install dependencies
bun install
# or
npm install
```

**Important**: Remove the `.git` folder to start with a clean git history for your new project. This ensures the correct timeline and commit history for your specific project.

### 2. Environment Configuration

Create a `.env` file in the root directory. You can copy from `.env.template` if it exists, or create it with the following variables:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/expenses_db_local"

# Authentication (Better Auth)
AUTH_SECRET="your-secret-key-here"
AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Public Environment Variables
NEXT_PUBLIC_AUTH_URL="http://localhost:3000"
```

**Note**: Create a `.env.template` file in your project root with the same structure but without sensitive values, so other developers can copy it to create their own `.env` file.

### 3. Database Setup

```bash
# Start PostgreSQL with Docker Compose
docker compose up db -d

# Push database schema
bun run db:push

# (Optional) Open Drizzle Studio
bun run db:studio
```

### 4. Development

```bash
# Start development server
bun run dev

# Or with Docker Compose (recommended)
docker compose up
```

The application will be available at `http://localhost:3000`

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
  my-app
```

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:port/database"
AUTH_SECRET="your-secure-secret-key"
AUTH_URL="https://your-domain.com"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-nextauth-secret"
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
   - Update project alias in `tsconfig.json` (currently `@expenses`)
   - Update project alias in `eslint.config.mjs`
5. **Create environment files**: Copy `.env.template` to `.env` and configure
6. **Start development**: `bun run dev`

This ensures a clean git history and proper project timeline for your new application.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [tRPC documentation](https://trpc.io/docs)
3. Check [Better Auth documentation](https://better-auth.com)
4. Open an issue in this repository

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

**Happy coding! 🎉**

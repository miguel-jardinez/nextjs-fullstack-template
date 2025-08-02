# Technical Architecture

This document provides a detailed overview of the technical architecture, backend configuration, authentication system, database design, and modular structure.

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (tRPC)        │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React 19      │    │ • tRPC Server   │    │ • Drizzle ORM   │
│ • TypeScript    │    │ • Better Auth   │    │ • Schema        │
│ • Tailwind CSS  │    │ • API Routes    │    │ • Migrations    │
│ • Next-intl     │    │ • Email Service │    │                 │
│ • Marketing     │    │ • i18n Support  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🏗️ Modular Architecture

### Recommended Folder Structure

This template uses a **modular architecture** that promotes scalability, maintainability, and clear separation of concerns:

```
src/
├── modules/              # Feature modules (recommended structure)
│   ├── auth/            # Authentication module
│   │   ├── sign-in/     # Sign in feature
│   │   │   ├── schema.ts # Validation schemas
│   │   │   └── ui/      # UI components
│   │   │       ├── components/ # Reusable components
│   │   │       └── views/      # Page views
│   │   ├── sign-up/     # Sign up feature
│   │   ├── forget-password/ # Forgot password feature
│   │   ├── create-new-password/ # Reset password feature
│   │   └── verify-email/ # Email verification feature
│   ├── resend/          # Email module
│   │   └── ui/          # Email templates
│   │       └── templates/ # Email templates
│   └── [future-modules]/ # Additional feature modules
├── app/                 # Next.js App Router
├── components/          # Shared components
├── lib/                 # Utility libraries
├── services/            # Service layer
└── i18n/               # Internationalization
```

### Module Structure Benefits

- **Scalability**: Easy to add new features without cluttering
- **Maintainability**: Clear separation of concerns
- **Reusability**: Components can be shared between modules
- **Testing**: Easier to test individual features
- **Team Collaboration**: Different teams can work on different modules

### Module Organization Pattern

Each module follows a consistent structure:

```typescript
src/modules/your-feature/
├── schema.ts           # Validation schemas (Zod)
├── types.ts            # TypeScript type definitions
├── api/                # API handlers (tRPC routers)
│   └── router.ts       # Feature-specific router
├── ui/                 # UI components
│   ├── components/     # Reusable components
│   │   ├── feature-form.tsx
│   │   └── feature-card.tsx
│   └── views/          # Page views
│       └── feature-view.tsx
├── hooks/              # Custom React hooks
│   └── use-feature.ts
└── utils/              # Feature-specific utilities
    └── helpers.ts
```

## 🔧 Backend Configuration

### tRPC Setup

The backend uses tRPC for type-safe, end-to-end APIs:

#### Server Configuration (`src/trpc/server.ts`)

```typescript
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createTRPCContext } from "./init";
import { appRouter } from "./routers/_app";

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
```

#### Context Creation (`src/trpc/init.ts`)

```typescript
import { auth } from "@template/lib/auth";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  });

  return {
    session,
    user: session?.user,
    db,
  };
};
```

#### Router Structure (`src/trpc/routers/_app.ts`)

```typescript
import { router } from "../init";
import { userRouter } from "./user";
import { authRouter } from "./auth";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
```

### API Routes

#### tRPC API Handler (`src/app/api/trpc/[trpc]/route.ts`)

```typescript
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@template/trpc/routers/_app";
import { createTRPCContext } from "@template/trpc/init";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
```

#### Authentication API (`src/app/api/auth/[...all]/route.ts`)

```typescript
import { auth } from "@template/lib/auth";

export const { GET, POST } = auth.api;
```

## 🔐 Authentication System

### Better Auth Configuration

The authentication system uses Better Auth with complete email/password support:

#### Auth Setup (`src/lib/auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@template/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
```

#### Client-Side Auth (`src/lib/auth-client.ts`)

```typescript
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000",
});
```

### Authentication Features

The template includes a complete authentication flow:

#### Available Auth Pages

- **Sign In** (`/auth/sign-in`) - User login with email/password
- **Sign Up** (`/auth/sign-up`) - User registration with email verification
- **Forgot Password** (`/auth/forget-password`) - Password recovery via email
- **Create New Password** (`/auth/create-new-password`) - Password reset form
- **Verify Email** (`/auth/verify-email`) - Email verification page

#### Authentication Flow

1. **Registration**: User creates account with email/password
2. **Email Verification**: User receives confirmation email
3. **Login**: User authenticates with verified credentials
4. **Session Management**: Better Auth handles secure session tokens
5. **Password Recovery**: User can reset password via email
6. **Authorization**: tRPC context validates user sessions
7. **Logout**: Session invalidation and cleanup

### Protected Routes

```typescript
// Example protected procedure
export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);
```

## 📧 Email Integration

### Resend Configuration

The template includes Resend integration for transactional emails:

#### Email Templates

```typescript
// src/modules/resend/ui/templates/confirm-account.tsx
export function ConfirmAccountEmail({
  user,
  verificationUrl
}: ConfirmAccountEmailProps) {
  return (
    <div>
      <h1>Confirm your account</h1>
      <p>Hi {user.name},</p>
      <p>Please confirm your account by clicking the link below:</p>
      <a href={verificationUrl}>Confirm Account</a>
    </div>
  );
}
```

#### Available Email Templates

- **Account Confirmation** - Email verification for new users
- **Password Reset** - Password recovery emails
- **Welcome Email** - Welcome message for new users

## 🌍 Internationalization (i18n)

### Next-intl Configuration

The template includes complete internationalization support:

#### Configuration (`src/i18n/config.ts`)

```typescript
export type Locale = (typeof locales)[number];

export const locales = ["es", "en"] as const;
export const defaultLocale: Locale = "es";
```

#### Request Handler (`src/i18n/request.ts`)

```typescript
import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "../services/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

#### Locale Service (`src/services/locale.ts`)

```typescript
"use server";

import { cookies } from "next/headers";
import { defaultLocale, Locale } from "@template/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
```

### Supported Languages

- **Spanish (es)** - Default language
- **English (en)** - Secondary language

### Usage Examples

```typescript
// In components
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');
  return <h1>{t('title')}</h1>;
}

// Language switching
import { LanguageSelector } from '@template/components/custom/language-selector';
```

## 📄 Marketing Pages

### Marketing Structure

The template includes a complete marketing site:

#### Marketing Layout (`src/app/(marketing)/layout.tsx`)

```typescript
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

#### Available Marketing Pages

- **Landing Page** (`/`) - Main marketing page with hero section
- **Privacy Policy** (`/legals/privacy-policy`) - Privacy policy page
- **Terms & Conditions** (`/legals/terms-and-conditions`) - Terms of service
- **Accessibility Policy** (`/legals/accessibility-policy`) - Accessibility statement

### Custom Components

The template includes custom components for enhanced functionality:

#### Language Selector (`src/components/custom/language-selector/`)

```typescript
export function LanguageSelector() {
  const [locale, setLocale] = useState<Locale>("es");

  const handleLocaleChange = async (newLocale: Locale) => {
    await setUserLocale(newLocale);
    setLocale(newLocale);
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

#### Theme Switcher (`src/components/custom/theme-switcher/`)

```typescript
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

## 🗄️ Database Design

### Schema Overview

The database uses PostgreSQL with Drizzle ORM for type-safe queries:

#### User Management

```typescript
export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `user_${nanoid()}`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

#### Session Management

```typescript
export const session = pgTable("session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `session_${nanoid()}`),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
```

#### OAuth Accounts

```typescript
export const account = pgTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `account_${nanoid()}`),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
```

### Database Connection

#### Connection Setup (`src/db/index.ts`)

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
```

#### Migration Configuration (`drizzle.config.ts`)

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## 🔄 State Management

### TanStack Query Integration

The frontend uses TanStack Query for server state management:

#### Query Client Setup (`src/trpc/query-client.ts`)

```typescript
import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  });
}
```

#### Client-Side tRPC (`src/trpc/client.tsx`)

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./server";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
```

## 🎨 Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Radix UI)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── custom/          # Custom components
│       ├── language-selector/ # Language switcher
│       ├── theme-switcher/   # Theme switcher
│       └── default-card/     # Default card component
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── modules/             # Feature modules (recommended)
└── app/                 # Next.js App Router pages
```

### Styling System

- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **CSS Variables**: For theming and customization
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in theme switching

### Type Safety

- **TypeScript**: Full type safety across the stack
- **tRPC**: End-to-end type-safe APIs
- **Zod**: Runtime schema validation
- **Drizzle**: Type-safe database queries

## 🔒 Security Considerations

### Authentication Security

- **Session Management**: Secure session tokens with expiration
- **Password Hashing**: Better Auth handles secure password storage
- **CSRF Protection**: Built-in CSRF protection
- **Email Verification**: Required email verification for new accounts
- **Rate Limiting**: API rate limiting (can be added)

### Database Security

- **SQL Injection Prevention**: Drizzle ORM prevents SQL injection
- **Connection Pooling**: Efficient database connections
- **Environment Variables**: Secure credential management

### API Security

- **Type Safety**: tRPC prevents runtime errors
- **Input Validation**: Zod schema validation
- **Authorization**: Protected procedures for sensitive operations
- **Email Security**: Secure transactional emails with Resend

## 📊 Performance Optimizations

### Frontend Performance

- **Next.js 15**: Latest performance optimizations
- **React 19**: Concurrent features and improvements
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Internationalization**: Optimized i18n loading

### Backend Performance

- **tRPC Batching**: Automatic request batching
- **Query Caching**: TanStack Query caching
- **Database Indexing**: Optimized database queries
- **Connection Pooling**: Efficient database connections
- **Email Queuing**: Asynchronous email processing

### Build Optimizations

- **Tree Shaking**: Unused code elimination
- **Minification**: Code and asset minification
- **Standalone Output**: Next.js standalone deployment
- **Docker Multi-stage**: Optimized container builds

## 🔄 Development Workflow

### Local Development

1. **Template Setup**: Remove `.git` folder and initialize new repository
2. **Database**: PostgreSQL with Docker Compose
3. **Hot Reload**: File watching and automatic rebuilds
4. **Type Checking**: Real-time TypeScript validation
5. **Linting**: ESLint with automatic fixes
6. **Formatting**: Prettier with organized imports
7. **Internationalization**: Real-time i18n updates

### Testing Strategy

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full application testing
- **Type Testing**: TypeScript compilation testing
- **i18n Testing**: Translation coverage testing

### Deployment Pipeline

1. **Build**: Multi-stage Docker build
2. **Test**: Automated testing suite
3. **Deploy**: Container deployment
4. **Monitor**: Health checks and logging

## 🔧 Configuration Management

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
AUTH_SECRET="your-secret-key"
AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Public Environment Variables
NEXT_PUBLIC_AUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# Internationalization
NEXT_LOCALE="es" # Default locale
```

**Environment Template**: Create a `.env.template` file with the same structure but without sensitive values for team collaboration.

### Build Configuration

- **Next.js Config**: Standalone output for containers
- **TypeScript Config**: Strict type checking
- **ESLint Config**: Comprehensive code quality rules
- **Prettier Config**: Consistent code formatting
- **i18n Config**: Internationalization settings

### Version Management

- **Changesets**: Semantic versioning with automated releases
- **Base Version**: `0.0.0` (template version)
- **Pre-release Support**: Available with `--pre` flag for alpha, beta, rc versions
- **Release Workflow**: Automated versioning and publishing to npm

## 📈 Monitoring and Observability

### Logging

- **Application Logs**: Structured logging
- **Error Tracking**: Error boundary and monitoring
- **Performance Monitoring**: Core Web Vitals tracking
- **Email Logging**: Transactional email tracking

### Health Checks

- **Database Health**: Connection and query health
- **API Health**: Endpoint availability
- **Application Health**: Overall system status
- **Email Service**: Resend API health monitoring

---

This architecture provides a robust, scalable, and maintainable foundation for modern web applications with type safety, security, internationalization, and performance at its core. The modular structure ensures easy scalability and maintainability as your application grows.

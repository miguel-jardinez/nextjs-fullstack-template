# Technical Architecture

This document provides a detailed overview of the technical architecture, backend configuration, authentication system, and database design.

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
└─────────────────┘    └─────────────────┘    └─────────────────┘
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
import { auth } from "@expenses/lib/auth";

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
import { appRouter } from "@expenses/trpc/routers/_app";
import { createTRPCContext } from "@expenses/trpc/init";

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
import { auth } from "@expenses/lib/auth";

export const { GET, POST } = auth.api;
```

## 🔐 Authentication System

### Better Auth Configuration

The authentication system uses Better Auth with email/password support:

#### Auth Setup (`src/lib/auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@expenses/db";

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

### Authentication Flow

1. **Registration**: User creates account with email/password
2. **Login**: User authenticates with credentials
3. **Session Management**: Better Auth handles session tokens
4. **Authorization**: tRPC context validates user sessions
5. **Logout**: Session invalidation and cleanup

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
│   └── ...              # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
└── app/                 # Next.js App Router pages
```

### Styling System

- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **CSS Variables**: For theming and customization
- **Responsive Design**: Mobile-first approach

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
- **Rate Limiting**: API rate limiting (can be added)

### Database Security

- **SQL Injection Prevention**: Drizzle ORM prevents SQL injection
- **Connection Pooling**: Efficient database connections
- **Environment Variables**: Secure credential management

### API Security

- **Type Safety**: tRPC prevents runtime errors
- **Input Validation**: Zod schema validation
- **Authorization**: Protected procedures for sensitive operations

## 📊 Performance Optimizations

### Frontend Performance

- **Next.js 15**: Latest performance optimizations
- **React 19**: Concurrent features and improvements
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component

### Backend Performance

- **tRPC Batching**: Automatic request batching
- **Query Caching**: TanStack Query caching
- **Database Indexing**: Optimized database queries
- **Connection Pooling**: Efficient database connections

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

### Testing Strategy

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full application testing
- **Type Testing**: TypeScript compilation testing

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
```

**Environment Template**: Create a `.env.template` file with the same structure but without sensitive values for team collaboration.

### Build Configuration

- **Next.js Config**: Standalone output for containers
- **TypeScript Config**: Strict type checking
- **ESLint Config**: Comprehensive code quality rules
- **Prettier Config**: Consistent code formatting

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

### Health Checks

- **Database Health**: Connection and query health
- **API Health**: Endpoint availability
- **Application Health**: Overall system status

---

This architecture provides a robust, scalable, and maintainable foundation for modern web applications with type safety, security, and performance at its core.

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    APP_URL: string;
    NEXT_PUBLIC_APP_URL: string;
    BETTER_AUTH_SECRET: string;
    RESEND_API_KEY: string;
    NEXT_PUBLIC_POSTHOG_KEY: string;
    NEXT_PUBLIC_POSTHOG_HOST: string;
    SENTRY_DNS: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_PUBLIC_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    HOST_EMAIL: string;
  }
}

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Resend } from "resend";

import { db } from "@template/db";
import * as schema from "@template/db/schema";
import { ConfirmAccount } from "@template/modules/resend/ui/templates/confirm-account";
import { ResetPassword } from "@template/modules/resend/ui/templates/reset-password";

const RESEND_CLIENT = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    sendResetPassword: async ({ url }) => {
      await RESEND_CLIENT.emails.send({
        from: "Personal template <onboarding@resend.dev>",
        to: "jardinez.ramos.miguel@gmail.com",
        subject: "Please reset your password clicking on this button",
        react: await ResetPassword({ url }),
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ url }) => {
      await RESEND_CLIENT.emails.send({
        from: "Personal template <onboarding@resend.dev>",
        to: "jardinez.ramos.miguel@gmail.com",
        subject: "Please confirm your account clicking on this button",
        react: await ConfirmAccount({
          url,
        }),
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
});

import { TRPCError } from "@trpc/server";
import Stripe from "stripe";

import { createTRPCRouter, protectedProcedure } from "@template/trcp/init";

import { createSchema } from "../schema";

const STRIPE_CLIENT = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
  typescript: true,
  appInfo: {
    name: "Expenses",
    version: "0.1.0",
  },
});

export const stripeProcedure = createTRPCRouter({
  createStripeSession: protectedProcedure
    .input(createSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const session = await STRIPE_CLIENT.checkout.sessions.create({
        payment_method_types: ["card", "link"],
        line_items: [
          {
            price_data: {
              currency: "mxn",
              unit_amount: input.pricing,
              product_data: {
                name: input.plan,
                description: input.type === "monthly" ? "Monthly" : "Yearly",
              },
              recurring: {
                interval: input.type === "monthly" ? "month" : "year",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        metadata: {
          userId,
          plan_type: input.type,
          plan: input.plan,
        },
      });

      if (!session) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error to create the stripe session",
        });
      }

      return session;
    }),
});

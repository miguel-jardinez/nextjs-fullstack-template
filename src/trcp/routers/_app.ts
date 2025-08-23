import { z } from "zod";

import { stripeProcedure } from "@template/modules/stripe/server/stripe-procedure";

import { createTRPCRouter, publicProcedure } from "../init";

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(opts => ({
      greeting: `hello ${opts.input.text}`,
    })),

  stripe: stripeProcedure,
});
// export type definition of API
export type AppRouter = typeof appRouter;

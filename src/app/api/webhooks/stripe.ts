import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const STRIPE_CLIENT = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
  typescript: true,
  appInfo: {
    name: "Expenses",
    version: "0.1.0",
  },
});

const STRIPE_SIGNING_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const registerBuffer = await buffer(req);
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return response.status(400).send("Missing Stripe signature");
    }

    const event = STRIPE_CLIENT.webhooks.constructEvent(
      registerBuffer,
      signature,
      STRIPE_SIGNING_SECRET,
    );

    switch (event.type) {
      case "customer.subscription.created": {
        console.log("Subscription created");
        break;
      }
      case "checkout.session.completed": {
        console.log("Checkout session completed used for lifetime");
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;

        if (subscription.cancel_at_period_end) {
          console.log("Subscription cancelled");
          break;
        }

        console.log("Subscription active");
        break;
      }
      case "customer.subscription.deleted": {
        console.log("Subscription deleted");
        break;
      }
    }

    return response.status(200).json({ received: true });
  } catch (error) {
    console.error(error);
    response.status(500).end();
  }
}

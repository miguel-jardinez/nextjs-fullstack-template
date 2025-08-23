"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, CircleCheck, CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Badge } from "@template/components/ui/badge";
import { Button } from "@template/components/ui/button";
import { Separator } from "@template/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@template/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@template/components/ui/tooltip";
import { cn } from "@template/lib/utils";
import { CreateSchema as CreateStripeSchema } from "@template/modules/stripe/schema";
import { useTRPC } from "@template/trcp/client";
import {
  centsToString,
  formatCurrency,
} from "@template/utils/format-currentcy";

const tooltipContent = {
  styles: "Choose from a variety of styles to suit your preferences.",
  filters: "Choose from a variety of filters to enhance your portraits.",
  credits: "Use these credits to retouch your portraits.",
};

const YEARLY_DISCOUNT = 15;
const plans = [
  {
    name: "Starter",
    price: 2000,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      { title: "5 hours turnaround time" },
      { title: "20 AI portraits" },
      { title: "Choice of 2 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 2 filters", tooltip: tooltipContent.filters },
      { title: "2 retouch credits", tooltip: tooltipContent.credits },
    ],
  },
  {
    name: "Advanced",
    price: 4000,
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      { title: "3 hours turnaround time" },
      { title: "50 AI portraits" },
      { title: "Choice of 5 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 5 filters", tooltip: tooltipContent.filters },
      { title: "5 retouch credits", tooltip: tooltipContent.credits },
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: 8000,
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      { title: "1-hour turnaround time" },
      { title: "100 AI portraits" },
      { title: "Choice of 10 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 10 filters", tooltip: tooltipContent.filters },
      { title: "10 retouch credits", tooltip: tooltipContent.credits },
    ],
  },
];

const PricingSection = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState<
    "monthly" | "yearly"
  >("monthly");

  const stripeSessionMutation = useMutation(
    trpc.stripe.createStripeSession.mutationOptions({
      onSuccess: data => {
        if (!data.url) {
          toast.error("Error to create the stripe session");
          return;
        }
        window.location.href = data.url;
      },
      onError: error => {
        if (error.data?.code === "UNAUTHORIZED") {
          router.push("/auth/sign-in");
          return;
        }

        toast.error("You have to be logged in to purchase a plan");
      },
    }),
  );

  const handleGetStarted = (plan: CreateStripeSchema) => {
    stripeSessionMutation.mutate({
      pricing: plan.pricing,
      type: selectedBillingPeriod,
      plan: plan.plan,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <h1 className="text-5xl font-bold text-center tracking-tight">Pricing</h1>
      <Tabs
        value={selectedBillingPeriod}
        onValueChange={value =>
          setSelectedBillingPeriod(value as "monthly" | "yearly")
        }
        className="mt-8"
      >
        <TabsList className="h-11 bg-background border px-1.5 rounded-full">
          <TabsTrigger
            value="monthly"
            className="px-4 py-1.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger
            value="yearly"
            className="px-4 py-1.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Yearly (Save {YEARLY_DISCOUNT}%)
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-10 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
        {plans.map(plan => {
          const price =
            selectedBillingPeriod === "monthly"
              ? plan.price
              : plan.price * ((100 - YEARLY_DISCOUNT) / 100);

          return (
            <div
              key={plan.name}
              className={cn(
                "relative p-6 bg-background border px-8 rounded-md",
                {
                  "shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] py-14 z-[1] px-10 lg:-mx-2 overflow-hidden":
                    plan.isPopular,
                },
              )}
            >
              {plan.isPopular && (
                <Badge className="absolute top-10 right-10 rotate-[45deg] rounded-none px-10 uppercase translate-x-1/2 -translate-y-1/2">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-lg font-medium">{plan.name}</h3>
              <p className="mt-2 text-4xl font-bold">
                {formatCurrency(centsToString(price))}
                <span className="ml-1.5 text-sm text-muted-foreground font-normal">
                  /month
                </span>
              </p>
              <p className="mt-4 font-medium text-muted-foreground">
                {plan.description}
              </p>

              <Button
                variant={plan.isPopular ? "default" : "outline"}
                size="lg"
                className="w-full mt-6 rounded-full text-base"
                onClick={() =>
                  handleGetStarted({
                    pricing: plan.price,
                    type: selectedBillingPeriod,
                    plan: plan.name,
                  })
                }
              >
                Get Started <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Separator className="my-8" />
              <ul className="space-y-3">
                {plan.features.map(feature => (
                  <li
                    key={feature.title}
                    className="flex items-start gap-1.5"
                  >
                    <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
                    {feature.title}
                    {feature.tooltip && (
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <CircleHelp className="h-4 w-4 mt-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>{feature.tooltip}</TooltipContent>
                      </Tooltip>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingSection;

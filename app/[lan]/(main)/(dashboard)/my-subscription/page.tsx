import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Check, CreditCard, DollarSign, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started.",
    features: [
      "1 Project",
      "2GB Storage",
      "Basic Analytics",
      "Community Support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professionals and teams.",
    features: [
      "Unlimited Projects",
      "50GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "Custom Integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations.",
    features: [
      "Everything in Pro",
      "Unlimited Storage",
      "Dedicated Account Manager",
      "SLA Guarantee",
      "Custom Solutions",
    ],
    highlighted: false,
  },
];

export default function page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Subscriptions
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and billing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "relative flex flex-col h-full transition-all duration-300 hover:shadow-lg",
              tier.highlighted &&
                "border-primary ring-2 ring-primary/20 transform -translate-y-1",
            )}
          >
            {tier.highlighted && (
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-t-lg" />
            )}
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.highlighted && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <CardDescription className="min-h-[40px]">
                {tier.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-5xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 flex-1 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {tier.name === "Free" ? (
                  <Button className="w-full">
                    <Link href="/pricing">
                      <DollarSign size={18} className="mr-2" />
                      Get Started
                    </Link>
                  </Button>
                ) : tier.name === "Enterprise" ? (
                  <Button className="w-full" variant="outline">
                    <Link href="/contact">
                      <Sparkles size={18} className="mr-2" />
                      Contact Sales
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline">
                    <Link href="/pricing">
                      <CreditCard size={18} className="mr-2" />
                      Upgrade to {tier.name}
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

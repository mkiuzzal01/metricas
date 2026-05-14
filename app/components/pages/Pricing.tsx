'use client';

import PricingCard from '@/app/[lan]/(main)/pricing/__components/PricingCard';
import Container from '../shared/Container';

export type TPlan = {
  id: number;
  name: string;
  plan_type: string;
  price: number;
  currency: string;
  duration_type: string;
  duration: number;
  description: string;
  badge: string | null;
  features: string[];
  is_highlighted: boolean;
};

interface IPricing {
  payload: {
    data: {
      one_time_plans: TPlan[];
      subscription_plans: TPlan[];
    };
  };
}
export default function Pricing({ payload }: IPricing) {
  const data = payload?.data?.subscription_plans;
  return (
    <Container>
      <div className="min-h-screen bg-[#0a0e14] text-white px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-wide">Pricing Plans</h1>
          <p className="text-white/50 mt-3">
            Choose the plan that fits your needs
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          <PricingCard plan={data} />
        </div>
      </div>
    </Container>
  );
}

'use client';

import Container from '../shared/Container';

type Plan = {
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
      one_time_plans: Plan[];
      subscription_plans: Plan[];
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
          {data?.map((plan) => (
            <div
              key={plan.id}
              className={`
              relative rounded-2xl border p-6 backdrop-blur-xl transition
              ${
                plan.is_highlighted
                  ? 'border-[#5a9e8e] bg-[#0b111a]/80 shadow-xl scale-[1.03]'
                  : 'border-white/10 bg-[#0b111a]/60 hover:border-white/20'
              }
            `}
            >
              {/* Badge */}
              {plan.is_highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5a9e8e] text-black text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl font-semibold">{plan.name}</h2>

              {/* Price */}
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-bold">
                  {plan.price.toFixed(2)}
                </span>
                <span className="text-white/50 text-sm">
                  / {plan.duration_type}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm mt-4 leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-2">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className="text-sm text-white/70 flex items-center gap-2"
                  >
                    <span className="text-[#5a9e8e]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`
                mt-8 w-full py-3 rounded-lg text-sm font-medium transition
                ${
                  plan.is_highlighted
                    ? 'bg-[#5a9e8e] text-black hover:bg-[#4e8e80]'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }
              `}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

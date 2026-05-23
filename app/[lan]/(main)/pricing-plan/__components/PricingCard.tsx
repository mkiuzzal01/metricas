import { TPlan } from '@/app/components/pages/Pricing';
import { useTakeSubscriptionPlanMutation } from '@/app/redux/features/pricing/pricing.api';

interface Props {
  plan: TPlan[];
}

export default function PricingCard({ plan }: Props) {
  const [takeSubscriptionPlan, { isLoading }] =
    useTakeSubscriptionPlanMutation();

  const handleTakeSubscription = async (plan_id: number) => {
    const res = await takeSubscriptionPlan({
      plan_id,
    });
    console.log(res);
  };

  return (
    <>
      {plan?.map((plan) => (
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
            <span className="text-3xl font-bold">{plan.price.toFixed(2)}</span>
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
            onClick={() => handleTakeSubscription(plan.id)}
            disabled={isLoading}
            className={`
                mt-8 w-full py-3 rounded-lg text-sm font-medium transition
                ${
                  plan.is_highlighted
                    ? 'bg-[#5a9e8e] text-black hover:bg-[#4e8e80]'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }
              `}
          >
            {isLoading ? 'Subscribing...' : 'Get Started'}
          </button>
        </div>
      ))}
    </>
  );
}

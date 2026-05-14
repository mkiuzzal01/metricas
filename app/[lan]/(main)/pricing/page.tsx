import { getPricing } from '@/actions/quires/pricing.api';
import Pricing from '@/app/components/pages/Pricing';

export default async function page() {
  const pricing = await getPricing();

  return <Pricing payload={pricing} />;
}

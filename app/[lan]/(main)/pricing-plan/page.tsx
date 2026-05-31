import { getPricing } from "@/actions/quires/pricing.api";
import ErrorMessage from "@/app/components/message/ErrorMessage";
import Pricing from "@/app/components/pages/Pricing";

interface Props {
  params: Promise<{
    lan: string;
  }>;
}

export default async function page({ params }: Props) {
  const pricing = await getPricing();
  const { lan } = await params;

  if (!pricing) {
    return (
      <ErrorMessage message="Failed to load pricing data. Please try again later." />
    );
  }

  return <Pricing payload={pricing} lan={lan} />;
}

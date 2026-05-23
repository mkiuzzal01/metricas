import { getPricing } from "@/actions/quires/pricing.api";
import ErrorMessage from "@/app/components/message/ErrorMessage";
import Pricing from "@/app/components/pages/Pricing";

export default async function page() {
  const pricing = await getPricing();

  console.log("Fetched pricing data:", pricing); // Debug log

  if (!pricing) {
    return (
      <ErrorMessage message="Failed to load pricing data. Please try again later." />
    );
  }

  return <Pricing payload={pricing} />;
}

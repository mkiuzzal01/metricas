"use client";

import { useGetMySubscriptionQuery } from "@/app/redux/features/subscription/subscription.api";

export default function page() {
  const { data, isLoading } = useGetMySubscriptionQuery(undefined);

  return (
    <div className="container space-y-4">
      <div>
        <h1 className="text-xl font-semibold">My Subscriptions</h1>
        <p className="text-gray-500">Manage your subscriptions</p>
      </div>
    </div>
  );
}

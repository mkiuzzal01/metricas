"use client";
import { Crown, CalendarDays, Layers3, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetMySubscriptionQuery } from "@/app/redux/features/subscription/subscription.api";

export default function SubscriptionPage() {
  const { data, isLoading } = useGetMySubscriptionQuery(undefined);

  const subscription = data?.data;

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-8 w-40 rounded-lg bg-white/10" />
        <div className="h-48 rounded-2xl bg-white/10" />
        <div className="h-64 rounded-2xl bg-white/10" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">My Subscription</h1>

        <p className="text-sm text-white/60">
          Manage and review your current subscription plan
        </p>
      </div>

      {/* ================= SUBSCRIPTION CARD ================= */}
      <Card className="border-white/10 bg-[#111827]/70 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-semibold text-white">
                {subscription?.plan?.name || "No Active Plan"}
              </h2>

              <Badge className="bg-[#5a9e8e] text-black hover:bg-[#5a9e8e]">
                <Crown size={12} className="mr-1" />
                {subscription?.is_unlimited ? "Unlimited" : "Premium"}
              </Badge>
            </div>

            <p className="text-sm text-white/60 mt-2 capitalize">
              Plan Type: {subscription?.plan?.type}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="outline"
                className="border-white/10 bg-white/5 text-white capitalize"
              >
                {subscription?.status}
              </Badge>

              <Badge
                variant="outline"
                className="border-white/10 bg-white/5 text-white"
              >
                Searches Used: {subscription?.searches_used}
              </Badge>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <StatCard
              icon={<CalendarDays size={18} />}
              label="Start Date"
              value={subscription?.start_date}
            />

            <StatCard
              icon={<CalendarDays size={18} />}
              label="End Date"
              value={subscription?.end_date}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= INFO GRID ================= */}
      <Card className="border-white/10 bg-[#111827]/70 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white">
              Subscription Information
            </h3>

            <p className="text-sm text-white/50">
              Plan usage and subscription details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <InfoCard
              icon={<Layers3 size={16} />}
              label="Plan Name"
              value={subscription?.plan?.name}
            />

            <InfoCard
              icon={<Activity size={16} />}
              label="Status"
              value={subscription?.status}
            />

            <InfoCard
              icon={<Crown size={16} />}
              label="Quota"
              value={
                subscription?.is_unlimited
                  ? "Unlimited"
                  : String(subscription?.remaining_quota || 0)
              }
            />

            <InfoCard
              icon={<Activity size={16} />}
              label="Searches Used"
              value={String(subscription?.searches_used || 0)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-sm text-white/60">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-sm font-medium text-white">{value || "N/A"}</p>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
      <div className="flex items-center gap-2 text-sm text-white/60">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-sm font-medium text-white">{value || "N/A"}</p>
    </div>
  );
}

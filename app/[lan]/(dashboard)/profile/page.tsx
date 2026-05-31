"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  ShieldCheck,
  Crown,
  CalendarDays,
  User,
  Pencil,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useGetProfileInfoQuery } from "@/app/redux/features/profile/profile.api";

export default function ProfilePage() {
  const { data, isLoading } = useGetProfileInfoQuery(undefined);

  const profile = data?.data;

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="space-y-5 animate-pulse">
          <div className="h-8 w-40 rounded-lg bg-white/10" />

          <div className="h-52 rounded-3xl border border-white/10 bg-white/5" />

          <div className="h-72 rounded-3xl border border-white/10 bg-white/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-white">
      {/* ================= HEADER ================= */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">My Profile</h1>

          <p className="mt-1 text-sm text-white/50">
            Manage your personal information.
          </p>
        </div>

        <Button
          size="sm"
          className="
            bg-[#5a9e8e]
            text-black
            hover:bg-[#4f8d7e]
            rounded-xl
          "
        >
          <Pencil size={15} />
          Edit
        </Button>
      </div>

      <div className="grid gap-6">
        {/* ================= PROFILE CARD ================= */}
        <Card
          className="
            border-white/10
            bg-[#111827]/70
            backdrop-blur-xl
            rounded-3xl
          "
        >
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* Avatar */}
                <Avatar className="h-24 w-24 border border-white/10">
                  {profile?.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile?.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-[#1a2332] text-3xl font-semibold text-white">
                      {profile?.name?.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* Info */}
                <div>
                  <div className="flex text-white flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold">{profile?.name}</h2>

                    {profile?.is_premium && (
                      <Badge className="bg-[#5a9e8e] text-black hover:bg-[#5a9e8e]">
                        <Crown size={13} className="mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>

                  <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                    <Mail size={15} />
                    {profile?.email}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="
                        border-white/10
                        bg-white/5
                        text-white
                      "
                    >
                      <ShieldCheck size={13} className="mr-1" />
                      {profile?.role}
                    </Badge>

                    <Badge
                      variant="outline"
                      className="
                        border-white/10
                        bg-white/5
                        text-white
                        capitalize
                      "
                    >
                      {profile?.subscription_type || "Free"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  min-w-[180px]
                "
              >
                <p className="text-sm text-white/50">Account Status</p>

                <h3 className="mt-2 text-lg font-semibold text-[#5a9e8e]">
                  Active
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= INFO GRID ================= */}
        <Card
          className="
            border-white/10
            bg-[#111827]/70
            backdrop-blur-xl
            rounded-3xl
          "
        >
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Account Information</h3>

              <p className="mt-1 text-sm text-white/50">
                Your personal account details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <InfoCard
                icon={<User size={16} />}
                label="Full Name"
                value={profile?.name}
              />

              <InfoCard
                icon={<Mail size={16} />}
                label="Email"
                value={profile?.email}
              />

              <InfoCard
                icon={<Phone size={16} />}
                label="Phone"
                value={profile?.phone || "Not Provided"}
              />

              <InfoCard
                icon={<CalendarDays size={16} />}
                label="Birth Date"
                value={profile?.d_o_b}
              />

              <InfoCard
                icon={<ShieldCheck size={16} />}
                label="Gender"
                value={profile?.gender}
              />

              <InfoCard
                icon={<Crown size={16} />}
                label="Membership"
                value={profile?.is_premium ? "Premium" : "Free"}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ================= INFO CARD ================= */

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
    <div
      className="
        rounded-2xl
        border
        border-white/10
        p-4
      "
    >
      <div className="mb-2 flex items-center gap-2 text-sm text-white/50">
        {icon}
        {label}
      </div>

      <p className="text-sm font-medium text-white capitalize break-words">
        {value || "N/A"}
      </p>
    </div>
  );
}

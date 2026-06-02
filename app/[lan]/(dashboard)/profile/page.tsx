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
import Link from "next/link";

export default function ProfilePage() {
  const { data, isLoading } = useGetProfileInfoQuery(undefined);
  const profile = data?.data;

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">My Profile</h1>
          <p className="text-sm text-white/60">
            Manage your personal information
          </p>
        </div>

        <Link href={"/update-profile"}>
          <Button className="bg-[#5a9e8e] text-black hover:bg-[#4f8d7e] rounded-xl">
            <Pencil size={14} className="mr-2" />
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* ================= PROFILE CARD ================= */}
      <Card className="border-white/10 bg-[#111827]/70 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 border border-white/10">
              {profile?.avatar ? (
                <Image
                  src={profile?.avatar}
                  alt={profile?.name || "User"}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-[#1a2332] text-white text-xl">
                  {profile?.name?.charAt(0) || "U"}
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <div className="flex items-center gap-2 flex-wrap text-white">
                <h2 className="text-xl font-semibold">{profile?.name}</h2>

                {profile?.is_premium && (
                  <Badge className="bg-[#5a9e8e] text-black hover:bg-[#5a9e8e]">
                    <Crown size={12} className="mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <p className="flex items-center gap-2 text-sm text-white/60 mt-1">
                <Mail size={14} />
                {profile?.email}
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white"
                >
                  <ShieldCheck size={12} className="mr-1" />
                  {profile?.role}
                </Badge>

                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white capitalize"
                >
                  {profile?.subscription_type || "Free"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white capitalize"
                >
                  {profile?.status || "Free"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= INFO GRID ================= */}
      <Card className="border-white/10 bg-[#111827]/70 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white">
              Account Information
            </h3>
            <p className="text-sm text-white/50">Personal and system details</p>
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
              value={profile?.phone}
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
      <div className="flex items-center gap-2 text-sm text-white/60">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-sm font-medium text-white">{value || "N/A"}</p>
    </div>
  );
}

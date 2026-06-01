"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Trash2, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "This action is permanent. Your account and all data will be deleted. Continue?",
    );
    if (!confirmDelete) return;
    try {
      setLoading(true);
      console.log("Account deleted");
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="w-full rounded-2xl bg-[#0b111a]/70 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-semibold text-[#dce4ec]">
            Account Settings
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Manage security and account preferences
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Change Password */}
          <Link
            href={`/change-password`}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.99] transition"
          >
            <Lock size={18} className="text-[#5a9e8e]" />
            <div className="text-left">
              <p className="text-sm text-white/90">Change Password</p>
              <p className="text-xs text-white/40">
                Update your account password
              </p>
            </div>
          </Link>

          {/* Delete Account */}
          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 active:scale-[0.99] transition disabled:opacity-50"
          >
            <Trash2 size={18} className="text-red-400" />

            <div className="text-left flex-1">
              <p className="text-sm text-red-300 flex items-center gap-2">
                Delete Account
                <AlertTriangle size={14} />
              </p>
              <p className="text-xs text-red-200/60">
                Permanently remove your account and data
              </p>
            </div>

            {loading && (
              <span className="text-xs text-red-300 animate-pulse">
                Deleting...
              </span>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

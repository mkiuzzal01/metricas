import AppForm from "./AppForm";
import Container from "../shared/Container";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../shared/buttons/SubmitButton";
import { Lock, ShieldCheck } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { useDeleteAccountMutation } from "@/app/redux/features/profile/profile.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { logout } from "@/app/redux/features/auth/authSlice";

export default function DeleteForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await deleteAccount(values).unwrap();
      if (res?.message) {
        toast.success(res.message);
        dispatch(logout());
        document.cookie =
          "metricas_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
        localStorage.removeItem("token");
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full relative">
      <AppForm onSubmit={onSubmit}>
        <div className="w-full max-w-md relative z-10">
          {/* Glow Background */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0f1722]/80 to-[#0a0e14]/90 blur-xl rounded-2xl" />

          {/* Card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0b111a]/70 backdrop-blur-xl p-8 shadow-2xl fade-up">
            {/* Header */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div
                className="
                  mb-4 flex items-center justify-center
                  w-14 h-14 rounded-full
                  bg-[#5a9e8e]/10
                  border border-[#5a9e8e]/20
                "
              >
                <ShieldCheck size={26} className="text-[#5a9e8e]" />
              </div>

              <h1 className="text-3xl font-semibold tracking-wide text-[#dce4ec]">
                Delete Account
              </h1>

              <p className="mt-2 text-sm text-white/50 leading-relaxed max-w-xs">
                Type your password to delete your account
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-5 text-white">
              <TextInput
                label="Current Password"
                name="password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-4">
              <SubmitButton
                title="Delete Account"
                loadingTitle="Deleting..."
                isLoading={isLoading}
                className="text-center"
              />
            </div>
          </div>
        </div>
      </AppForm>
    </Container>
  );
}

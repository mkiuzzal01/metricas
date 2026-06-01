/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginMutation } from "@/app/redux/features/auth/auth.api";
import { setUser } from "@/app/redux/features/auth/authSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import SubmitButton from "../shared/buttons/SubmitButton";
import Container from "../shared/Container";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const locale = (params.lan as string) || "en";
  const [login, { isLoading }] = useLoginMutation();

  const redirectPath = redirectUrl || `/${locale}`;

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await login(values).unwrap();

      if (res?.data?.token) {
        toast.success(res.message || "Login successful");
        dispatch(
          setUser({
            user: {
              id: res.data.user.id,
              email: res.data.user.email,
              role: res.data.user.role,
              name: res.data.user.name,
              avatar: res.data.user.avatar,
            },
            token: res.data.token,
            tokenType: res.data.token_type,
            expiresAt: res.data.expires_at,
          }),
        );

        document.cookie = `metricas_token=${res.data.token}; path=/; max-age=86400`;
        reset();
        router.push(redirectPath);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full relative metricas-bg">
      <AppForm onSubmit={onSubmit}>
        <div className="w-full max-w-md relative z-10">
          {/* Glow */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0f1722]/80 to-[#0a0e14]/90 blur-xl rounded-2xl" />

          {/* Card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0b111a]/70 backdrop-blur-xl p-8 shadow-2xl fade-up">
            {/* Header */}
            <div className="mb-8 text-center space-y-2">
              <h1 className="text-3xl font-semibold tracking-wide text-[#dce4ec]">
                Welcome back
              </h1>
              <p className="text-sm text-white/50">Login to continue</p>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
              <TextInput
                label="Email"
                name="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
              />

              <TextInput
                label="Password"
                name="password"
                placeholder="••••••••"
                type="password"
                icon={<Lock size={16} />}
              />
            </div>

            {/* Forgot */}
            <div className="w-full flex justify-end mt-2">
              <Link
                href={`/${locale}/forgot`}
                className="text-[#5a9e8e] text-xs hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-4">
              <SubmitButton isLoading={isLoading} title="Sign In" />

              <div className="text-center text-xs text-white/40">
                Don’t have an account?{" "}
                <Link
                  href={`/${locale}/registration`}
                  className="text-[#5a9e8e] hover:underline"
                >
                  Create one
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AppForm>
    </Container>
  );
}

'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { FieldValues } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import Container from '../shared/Container';
import AppForm from './AppForm';
import OtpInput from './inputs/OTPInput';
import SubmitButton from '../shared/buttons/SubmitButton';

import {
  useResendOTPMutation,
  useVerifyOtpMutation,
} from '@/app/redux/features/auth/auth.api';

interface Props {
  email?: string;
  path?: string;
}

export default function VerifyForm({ email, path }: Props) {
  const router = useRouter();
  const params = useParams();

  const locale = (params.lan as string) || 'en';

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [resendOtp, { isLoading: isResendLoading }] = useResendOTPMutation();

  // ======================
  // VERIFY OTP
  // ======================
  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      if (!email) {
        toast.error('Email is missing');
        return;
      }

      const res = await verifyOtp({
        email,
        ...values,
      }).unwrap();

      toast.success(res?.message || 'Verification successful');

      reset();

      // Forgot password flow
      if (path === 'forgot') {
        router.push(
          `/${locale}/reset?email=${encodeURIComponent(
            email,
          )}&t=${encodeURIComponent(res?.data?.token || '')}`,
        );

        return;
      }

      // Default flow
      router.push(`/${locale}/login`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Verification failed');
    }
  };

  // ======================
  // RESEND OTP
  // ======================
  const handleResendOTP = async () => {
    try {
      if (!email) {
        toast.error('Email is missing');
        return;
      }

      const res = await resendOtp({
        email,
      }).unwrap();

      toast.success(res?.message || 'OTP resent successfully');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full relative metricas-bg">
      <AppForm onSubmit={onSubmit}>
        <div className="relative z-10 w-full max-w-md">
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#0f1722]/80 to-[#0a0e14]/90 blur-xl" />

          {/* Card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0b111a]/70 backdrop-blur-xl p-8 shadow-2xl fade-up">
            {/* Header */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div
                className="
                  mb-4 flex h-14 w-14 items-center justify-center
                  rounded-full border border-[#5a9e8e]/20
                  bg-[#5a9e8e]/10
                "
              >
                <ShieldCheck size={26} className="text-[#5a9e8e]" />
              </div>

              <h1 className="text-3xl font-semibold tracking-wide text-[#dce4ec]">
                Verify code
              </h1>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
                Enter the 6-digit verification code sent to your email address
              </p>

              {email && <p className="mt-2 text-xs text-[#5a9e8e]">{email}</p>}
            </div>

            {/* OTP */}
            <div className="space-y-5">
              <OtpInput name="otp" label="Enter 6-digit code" />
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-4">
              <SubmitButton
                title="Verify Account"
                loadingTitle="Verifying..."
                isLoading={isLoading}
              />

              {/* Resend */}
              <div className="text-center text-xs text-white/40">
                Didn’t receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResendLoading || !email}
                  className="
                    text-[#5a9e8e]
                    hover:underline
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isResendLoading ? 'Resending...' : 'Resend'}
                </button>
              </div>

              {/* Back */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="
                    flex items-center gap-2
                    text-xs text-white/40
                    transition hover:text-[#5a9e8e]
                  "
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppForm>
    </Container>
  );
}

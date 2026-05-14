/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

import Container from '../shared/Container';
import AppForm from './AppForm';
import OtpInput from './inputs/OTPInput';
import {
  useResendOTPMutation,
  useVerifyOtpMutation,
} from '@/app/redux/features/auth/auth.api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SubmitButton from '../shared/buttons/SubmitButton';

interface Props {
  email?: string;
}

export default function VerifyForm({ email }: Props) {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOTPMutation();
  const router = useRouter();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await verifyOtp({ email, ...values }).unwrap();
      if (res?.message) {
        toast.success(res.message);
        reset();
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
    reset();
  };

  const handleResendOTP = async () => {
    try {
      const res = await resendOtp({ email }).unwrap();
      if (res?.message) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full relative metricas-bg">
      <AppForm onSubmit={onSubmit}>
        <div className="w-full max-w-md relative z-10">
          {/* Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1722]/80 to-[#0a0e14]/90 blur-xl rounded-2xl" />

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
                Verify code
              </h1>

              <p className="mt-2 text-sm text-white/50 leading-relaxed max-w-xs">
                Enter the 6-digit verification code sent to your email address
              </p>
            </div>

            {/* OTP */}
            <div className="space-y-5">
              <OtpInput name="otp" label="Enter 6-digit code" />
            </div>

            {/* Submit */}
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
                  className="text-[#5a9e8e] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleResendOTP}
                  disabled={isResendLoading}
                >
                  {isResendLoading ? 'Resending...' : 'Resend'}
                </button>
              </div>

              {/* Back */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="
                    flex items-center gap-2
                    text-xs text-white/40
                    hover:text-[#5a9e8e]
                    transition
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

'use client';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

import Container from '../shared/Container';
import AppForm from './AppForm';
import OtpInput from './inputs/OTPInput';

export default function VerifyForm() {
  const onSubmit = async (values: FieldValues, reset: () => void) => {
    console.log(values);
    reset();
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
              <button
                type="submit"
                className="
                  w-full py-3 rounded-lg
                  text-sm font-medium tracking-wide
                  bg-[#5a9e8e]/10
                  text-[#5a9e8e]
                  border border-[#5a9e8e]/20
                  hover:bg-[#5a9e8e]/15
                  hover:border-[#5a9e8e]/40
                  transition-all duration-300
                "
              >
                Verify Account
              </button>

              {/* Resend */}
              <div className="text-center text-xs text-white/40">
                Didn’t receive the code?{' '}
                <button
                  type="button"
                  className="text-[#5a9e8e] hover:underline"
                >
                  Resend
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

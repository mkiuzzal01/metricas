/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FieldValues } from 'react-hook-form';
import { Mail, ArrowLeft } from 'lucide-react';
import AppForm from './AppForm';
import TextInput from './inputs/TextInput';
import Container from '../shared/Container';
import { useRouter } from 'next/navigation';
import { useForgotMutation } from '@/app/redux/features/auth/auth.api';
import { toast } from 'react-toastify';
import SubmitButton from '../shared/buttons/SubmitButton';
import { useParams } from 'next/navigation';

export default function ForgotForm() {
  const params = useParams();
  const router = useRouter();
  const [forgot, { isLoading }] = useForgotMutation();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await forgot(values).unwrap();
      if (res?.message) {
        reset();
        toast.success(res.message);
        router.push(`/${params?.lan}/verify?email=${values.email}&path=forgot`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full relative metricas-bg">
      <AppForm onSubmit={onSubmit}>
        <div className="w-full max-w-md relative z-10">
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1722]/80 to-[#0a0e14]/90 blur-xl rounded-2xl" />

          {/* Card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0b111a]/70 backdrop-blur-xl p-8 shadow-2xl fade-up">
            {/* Header */}
            <div className="mb-8 text-center space-y-2">
              <h1 className="text-3xl font-semibold text-[#dce4ec] tracking-wide">
                Reset password
              </h1>
              <p className="text-sm text-white/50">
                Enter your email and we’ll send you a reset link
              </p>
            </div>

            {/* Input */}
            <div className="space-y-5">
              <TextInput
                label="Email"
                name="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
              />
            </div>

            {/* Button */}
            <div className="mt-6 space-y-4">
              <SubmitButton
                title="Send reset link"
                loadingTitle="Sending..."
                isLoading={isLoading}
              />

              {/* Back to login */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center gap-2 text-xs text-white/40 hover:text-[#5a9e8e] transition"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft size={14} />
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppForm>
    </Container>
  );
}

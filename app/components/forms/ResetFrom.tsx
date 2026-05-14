/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { FieldValues } from 'react-hook-form';
import Container from '../shared/Container';
import AppForm from './AppForm';
import TextInput from './inputs/TextInput';
import { useResetPasswordMutation } from '@/app/redux/features/auth/auth.api';
import { toast } from 'react-toastify';
import SubmitButton from '../shared/buttons/SubmitButton';
import { useRouter } from 'next/navigation';

interface Props {
  email?: string;
  t?: string;
}

export default function ResetForm({ email, t }: Props) {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    console.log(values);

    try {
      const res = await resetPassword({
        email,
        token: t,
        ...values,
      }).unwrap();

      if (res?.message) {
        toast.success(res.message);
        reset();
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
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
                Create new password
              </h1>

              <p className="mt-2 text-sm text-white/50 leading-relaxed max-w-xs">
                Your new password must be different from previously used
                passwords
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
              <TextInput
                label="New Password"
                name="password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
              />

              <TextInput
                label="Confirm Password"
                name="password_confirmation"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-4">
              <SubmitButton
                title="Update Password"
                loadingTitle="Updating..."
                isLoading={isLoading}
                className="text-center"
              />

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

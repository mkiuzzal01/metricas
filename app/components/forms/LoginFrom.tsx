'use client';

import { FieldValues } from 'react-hook-form';
import TextInput from './inputs/TextInput';
import { Mail, Lock } from 'lucide-react';
import AppForm from './AppForm';
import Container from '../shared/Container';
import Link from 'next/link';

export default function Login() {
  const onSubmit = async (values: FieldValues, reset: () => void) => {
    console.log(values);
    reset();
  };

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full relative metricas-bg">
      <AppForm onSubmit={onSubmit}>
        <div className="w-full max-w-md relative z-10">
          {/* Glow background card */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1722]/80 to-[#0a0e14]/90 blur-xl rounded-2xl" />

          {/* Main Card */}
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
            <div className="w-full flex justify-end">
              <Link
                href={'/forgot'}
                className="text-[#5a9e8e] text-xs  hover:underline cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Actions */}
            <div className="mt-6 space-y-4">
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-sm font-medium tracking-wide
                bg-[#5a9e8e]/10 text-[#5a9e8e]
                border border-[#5a9e8e]/20
                hover:bg-[#5a9e8e]/15 hover:border-[#5a9e8e]/40
                transition-all duration-300"
              >
                Sign In
              </button>

              <div className="text-center text-xs text-white/40">
                Don’t have an account?{' '}
                <Link
                  href={'/registration'}
                  className="text-[#5a9e8e] hover:underline cursor-pointer"
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

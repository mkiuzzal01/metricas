/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FieldValues } from 'react-hook-form';
import { User, Mail, Lock } from 'lucide-react';

import AppForm from './AppForm';
import Container from '../shared/Container';

import TextInput from './inputs/TextInput';
import SelectInput from './inputs/SelectInput';
import DateInput from './inputs/DateInput';
import Link from 'next/link';
import { useRegisterMutation } from '@/app/redux/features/auth/auth.api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Registration() {
  const router = useRouter();
  const [registerMember, { isLoading }] = useRegisterMutation();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await registerMember(values).unwrap();
      if (res.success && res.data?.accessToken) {
        reset();
        router.push('/login');
      }
    } catch (error: any) {
      if (error?.data?.message) {
        console.log(error.data);

        toast(error.data.message);
      } else {
        toast('Something went wrong');
      }
    }
  };

  return (
    <Container>
      <AppForm onSubmit={onSubmit}>
        <div className="w-full h-screen flex items-center justify-center max-w-lg mx-auto relative z-10">
          {/* Glow */}
          <div className="absolute inset-0 bg-linear  -to-b from-[#0f1722]/80 to-[#0a0e14]/90 blur-xl rounded-2xl" />

          {/* Card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0b111a]/70 backdrop-blur-xl p-8 shadow-2xl fade-up">
            {/* Header */}
            <div className="mb-8 text-center space-y-2">
              <h1 className="text-3xl font-semibold text-[#dce4ec] tracking-wide">
                Create account
              </h1>
              <p className="text-sm text-white/50">
                Join us and start your journey
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* Gender */}
                <SelectInput
                  name="gender"
                  label="Gender"
                  placeholder="Select gender"
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]}
                />
                {/* Date of Birth */}
                <DateInput
                  name="dob"
                  label="Date of Birth"
                  placeholder="Pick your birth date"
                />
              </div>

              {/* Name */}
              <TextInput
                label="Full Name"
                name="name"
                placeholder="John Doe"
                icon={<User size={16} />}
              />

              {/* Email */}
              <TextInput
                label="Email"
                name="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
              />
              {/* Password */}
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
              />
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg text-sm font-medium tracking-wide
                bg-[#5a9e8e]/10 text-[#5a9e8e]
                border border-[#5a9e8e]/20
                hover:bg-[#5a9e8e]/15 hover:border-[#5a9e8e]/40
                transition-all duration-300"
              >
                {isLoading ? 'Creating...' : 'Create Account'}
              </button>

              <p className="text-center text-xs text-white/40 mt-4">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-[#5a9e8e] hover:underline cursor-pointer"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AppForm>
    </Container>
  );
}

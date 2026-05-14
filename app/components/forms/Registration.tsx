/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRegisterMutation } from '@/app/redux/features/auth/auth.api';
import { Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import Container from '../shared/Container';
import AppForm from './AppForm';
import DateInput from './inputs/DateInput';
import SelectInput from './inputs/SelectInput';
import TextInput from './inputs/TextInput';
import SubmitButton from '../shared/buttons/SubmitButton';
import { useParams } from 'next/navigation';

export default function Registration() {
  const router = useRouter();
  const params = useParams();
  const [registerMember, { isLoading }] = useRegisterMutation();

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const res = await registerMember(values).unwrap();

      if (res?.message) {
        toast.success(res.message);

        reset();

        router.push(
          `/${params.lan}/verify?email=${encodeURIComponent(
            res?.data?.user?.email,
          )}`,
        );
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
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
              <SubmitButton
                title="Create Account"
                loadingTitle="Creating..."
                isLoading={isLoading}
              />

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

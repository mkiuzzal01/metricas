'use client';
import { Controller, useFormContext } from 'react-hook-form';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { cn } from '@/lib/utils';

interface OtpInputProps {
  name: string;
  length?: number;
  className?: string;
  label?: string;
}

export default function OtpInput({
  name,
  length = 6,
  className,
  label,
}: OtpInputProps) {
  const { control } = useFormContext();

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <h4 className="text-sm font-medium text-foreground">{label}</h4>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputOTP
            maxLength={length}
            value={field.value}
            onChange={field.onChange}
          >
            <InputOTPGroup className="flex items-center gap-2">
              {Array.from({ length }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="
                    h-12
                    w-12
                    rounded-lg
                    border
                    border-border
                    text-base
                    font-medium
                    transition-all
                    focus-within:border-primary
                    focus-within:ring-2
                    focus-within:ring-primary/20
                  "
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        )}
      />
    </div>
  );
}

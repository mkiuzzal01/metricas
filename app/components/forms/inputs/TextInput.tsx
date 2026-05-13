'use client';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function TextInput({
  label,
  name,
  placeholder,
  type = 'text',
  icon,
  className,
}: TextInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  const errorMessage = (errors?.[name]?.message as string | undefined) || '';

  return (
    <div className={cn('space-y-1.5 w-full mb-6', className)}>
      {/* LABEL */}
      <Label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {/* INPUT WRAPPER */}
            <div className="relative group">
              {/* LEFT ICON */}
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <span className="w-4 h-4 flex items-center justify-center">
                    {icon}
                  </span>
                </div>
              )}

              {/* INPUT */}
              <Input
                id={name}
                {...field}
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                className={cn(
                  'h-11 w-full transition',
                  'focus-visible:ring-2 focus-visible:ring-primary/30',
                  'focus-visible:border-primary',

                  icon && 'pl-9',
                  isPassword && 'pr-10',
                )}
              />

              {/* PASSWORD TOGGLE */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2',
                    'text-muted-foreground hover:text-primary',
                    'transition-colors',
                  )}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </button>
              )}
            </div>

            {/* ERROR MESSAGE */}
            {errorMessage && (
              <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
          </>
        )}
      />
    </div>
  );
}

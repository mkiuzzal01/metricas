'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function DateInput({
  name,
  label,
  placeholder = 'Pick a date',
  disabled = false,
}: Props) {
  const { control } = useFormContext();

  return (
    <div className="w-full space-y-1">
      {/* Label */}
      {label && (
        <label className="text-xs text-white/60 tracking-wide">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = field.value ? new Date(field.value) : undefined;

          return (
            <Popover>
              {/* Trigger */}
              <PopoverTrigger>
                <Button
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    'w-full max-w-full justify-start text-left font-normal',
                    'bg-[#0b111a]/70 border-white/10 text-white',
                    'hover:bg-[#0b111a]/90 transition-all',
                    'focus:ring-1 focus:ring-[#5a9e8e]/30',
                    !value && 'text-white/40',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-80" />
                  {value ? format(value, 'PPP') : placeholder}
                </Button>
              </PopoverTrigger>

              {/* Calendar */}
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(date) => field.onChange(date)}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}

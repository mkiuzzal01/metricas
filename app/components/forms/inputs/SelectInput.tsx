'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
};

export default function SelectInput({
  name,
  label,
  placeholder = 'Select...',
  options,
}: Props) {
  const { control } = useFormContext();

  return (
    <div className="w-full space-y-1">
      {label && <label className="text-xs text-white/60">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className="
                w-full
                bg-[#0b111a]/70
                border-white/10
                text-white
                focus:ring-[#5a9e8e]/30
              "
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="bg-[#0b111a] border-white/10 text-white">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

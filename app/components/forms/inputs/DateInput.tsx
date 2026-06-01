"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
};

export function DateInput({
  name,
  label = "Date",
  placeholder = "Select date",
  className = "mx-auto w-44",
}: DateInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const [open, setOpen] = React.useState(false);

        return (
          <Field className={className}>
            <FieldLabel htmlFor={name} className="text-xs text-gray-400">
              {label}
            </FieldLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <Button
                  type="button"
                  variant="outline"
                  id={name}
                  className="w-full justify-start font-medium bg-transparent text-gray-400 border border-white/20"
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString("en-GB")
                    : placeholder}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(selected) => {
                    field.onChange(selected);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
        );
      }}
    />
  );
}

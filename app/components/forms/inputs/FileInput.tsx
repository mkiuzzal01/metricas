"use client";

import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";

import Image from "next/image";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FileInputProps {
  label: string;
  name: string;
  accept?: string;
  className?: string;
}

export default function FileInput({
  label,
  name,
  accept = "image/*",
  className,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
      {/* LABEL */}
      <Label htmlFor={name} className="text-sm font-medium text-gray-300">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const preview =
            value instanceof File ? URL.createObjectURL(value) : null;

          return (
            <>
              {/* FILE AREA */}
              <div
                onClick={() => inputRef.current?.click()}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/10",
                  "bg-[#0b111a]/70 backdrop-blur-xl",
                  "hover:border-[#5a9e8e]/40 transition cursor-pointer",
                  "flex flex-col items-center justify-center",
                  "min-h-[220px] p-6",
                )}
              >
                <input
                  ref={inputRef}
                  id={name}
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                />

                {preview ? (
                  <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />

                    {/* REMOVE BUTTON */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(null);
                      }}
                      className={cn(
                        "absolute top-3 right-3 z-10",
                        "flex items-center justify-center",
                        "h-8 w-8 rounded-full",
                        "bg-black/60 text-white",
                        "hover:bg-red-500 transition",
                      )}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "mb-4 flex items-center justify-center",
                        "w-14 h-14 rounded-full",
                        "bg-[#5a9e8e]/10",
                        "border border-[#5a9e8e]/20",
                      )}
                    >
                      <ImagePlus size={26} className="text-[#5a9e8e]" />
                    </div>

                    <h3 className="text-sm font-medium text-white">
                      Upload File
                    </h3>

                    <p className="mt-1 text-xs text-white/50">
                      Click to browse your files
                    </p>
                  </div>
                )}
              </div>

              {/* ERROR */}
              {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

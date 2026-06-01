"use client";
import { FieldValues } from "react-hook-form";
import AppForm from "./AppForm";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, User } from "lucide-react";
import SubmitButton from "../shared/buttons/SubmitButton";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import FileInput from "./inputs/FileInput";
import { DateInput } from "./inputs/DateInput";
import { useUpdateProfileMutation } from "@/app/redux/features/profile/profile.api";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const router = useRouter();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();

      // handle normal fields
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);

      // handle date
      if (values.dob) {
        formData.append("dob", values.dob.toISOString());
      }

      // handle avatar (FILE)
      if (values.avatar instanceof File) {
        formData.append("avatar", values.avatar);
      }

      const res = await updateProfile(formData).unwrap();
      if (res?.message) {
        toast.success(res.message);
        router.push(`/profile`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <AppForm onSubmit={onSubmit}>
      <div className="min-h-screen flex items-center justify-center  relative z-10">
        <div className="relative rounded-2xl border border-white/10  backdrop-blur-xl p-8 shadow-2xl fade-up">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="text-3xl font-semibold tracking-wide text-[#dce4ec]">
              Update Profile
            </h1>
            <p className="mt-2 text-sm text-white/50 leading-relaxed max-w-xs">
              Update your profile information
            </p>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <DateInput
              className="w-full"
              name="dob"
              label="Date of Birth"
              placeholder="select birth date"
            />

            <SelectInput
              name="gender"
              label="Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
            <TextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              icon={<User size={16} />}
            />

            <TextInput
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              icon={<Phone size={16} />}
            />
            <div className="col-span-2">
              <FileInput label="Profile Image" name="avatar" />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-4">
            <SubmitButton
              isLoading={isLoading}
              title="Update Password"
              loadingTitle="Updating..."
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
  );
}

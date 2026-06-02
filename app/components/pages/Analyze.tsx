/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AnalysisAnimation from "../util/AnalysisAnimation";
import ErrorMessage from "../message/ErrorMessage";

interface Props {
  dic: any;
  lan: "en" | "de";
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  address: string;
}

export default function Analyze({
  dic,
  lan,
  isLoading,
  isSuccess,
  isError,
  address,
}: Props) {
  // LOADING STATE
  if (isLoading) {
    return (
      <AnalysisAnimation
        dic={dic}
        lan={lan}
        isSuccess={isSuccess}
        address={address}
      />
    );
  }

  // ERROR STATE
  if (isError) {
    const handleRetry = () => {
      window.location.reload();
    };

    return (
      <ErrorMessage
        title={dic?.error?.title || "Something went wrong!"}
        message={dic?.error?.message || "Please try again later."}
        icon="⚠️"
        buttonText="Try again"
        action={handleRetry}
      />
    );
  }

  return null;
}

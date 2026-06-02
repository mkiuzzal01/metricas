"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/Firebase";

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.933 32.674 29.403 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.268 4 24 4c-7.682 0-14.337 4.327-17.694 10.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.372 0-9.9-3.317-11.659-8.021l-6.54 5.025C9.1 39.556 15.883 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a11.953 11.953 0 0 1-4.084 5.565l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"
    />
  </svg>
);

export default function SocialLogin() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const user = result.user;

      const token = await user.getIdToken();

      console.log("User:", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
        token,
      });
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`
          w-full  my-2
          flex items-center justify-center gap-3
          px-5 py-3
          border border-gray-300
          rounded-xl
          shadow-sm
          transition-all duration-200
          hover:shadow-md hover:bg-gray-50
          active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : (
          <GoogleIcon />
        )}

        <span className="text-gray-500 font-medium text-sm sm:text-base">
          {loading ? "Signing in..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}

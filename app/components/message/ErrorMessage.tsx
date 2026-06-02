interface ErrorMessageProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  action?: () => void;
  className?: string;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again later.",
  icon,
  buttonText,
  action,
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      className={`h-screen flex flex-col items-center justify-center text-center px-4 py-10 ${className}`}
    >
      <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
        {/* Icon */}
        <div className="mb-4 flex justify-center text-3xl">{icon || "⚠️"}</div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-red-700">{title}</h3>

        {/* Message */}
        {message && (
          <p className="mt-2 text-sm leading-6 text-red-600">{message}</p>
        )}

        {/* Action Button */}
        {action && buttonText && (
          <button
            onClick={action}
            className="mt-5 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

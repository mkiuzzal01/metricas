interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300">
        ⚠️ {message || "Something went wrong!"}
      </div>
    </div>
  );
}

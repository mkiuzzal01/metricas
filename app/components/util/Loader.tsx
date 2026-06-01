export default function Loader() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
        <p className="text-sm font-medium text-gray-500">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

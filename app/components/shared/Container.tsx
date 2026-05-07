export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container mx-auto px-2 lg:px-0 ${className}`}>
      {children}
    </div>
  );
}

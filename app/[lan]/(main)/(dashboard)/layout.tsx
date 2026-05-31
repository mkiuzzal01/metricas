import Aside from "./__components/Aside";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full justify-between gap-10">
      <Aside />
      <main className="flex-1">{children}</main>
    </div>
  );
}

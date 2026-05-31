import SaideBar from "./__components/SaideBar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full justify-between gap-10">
      <aside className="hidden min-w-1/5 md:block">
        <SaideBar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

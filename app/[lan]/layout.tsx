import { notFound } from "next/navigation";
import Footer from "../components/layouts/Footer";
import Navigation from "../components/layouts/Navigation";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lan: string }>;
}>) {
  const { lan } = await params;
  if (!lan) notFound();

  return (
    <div className="h-screen flex flex-col ">
      <Navigation lan={lan as "en" | "de"} />
      <main className="flex-1">{children}</main>
      <Footer lan={lan as "en" | "de"} />
    </div>
  );
}

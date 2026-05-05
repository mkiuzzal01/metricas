import { notFound } from 'next/navigation';
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lan: 'en' | 'de' }>;
}>) {
  const { lan } = await params;
  if (!lan) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lan={lan} />
      <main className="flex-1">{children}</main>
      <Footer lan={lan} />
    </div>
  );
}

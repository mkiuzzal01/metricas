import ResetFrom from '@/app/components/forms/ResetFrom';

interface Props {
  searchParams: Promise<{ email?: string; t?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { email, t } = await searchParams;
  return <ResetFrom email={email} t={t} />;
}

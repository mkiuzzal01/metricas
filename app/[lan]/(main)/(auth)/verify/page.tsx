import VerifyFrom from '@/app/components/forms/VerifyFrom';

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function Verify({ searchParams }: Props) {
  const { email } = await searchParams;
  return <VerifyFrom email={email} />;
}

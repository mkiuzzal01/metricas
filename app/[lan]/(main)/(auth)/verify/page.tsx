import VerifyFrom from '@/app/components/forms/VerifyFrom';

interface Props {
  searchParams: Promise<{ email?: string; path?: string }>;
}

export default async function Verify({ searchParams }: Props) {
  const { email, path } = await searchParams;
  return <VerifyFrom email={email} path={path} />;
}

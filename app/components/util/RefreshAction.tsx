'use client';

interface Props {
  children: React.ReactNode;
}

export default function RefreshAction({ children }: Props) {
  return <button onClick={() => window.location.reload()}>{children}</button>;
}

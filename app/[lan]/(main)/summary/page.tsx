import Summery from '@/app/components/pages/Summery';
import { getDictionary } from '../../dictionaries';

interface Props {
  params: Promise<{ lan: 'en' | 'de' }>;
}

export default async function page({ params }: Props) {
  const { lan } = await params;
  const dic = await getDictionary(lan);
  return <Summery dic={dic} />;
}

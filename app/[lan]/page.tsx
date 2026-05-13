import StartSurvey from '../components/pages/StartSurvey';
import { getDictionary } from './dictionaries';

interface Props {
  params: Promise<{ lan: 'en' | 'de' }>;
}

export default async function Page({ params }: Props) {
  const { lan } = await params;
  const dic = await getDictionary(lan);

  return (
    <div className="flex justify-center items-center">
      <StartSurvey lan={lan} dic={dic} />
    </div>
  );
}

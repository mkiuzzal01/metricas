import InitialView from '../components/pages/InitialView';
import Container from '../components/shared/Container';
import { getDictionary } from './dictionaries';

interface Props {
  params: Promise<{ lan: 'en' | 'de' }>;
}

export default async function Page({ params }: Props) {
  const { lan } = await params;
  const dic = await getDictionary(lan);

  return (
    <Container>
      <div className="flex items-center justify-center">
        <InitialView lan={lan} dic={dic} />
      </div>
    </Container>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/app/redux/hooks';
import AnalysisAnimation from '../util/AnalysisAnimation';

interface Props {
  dic: any;
}

export default function Analyze({ dic }: Props) {
  const { summaryId } = useAppSelector((state) => state.survey);
  const addressList = dic.address;
  const currentAddress = addressList?.find(
    (item: any) => item.id === summaryId,
  );

  return <AnalysisAnimation dic={dic} addr={currentAddress?.addressLong} />;
}

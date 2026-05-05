/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAppSelector } from '@/app/redux/hooks';
import InitialView from './InitialView';
import Search from './Search';
import Summery from './Summery';
import Analyze from './Analyze';

interface Props {
  dic: any;
}

export default function StartSurvey({ dic }: Props) {
  const step = useAppSelector((state) => state.survey.step);

  switch (step) {
    case 'initialView':
      return <InitialView dic={dic} />;
    case 'search':
      return <Search dic={dic} />;
    case 'analysis':
      return <Analyze dic={dic} />;
    case 'summary':
      return <Summery dic={dic} />;
    default:
      return null;
  }
}

import { getValueReport } from "@/actions/quires/valuation.api";
import { getDictionary } from "@/app/[lan]/dictionaries";
import Summery from "@/app/components/pages/Summery";

interface Props {
  params: Promise<{ lan: "en" | "de"; id: string }>;
}

export default async function page({ params }: Props) {
  const { lan, id } = await params;
  const dic = await getDictionary(lan);

  let valueReport = null;

  if (id === "demo") {
    valueReport = { data: dic?.summary["01"] };
  } else {
    valueReport = await getValueReport(id);
  }

  return <Summery lan={lan} dic={dic} valueReport={valueReport} id={id} />;
}

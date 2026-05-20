import SearchInput from "@/app/components/pages/Search";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lan: "en" | "de" }>;
}

export default async function page({ params }: Props) {
  const { lan } = await params;
  const dic = await getDictionary(lan);
  return <SearchInput dic={dic} lan={lan} />;
}

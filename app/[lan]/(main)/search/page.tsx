/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchInput from "@/app/components/pages/Search";
import { getDictionary } from "../../dictionaries";
import { getValueReportList } from "@/actions/quires/valuation.api";
import { toast } from "react-toastify";

interface Props {
  params: Promise<{ lan: "en" | "de" }>;
}

export default async function SearchPage({ params }: Props) {
  const { lan } = await params;
  const dic = await getDictionary(lan);

  let data: any = [];
  try {
    data = await getValueReportList();
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to fetch data");
    // console.log(error);
  }

  return <SearchInput dic={dic} lan={lan} suggestions={data?.data} />;
}

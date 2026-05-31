import { getDictionary } from "@/app/[lan]/dictionaries";
import { getNavigationLinks } from "./navigation-links";
import Navbar from "./Navbar";

interface Props {
  lan: "en" | "de";
}

export default async function Navigation({ lan }: Props) {
  const dic = await getDictionary(lan);
  const navLinks = await getNavigationLinks(lan);

  return <Navbar lan={lan} navLinks={navLinks} dic={dic} />;
}

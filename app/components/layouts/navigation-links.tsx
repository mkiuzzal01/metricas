import { getDictionary } from "@/app/[lan]/dictionaries";
import { JSX } from "react";

export interface NavigationLink {
  label: string;
  href: string;
  icon?: JSX.Element;
}

export const getNavigationLinks = async (
  lan: "en" | "de",
): Promise<NavigationLink[]> => {
  const dict = await getDictionary(lan);

  return [
    {
      label: dict.nav.dashboard,
      href: `/${lan}/dashboard`,
    },
    {
      label: dict.nav.pricing,
      href: `/${lan}/pricing-plan`,
    },
  ];
};

export const getFooterLinks = async (
  lan: "en" | "de",
): Promise<NavigationLink[]> => {
  const dict = await getDictionary(lan);

  return [
    {
      label: dict.footer.sprengnetterAVM,
      href: `/${lan}/sprengnetter-avm`,
    },
    {
      label: dict.footer.quisitor,
      href: `/${lan}/quisitor`,
    },
    {
      label: dict.footer.geomap,
      href: `/${lan}/geomap`,
    },
    {
      label: dict.footer.sprengnetter,
      href: `/${lan}/sprengnetter`,
    },
    {
      label: dict.footer.maps21,
      href: `/${lan}/maps21`,
    },
  ];
};

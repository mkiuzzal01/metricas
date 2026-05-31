import { getDictionary } from "@/app/[lan]/dictionaries";
import { cookies } from "next/headers";
import { JSXElementConstructor } from "react";

export interface NavigationLink {
  label: string;
  href: string;
  icon?: JSXElementConstructor<any>;
}

export const getNavigationLinks = async (
  lan: "en" | "de",
): Promise<NavigationLink[]> => {
  const dict = await getDictionary(lan);
  const token = (await cookies()).get("metricas_token");

  return [
    {
      label: token ? dict.nav.dashboard : dict.nav.login,
      href: token ? `/${lan}/profile` : `/${lan}/login`,
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

export const aside: NavigationLink[] = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Subscriptions",
    href: "/my-subscription",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

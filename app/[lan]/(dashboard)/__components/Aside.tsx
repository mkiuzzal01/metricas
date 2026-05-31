"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NavigationLink } from "@/app/components/layouts/navigation-links";

interface AsideProps {
  items: NavigationLink[];
}

export default function Aside({ items }: AsideProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-full flex-col">
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}

"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NavigationLink } from "@/app/components/layouts/navigation-links";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/app/redux/hooks";
import { logout } from "@/app/redux/features/auth/authSlice";

interface AsideProps {
  items: NavigationLink[];
}

export default function Aside({ items }: AsideProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    document.cookie =
      "metricas_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    localStorage.removeItem("token");
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10">
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
                  "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                {/* Active indicator bar */}
                <span
                  className={cn(
                    "absolute left-0 h-5 w-1 rounded-r-full transition-all",
                    isActive ? "bg-primary" : "bg-transparent",
                  )}
                />

                <span className="pl-2">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4 bg-white/20" />
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          <LogOut size={14} className="mr-2" />
          Logout
        </Button>
      </ScrollArea>
    </aside>
  );
}

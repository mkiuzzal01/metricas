"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, User, Settings, CreditCard, LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useAppDispatch } from "@/app/redux/hooks";
import { logout } from "@/app/redux/features/auth/authSlice";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Aside() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const menu = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Subscriptions", href: "/my-subscription", icon: CreditCard },
  ];

  const footer = [{ name: "Settings", href: "/settings", icon: Settings }];

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const NavItem = ({ item }: any) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link href={item.href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={`w-full justify-start gap-2 text-sm font-medium ${
            isActive ? "bg-primary/10 text-primary" : ""
          }`}
        >
          <Icon size={16} />
          {item.name}
        </Button>
      </Link>
    );
  };

  const SidebarContent = () => (
    <>
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {menu.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        <Separator className="my-4 bg-white/10" />

        <div className="space-y-2">
          {footer.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </ScrollArea>
    </>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex h-screen w-64 border-r border-white/10 flex-col">
        <SidebarContent />
      </aside>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
        <div className="font-bold">Dashboard</div>

        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon">
              <Menu size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

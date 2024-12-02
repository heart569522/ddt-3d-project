"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  CircleDashed,
  CircleDotDashed,
  CircleUser,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn-ui/sheet";
import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { navAdminMenu } from "@/lib/data";
import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { useAuthRefresh } from "@/hooks/useAuthRefresh";

type OpenSubMenus = {
  [key: number]: boolean;
};

export default function AdminNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  // useAuthRefresh();

  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<OpenSubMenus>({});
  const { data: session } = useSession();

  useEffect(() => {
    const initialOpenSubMenus: OpenSubMenus = {};
    navAdminMenu.forEach((item, i) => {
      if (item.sub_menu && item.sub_menu.length > 0) {
        item.sub_menu.forEach((subItem) => {
          if (subItem.href === pathname) {
            initialOpenSubMenus[i] = true;
          }
        });
      }
    });
    setOpenSubMenus(initialOpenSubMenus);
  }, [pathname]);

  const toggleSubMenu = (index: any) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMenuItemClick = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-[290px_1fr] relative">
      <div className="hidden border-r bg-background md:block z-50 shadow-lg">
        <div className="flex h-full max-h-screen flex-col gap-2 w-[290px] fixed">
          <div className="flex h-14 items-center border-b px-4 md:h-[60px] md:px-6">
            <Link
              href="#"
              className="flex cursor-default items-center gap-3 font-semibold"
            >
              <Image
                src={"/avatar/cmu-egn.jpg"}
                alt="cmu_egn_icon"
                width={50}
                height={50}
                className="h-8 w-8 rounded-lg"
                loading="lazy"
              />
              <h1 className="text-xl uppercase">DDT Admin</h1>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium md:px-4 gap-2">
              {navAdminMenu.map((item, i) => {
                const Icon = item.icon;
                const hasSubMenu = item.sub_menu && item.sub_menu.length > 0;
                const isMenuActive = pathname.startsWith(item.href);

                return (
                  <div key={i}>
                    {!hasSubMenu ? (
                      <Link
                        key={i}
                        href={item.href}
                        className={cn(
                          "flex items-center text-base uppercase gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary/30",
                          isMenuActive
                            ? "bg-primary hover:bg-primary text-primary-foreground"
                            : ""
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    ) : (
                      <div
                        className={cn(
                          "flex justify-between items-center uppercase text-base gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all dark:text-primary-foreground dark:hover:text-primary hover:text-primary cursor-pointer",
                          isMenuActive
                            ? "text-primary bg-muted"
                            : "text-muted-foreground"
                        )}
                        onClick={() => toggleSubMenu(i)}
                      >
                        <div className="flex gap-3 items-center">
                          <Icon className="h-4 w-4" />
                          {item.name}
                        </div>
                        <ChevronDown />
                      </div>
                    )}
                    {hasSubMenu && openSubMenus[i] && (
                      <div className="pl-8 mt-2 space-y-2 bg-secondary rounded-lg">
                        {item.sub_menu.map((subItem, j) => (
                          <Link
                            key={j}
                            href={subItem.href}
                            className={cn(
                              "flex items-center text-sm gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all dark:text-primary-foreground dark:hover:text-primary hover:text-primary",
                              subItem.href === pathname
                                ? "text-primary dark:text-primary bg-muted"
                                : "text-muted-foreground"
                            )}
                          >
                            {subItem.href === pathname ? (
                              <CircleDotDashed className="w-4 h-4" />
                            ) : (
                              <CircleDashed className="w-4 h-4" />
                            )}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto">
        <header className="flex h-14 items-center gap-2 border-b bg-background px-4 md:h-[60px] w-full md:w-[calc(100%-290px)] fixed md:px-6 z-50 shadow-sm">
          <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-base font-medium">
                <Link
                  href="/admin/management"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Image
                    src={"/avatar/cmu-egn.jpg"}
                    alt="info_icon"
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-lg"
                    loading="lazy"
                  />
                  <SheetTitle className="uppercase">DDT ADMIN</SheetTitle>
                  <SheetDescription></SheetDescription>
                </Link>
                <hr className="my-2" />
                {navAdminMenu.map((item, i) => {
                  const Icon = item.icon;
                  const hasSubMenu = item.sub_menu && item.sub_menu.length > 0;
                  const isMenuActive = pathname.startsWith(item.href);

                  return (
                    <div key={i}>
                      {!hasSubMenu ? (
                        <Link
                          href={item.href}
                          onClick={handleMenuItemClick}
                          className={cn(
                            "mx-[-0.65rem] uppercase flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-primary/30",
                            isMenuActive
                              ? "bg-primary hover:bg-primary text-primary-foreground"
                              : ""
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      ) : (
                        <div
                          className={cn(
                            "mx-[-0.65rem] uppercase justify-between flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground dark:text-primary-foreground dark:hover:text-primary hover:text-primary",
                            isMenuActive
                              ? "text-primary bg-muted"
                              : "text-muted-foreground"
                          )}
                          onClick={() => toggleSubMenu(i)}
                        >
                          <div className="flex gap-3 items-center">
                            <Icon className="h-5 w-5" />
                            {item.name}
                          </div>
                          <ChevronDown />
                        </div>
                      )}
                      {hasSubMenu && openSubMenus[i] && (
                        <div className="pl-5 mt-2 space-y-2 bg-secondary rounded-lg">
                          {item.sub_menu.map((subItem, j) => (
                            <Link
                              key={j}
                              href={subItem.href}
                              onClick={handleMenuItemClick}
                              className={cn(
                                "flex items-center text-sm gap-2 rounded-lg px-3 py-2 text-muted-foreground dark:text-primary-foreground dark:hover:text-primary transition-all hover:text-primary",
                                subItem.href === pathname
                                  ? "text-primary dark:text-primary bg-muted"
                                  : "text-muted-foreground"
                              )}
                            >
                              {subItem.href === pathname ? (
                                <CircleDotDashed className="w-4 h-4" />
                              ) : (
                                <CircleDashed className="w-4 h-4" />
                              )}
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative"></div>
            </form>
          </div>
          <ThemeSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="uppercase text-primary font-bold">
                {session?.user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  signOut({ redirect: false }).then(() => {
                    window.location.replace("/faculty");
                  })
                }
              >
                <p>ออกจากระบบ</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}

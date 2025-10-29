"use client";

import { Nav } from "@/app/components/features/sidebar/nav-main";
import { Separator } from "@/app/components/ui/separator";
import { Sidebar, SidebarContent } from "@/app/components/ui/sidebar";
import {
  Bookmark,
  BookOpenText,
  ChartColumnStacked,
  Home,
  User,
  Users,
} from "lucide-react";
import type * as React from "react";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: false,
    },
    { title: "Library", url: "#", icon: Bookmark, isActive: false },
    { title: "Profile", url: "#", icon: User, isActive: false },
    { title: "Stories", url: "#", icon: BookOpenText, isActive: false },
    { title: "Stats", url: "#", icon: ChartColumnStacked, isActive: false },
  ],
  navSecondary: [
    { title: "Followings", url: "#", icon: Users, isActive: false },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-15"
      {...props}
    >
      <SidebarContent className="bg-background dark:bg-neutral-950">
        <Nav items={data.navMain} />
        <Separator />
        <Nav items={data.navSecondary} />
      </SidebarContent>
    </Sidebar>
  );
}

"use client";

import { Button } from "@/app/components/ui/button";
import { useSidebar } from "@/app/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      variant={"link"}
      className="cursor-pointer"
    >
      <Menu />
    </Button>
  );
}

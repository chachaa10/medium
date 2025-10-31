"use client";

import { Menu } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useSidebar } from "@/app/components/ui/sidebar";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button onClick={toggleSidebar} variant={"link"} className="cursor-pointer">
      <Menu />
    </Button>
  );
}

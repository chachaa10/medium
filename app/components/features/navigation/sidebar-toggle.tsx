"use client";

import { Button } from "@/app/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function SidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Button
      onClick={handleSidebarToggle}
      variant={"link"}
      className="cursor-pointer"
    >
      <Menu />
    </Button>
  );
}

"use client";
import { ThemeToggle } from "../theme-button";

export default function Header() {
  return (
    <header>
      <ThemeToggle className="top-4 right-8 absolute" />
    </header>
  );
}

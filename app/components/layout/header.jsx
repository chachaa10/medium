import Logo from "@/app/components/features/navigation/logo";
import Search from "@/app/components/features/navigation/search";
import SidebarToggle from "@/app/components/features/navigation/sidebar-toggle";
import Logout from "@/app/components/logout-button";
import { ThemeToggle } from "@/app/components/theme-button";
import { getCurrentUser } from "@/app/data/user";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="left-0 z-99 fixed flex justify-between items-center bg-background dark:bg-neutral-950 border-b w-full h-15">
      {session ? (
        <div className="flex items-center">
          <SidebarToggle />
          <Logo />
          <Search />
        </div>
      ) : (
        <Logo />
      )}
      <div className="flex gap-2 pr-4">
        {session && <Logout />}
        <ThemeToggle />
      </div>
    </header>
  );
}

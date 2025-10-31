import Link from "next/link";
import Logo from "@/app/components/features/navbar/logo";
import Logout from "@/app/components/features/navbar/logout-button";
import Search from "@/app/components/features/navbar/search";
import SidebarToggle from "@/app/components/features/navbar/sidebar-toggle";
import { ThemeToggle } from "@/app/components/features/navbar/theme-button";
import { getCurrentUser } from "@/app/data/users";
import WriteIcon from "../features/navbar/write-icon";
import { Button } from "../ui/button";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="left-0 z-99 fixed flex justify-between items-center bg-background dark:bg-neutral-950 border-b w-full h-15">
      {session ? (
        <div className="flex items-center gap-2">
          <SidebarToggle />
          <Logo />
          <Search />
        </div>
      ) : (
        <Logo className="ml-4" />
      )}
      <div className="flex gap-4 pr-4">
        {session && (
          <>
            <Button asChild variant={"outline"}>
              <Link href="/new-post">
                <WriteIcon />
              </Link>
            </Button>
            <Logout />
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}

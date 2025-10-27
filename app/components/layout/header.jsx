import Logout from "@/app/components/logout-button";
import { ThemeToggle } from "@/app/components/theme-button";
import { getCurrentUser } from "@/app/data/user";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-3xl">Medium</h1>
      </div>
      <div className="flex gap-2">
        {session && <Logout />}
        <ThemeToggle />
      </div>
    </header>
  );
}

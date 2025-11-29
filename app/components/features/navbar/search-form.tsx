import { Search } from "lucide-react";

import { Label } from "@/app/components/ui/label";
import { SidebarInput } from "@/app/components/ui/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label className="sr-only" htmlFor="search">
          Search
        </Label>
        <SidebarInput
          className="pl-7 h-8"
          id="search"
          placeholder="Type to search..."
        />
        <Search className="top-1/2 left-2 absolute opacity-50 size-4 -translate-y-1/2 pointer-events-none select-none" />
      </div>
    </form>
  );
}

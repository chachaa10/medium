import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="relative flex items-center w-full max-w-sm">
      <div className="left-3 absolute size-4 text-muted-foreground -translate-y-1">
        <Label
          htmlFor="search"
          aria-label="search"
        >
          <SearchIcon />
        </Label>
      </div>
      <Input
        id="search"
        placeholder="Search"
        type={"search"}
        className="bg-neutral-50 py-4 pl-10 rounded-2xl text-regular"
      />
    </div>
  );
}

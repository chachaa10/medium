import { Input } from "@/app/components/ui/input";

export default function TitleInput() {
  return (
    <Input
      placeholder="What's on your mind?"
      className="dark:bg-transparent bg-none px-4 py-6 border border-gray-300 focus-visible:border-gray-300 focus-visible:ring-0 font-semibold"
    />
  );
}

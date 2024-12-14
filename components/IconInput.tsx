import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

export default function IconInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="relative">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <FaSearch className="h-4 w-4" />
        </div>
        <Input
          type="text"
          placeholder="Search Voice/Language"
          className="w-full rounded-lg bg-background pl-8 border border-gray-500"
          {...props} // Spread the props here
        />
      </div>
    </div>
  );
}

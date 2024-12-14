import { Loader2 } from "lucide-react"; // If using ShadCN, import Lucide spinner
import { Textarea } from "./ui/textarea";

export function TextareaWithSpinner({
  value,
  setPrompt,
  setPromptArg,
  loading,
}: {
  value: string;
  setPrompt: (value: string) => void;
  setPromptArg: (value: string) => void;
  loading: boolean;
}) {
  return (
    <div className="relative w-full">
      <Textarea
        value={value}
        onChange={(e) => {
          setPrompt(e.target.value);
          setPromptArg(e.target.value);
        }}
        className={`w-full h-80 rounded-md border border-gray-300 ${
          loading ? "opacity-50" : ""
        }`}
        disabled={loading}
      />

      {/* Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
          {/* Tailwind Spinner */}
          {/* <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div> */}

          {/* ShadCN / Lucide Spinner */}
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
}

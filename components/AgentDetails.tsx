import { Input } from "@/components/ui/input";
import { DebouncedInput } from "./DebouncedInput"; // Import the DebouncedInput component
import { DebouncedTextarea } from "./DebouncedTextarea"; // Import the DebouncedTextarea component
import { AgentResponse } from "retell-sdk/resources/agent.mjs";
import { LlmResponse } from "retell-sdk/resources/llm.mjs";
import { useState, useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { TextareaWithSpinner } from "./TextareaWithSpinner";

export default function AgentDetails({
  selectedAgent,
  selectedLLM,
  setName: setNameArg,
  setPrompt: setPromptArg,
  loading,
}: {
  selectedAgent: AgentResponse;
  selectedLLM: LlmResponse;
  setName: (name: string) => void;
  setPrompt: (prompt: string) => void;
  loading: boolean;
}) {
  const [name, setName] = useState(selectedAgent.agent_name || "");
  const [prompt, setPrompt] = useState(selectedLLM.general_prompt || "");
  // const previousAgentId = useRef(selectedAgent.agent_id);

  // useEffect(() => {
  //   previousAgentId.current = selectedAgent.agent_id;
  // }, [selectedAgent.agent_id]);

  useEffect(() => {
    setName(selectedAgent.agent_name || "");
  }, [selectedAgent.agent_name]);

  useEffect(() => {
    setPrompt(selectedLLM.general_prompt || "");
  }, [selectedLLM.general_prompt]);

  return (
    <div className="w-1/2 px-4 bg-gray-100 flex-1 py-10">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Name</label>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameArg(e.target.value);
          }}
          className="w-full rounded-md border border-gray-300"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Prompt</label>
        <TextareaWithSpinner
          value={prompt}
          setPrompt={setPrompt}
          setPromptArg={setPromptArg}
          // className={`w-full h-80 rounded-md border border-gray-300 ${
          //   loading ? "opacity-50" : ""
          // }`}
          // disabled={loading}
          loading={loading}
        />
      </div>
    </div>
  );
}

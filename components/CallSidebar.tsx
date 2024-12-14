"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Call from "./Call";
import WebCall from "./WebCall";
import Chat from "./Chat";
import { PhoneNumberListResponse } from "retell-sdk/resources/phone-number.mjs";
import { AgentResponse } from "retell-sdk/resources/agent.mjs";

export default function CallSidebar({
  numbers,
  selectedAgent,
}: {
  numbers: PhoneNumberListResponse;
  selectedAgent: AgentResponse;
}) {
  const [activeMode, setActiveMode] = useState("call");
  const [messages, setMessages] = useState<
    { role: "user" | "agent"; content: string }[]
  >([{ role: "agent", content: "" }]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [callerName, setCallerName] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [callerNumber, setCallerNumber] = useState("");

  useEffect(() => {
    setMessages([{ role: "agent", content: "" }]);
    setSelectedNumber("");
    setCallerName("");
    setIsCalling(false);
    setCallerNumber("");
  }, [selectedAgent]);

  return (
    <div className="w-full h-full p-4 border-l flex flex-col space-y-4">
      {/* Mode Toggle */}
      <div className="flex justify-between bg-[rgba(95,78,225,0.25)] p-1 rounded-md gap-2">
        <Button
          variant="default"
          onClick={() => setActiveMode("call")}
          className={`w-1/2 text-black ${
            activeMode === "call" ? "bg-white" : "bg-transparent"
          } hover:bg-white`}
        >
          Test Call
        </Button>
        <Button
          variant="default"
          onClick={() => setActiveMode("text")}
          className={`w-1/2 text-black ${
            activeMode === "text" ? "bg-white" : "bg-transparent"
          } hover:bg-white`}
        >
          Test Chat
        </Button>
      </div>

      {/* Render Components Based on Active Mode */}
      {activeMode === "call" ? (
        <>
          <Call
            numbers={numbers
              .filter((e) => e.outbound_agent_id === selectedAgent.agent_id)
              .map((e) => e.phone_number)}
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
            callerName={callerName}
            agentId={selectedAgent.agent_id}
            setCallerName={setCallerName}
            callerNumber={callerNumber}
            setCallerNumber={setCallerNumber}
          />
          <WebCall
            selectedAgent={selectedAgent}
            isCalling={isCalling}
            setIsCalling={setIsCalling}
          />
        </>
      ) : (
        <Chat
          selectedAgent={selectedAgent}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}

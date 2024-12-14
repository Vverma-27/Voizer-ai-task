"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Message from "./Message";
import { AgentResponse } from "retell-sdk/resources/agent.mjs";
import { Input } from "./ui/input";

export default function Chat({
  selectedAgent,
  messages,
  setMessages,
}: {
  selectedAgent: AgentResponse;
  messages: { role: "user" | "agent"; content: string }[];
  setMessages: Function;
}) {
  const [prompt, setPrompt] = useState("");

  const handleSendMessage = async () => {
    try {
      if (prompt.trim()) {
        setMessages([...messages, { role: "user", content: prompt.trim() }]);
        const tempMessage = prompt;
        setPrompt(""); // Clear input after sending
        const resp = await fetch(
          //@ts-expect-error because of typescript error from retell-sdk
          `/api/llm/${selectedAgent.response_engine.llm_id}/chat`,
          {
            method: "POST",
            body: JSON.stringify({
              transcript: [
                ...messages,
                { role: "user", content: tempMessage.trim() },
              ],
              // current_state: "intro",
              dynamic_variables: [],
            }),
          }
        );

        const data = await resp.json();
        if (data.transcript) {
          setMessages(data.transcript);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col pb-2 h-full justify-between">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 gap-3 max-h-[70vh] flex flex-col">
        {messages.map((msg, index) => (
          <Message key={index} content={msg.content} role={msg.role} />
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-start gap-2 p-2 pt-3 border-t bg-white min-h-[6vh]">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="bg-primary text-white">
          Send
        </Button>
      </div>
    </div>
  );
}

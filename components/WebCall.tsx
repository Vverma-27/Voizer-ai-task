"use client";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { retellWebClient } from "./HomePage";
import { AgentResponse } from "retell-sdk/resources/agent.mjs";

export default function WebCall({
  selectedAgent,
  isCalling,
  setIsCalling,
}: {
  selectedAgent: AgentResponse;
  isCalling: boolean;
  setIsCalling: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("call started");
    });

    retellWebClient.on("call_ended", () => {
      console.log("call ended");
      setIsCalling(false);
    });

    // When agent starts talking for the utterance
    // useful for animation
    retellWebClient.on("agent_start_talking", () => {
      console.log("agent_start_talking");
    });

    // When agent is done talking for the utterance
    // useful for animation
    retellWebClient.on("agent_stop_talking", () => {
      console.log("agent_stop_talking");
    });

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      // Stop the call
      retellWebClient.stopCall();
    });
    return () => {
      retellWebClient.stopCall();
      retellWebClient.removeAllListeners();
    };
  }, [selectedAgent]);
  const handleWebCall = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
      setIsCalling(false);
      return;
    }
    setIsCalling(true);

    const call = await fetch(`/api/agent/${selectedAgent.agent_id}/web-call`, {
      method: "POST",
      body: JSON.stringify({ agent_id: selectedAgent.agent_id }),
    });
    const response = await call.json();

    if (response.access_token) {
      await retellWebClient.startCall({ accessToken: response.access_token });
    } else {
      setIsCalling(false);
    }
  };

  return (
    <Button className="w-full bg-primary text-white" onClick={handleWebCall}>
      {isCalling ? "Stop Call" : "Web Call Me"}
    </Button>
  );
}

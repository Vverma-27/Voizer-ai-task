"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { retellWebClient } from "./HomePage";
import { AgentResponse } from "retell-sdk/resources/agent.mjs";

export default function WebCall({
  selectedAgent,
  isCalling,
  setIsCalling,
}: {
  selectedAgent: AgentResponse;
  isCalling: boolean;
  setIsCalling: Function;
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

    // Real time pcm audio bytes being played back, in format of Float32Array
    // only available when emitRawAudioSamples is true
    retellWebClient.on("audio", (audio) => {
      // console.log(audio);
    });

    // Update message such as transcript
    // You can get transcrit with update.transcript
    // Please note that transcript only contains last 5 sentences to avoid the payload being too large
    retellWebClient.on("update", (update) => {
      // console.log(update);
    });

    retellWebClient.on("metadata", (metadata) => {
      // console.log(metadata);
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

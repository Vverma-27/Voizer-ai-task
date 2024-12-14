"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { Divider } from "./Divider";
import IconInput from "./IconInput";
import {
  AgentListResponse,
  AgentResponse,
} from "retell-sdk/resources/index.mjs";

export default function VoiceSelector({
  selectedAgent,
  setSelectedAgent,
  agents,
}: {
  selectedAgent: string | null;
  setSelectedAgent: (agent: AgentResponse) => void;
  agents: AgentListResponse;
}) {
  const [filterText, setFilterText] = useState("");

  const convertLanguageCode = (code: string) => {
    if (code === "multi") return "English & Spanish";
    const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
    try {
      return displayNames.of(code) || "Unknown Language";
    } catch {
      return "Unknown Language";
    }
  };

  const handleAgentSelect = (agent: AgentResponse) => {
    setSelectedAgent(agent);
  };
  const filteredAgents = agents.filter((agent) => {
    const searchText = filterText.toLowerCase();

    // Split agent name and language into words
    const agentWords = agent.agent_name?.toLowerCase().split(" ") || [];
    const languageWords = convertLanguageCode(agent.language || "")
      .toLowerCase()
      .split(" ");

    // Check if any word in agentWords or languageWords starts with searchText
    return (
      agentWords.some((word) => word.startsWith(searchText)) ||
      languageWords.some((word) => word.startsWith(searchText))
    );
  });

  const uniqueLangs = Array.from(
    new Set(filteredAgents.map((agent) => agent.language))
  );
  const agentsByLang = uniqueLangs.map((lang) => ({
    lang,
    agents: filteredAgents.filter((agent) => agent.language === lang),
  }));

  return (
    <div className="w-full h-full border-r p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Select Voice</h2>
      <div className="mb-4 flex justify-center">
        <IconInput
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Search by name or language"
        />
      </div>
      <div className="space-y-6">
        {agentsByLang.map((lang) => (
          <VoiceGroup
            key={lang.lang}
            language={convertLanguageCode(lang.lang || "")}
            selectedAgent={selectedAgent}
            onSelect={handleAgentSelect}
            agents={lang.agents}
          />
        ))}
      </div>
    </div>
  );
}

function VoiceGroup({
  language,
  selectedAgent,
  onSelect,
  agents,
}: {
  language: string;
  selectedAgent: string | null;
  onSelect: (name: AgentResponse) => void;
  agents: AgentListResponse;
}) {
  return (
    <div>
      <Divider text={language} />
      {agents.map((agent) => (
        <Button
          key={agent.agent_name}
          variant="secondary"
          onClick={() => onSelect(agent)}
          className={`w-full mb-2 py-2 text-lg font-bold flex justify-between items-center 
            bg-[rgba(95,78,225,0.25)] ${
              selectedAgent === agent.agent_name
                ? "border-2 border-black shadow-lg"
                : "border border-transparent"
            } hover:border-black hover:shadow-lg hover:bg-[rgba(95,78,225,0.25)]`}
        >
          <p className="flex-1 text-left max-w-[70%] overflow-y-hidden overflow-x-auto">
            {agent.agent_name}
          </p>
          <Badge className="font-light text-xs">{"Male"}</Badge>
        </Button>
      ))}
    </div>
  );
}

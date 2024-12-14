"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import VoiceSelector from "@/components/VoiceSelectorSidebar";
import AgentDetails from "@/components/AgentDetails";
import CallSidebar from "@/components/CallSidebar";
import { FaBars, FaCalendar, FaCog, FaPhoneAlt, FaTimes } from "react-icons/fa";
import {
  AgentListResponse,
  AgentResponse,
} from "retell-sdk/resources/agent.mjs";
import { PhoneNumberListResponse } from "retell-sdk/resources/phone-number.mjs";
import { RetellWebClient } from "retell-client-js-sdk";
import { LlmResponse } from "retell-sdk/resources/llm.mjs";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "./ui/input";
import { PiHashStraightBold } from "react-icons/pi";
import { RiVoiceprintFill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

export const retellWebClient = new RetellWebClient();

export enum MODES {
  VOICE = "voice",
  SETTINGS = "settings",
  CALENDAR = "calendar",
  HASH = "hash",
}

export default function HomePage({
  agents: agentsArg,
  numbers,
}: {
  agents: AgentListResponse;
  numbers: PhoneNumberListResponse;
}) {
  const [agents, setAgents] = useState(agentsArg);
  const [selectedAgent, setSelectedAgent] = useState<AgentResponse | null>(
    null
  );
  const [selectedLLM, setSelectedLLM] = useState<LlmResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVoiceSelectorOpen, setIsVoiceSelectorOpen] = useState(false);
  const [isCallSidebarOpen, setIsCallSidebarOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedMode, setSelectedMode] = useState<MODES>(MODES.VOICE);

  useEffect(() => {
    if (!selectedAgent) return;
    const fetchLLM = async () => {
      toast.info("Fetching LLM for selected agent");
      setLoading(true);
      const response = await fetch(
        // @ts-expect-error because of typescript error from retell-sdk
        `/api/llm/${selectedAgent.response_engine.llm_id}`
      );
      const data = await response.json();
      setSelectedLLM(data);
      setLoading(false);
    };
    fetchLLM();
  }, [selectedAgent]);

  const setAgentName = (name: string) => {
    if (!selectedAgent) return;
    setSelectedAgent((se) =>
      se
        ? {
            ...se,
            agent_name: name,
          }
        : null
    );
    setAgents((ag) =>
      ag.map((a) =>
        a.agent_id === selectedAgent.agent_id
          ? {
              ...a,
              agent_name: name,
            }
          : a
      )
    );
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      fetch(`/api/agent/${selectedAgent.agent_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_name: name }),
      });
    }, 1000);
  };

  const setLLMPrompt = (prompt: string) => {
    if (!selectedLLM) return;
    setSelectedLLM((se) =>
      se
        ? {
            ...se,
            general_prompt: prompt,
          }
        : null
    );
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      fetch(`/api/llm/${selectedLLM.llm_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ general_prompt: prompt }),
      });
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col">
      <ToastContainer />
      {/* Header */}
      <header className="bg-primary text-white text-center py-4 w-full">
        <Input
          value={
            selectedAgent ? selectedAgent.agent_name || "" : "Select an Agent"
          }
          onChange={(e) => {
            setAgentName(e.target.value);
          }}
          className="bg-transparent border-none text-white text-center font-semibold"
          style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
          disabled={!selectedAgent}
        />
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Toggle Button */}
        <button
          className="md:hidden absolute top-4 left-4 p-2 text-white rounded-full bg-black"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars fontSize={20} />
        </button>

        {/* Voice Selector on Small Screens */}
        {!selectedAgent && (
          <div className="sm:hidden w-full">
            <VoiceSelector
              selectedAgent={""}
              setSelectedAgent={(agent) => {
                setSelectedAgent(agent);
                setIsVoiceSelectorOpen(false);
              }}
              agents={agents}
            />
          </div>
        )}

        {/* Voice Selector Toggle Button */}
        {selectedAgent && (
          <button
            className="sm:hidden absolute top-16 left-4 p-2 text-white rounded-full bg-black"
            onClick={() => setIsVoiceSelectorOpen(!isVoiceSelectorOpen)}
          >
            {selectedMode === MODES.VOICE ? (
              <RiVoiceprintFill fontSize={20} />
            ) : selectedMode === MODES.SETTINGS ? (
              <FaCog fontSize={20} />
            ) : selectedMode === MODES.CALENDAR ? (
              <FaCalendar fontSize={20} />
            ) : (
              <PiHashStraightBold fontSize={20} />
            )}
          </button>
        )}
        {/* Call Sidebar Toggle Button */}
        {selectedAgent ? (
          <button
            className="md:hidden absolute top-4 right-4 p-2 text-white rounded-full bg-black"
            onClick={() => setIsCallSidebarOpen(!isCallSidebarOpen)}
          >
            <FaPhoneAlt fontSize={20} />
          </button>
        ) : null}

        {/* Sidebar Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="fixed left-0 top-0 w-30 bg-white h-full shadow-md">
              <Sidebar mode={selectedMode} setSelectedMode={setSelectedMode} />
              <button
                className="absolute top-4 -right-4 p-2 bg-primary text-white rounded-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Voice Selector Drawer */}
        {isVoiceSelectorOpen && selectedAgent && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden">
            <div className="fixed left-0 top-0 w-64 bg-white h-full shadow-md">
              <VoiceSelector
                selectedAgent={selectedAgent?.agent_name || ""}
                setSelectedAgent={setSelectedAgent}
                agents={agents}
              />
              <button
                className="absolute top-4 -right-4 p-2 bg-primary text-white rounded-full"
                onClick={() => setIsVoiceSelectorOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="hidden md:block h-full">
          <Sidebar mode={selectedMode} setSelectedMode={setSelectedMode} />
        </div>
        <div className="flex flex-1">
          <div className="hidden sm:block w-full sm:w-1/3">
            <VoiceSelector
              selectedAgent={selectedAgent?.agent_name || ""}
              setSelectedAgent={setSelectedAgent}
              agents={agents}
            />
          </div>
          {selectedAgent && selectedLLM ? (
            <AgentDetails
              selectedAgent={selectedAgent}
              selectedLLM={selectedLLM}
              setName={(name: string) => {
                setAgentName(name);
              }}
              loading={loading}
              setPrompt={(prompt: string) => {
                setLLMPrompt(prompt);
              }}
            />
          ) : null}
        </div>

        {/* Call Sidebar Drawer */}
        {isCallSidebarOpen && selectedAgent && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="fixed right-0 top-0 w-64 bg-white h-full shadow-md">
              <CallSidebar numbers={numbers} selectedAgent={selectedAgent} />

              <button
                className="absolute top-4 -left-4 p-2 bg-primary text-white rounded-full"
                onClick={() => setIsCallSidebarOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Call Sidebar for larger screens */}
        {selectedAgent && selectedLLM && (
          <div className="hidden md:block md:w-1/4">
            <CallSidebar numbers={numbers} selectedAgent={selectedAgent} />
          </div>
        )}
      </div>
    </div>
  );
}

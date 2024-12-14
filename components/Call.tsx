"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

export default function Call({
  numbers,
  selectedNumber,
  setSelectedNumber,
  callerName,
  setCallerName,
  callerNumber,
  agentId,
  setCallerNumber,
}: {
  numbers: string[];
  selectedNumber: string;
  setSelectedNumber: Dispatch<SetStateAction<string>>;
  callerName: string;
  setCallerName: Dispatch<SetStateAction<string>>;
  callerNumber: string;
  setCallerNumber: Dispatch<SetStateAction<string>>;
  agentId: string;
}) {
  const handleCall = async () => {
    // Call API to start the call
    // You can use fetch or axios
    // Example
    if (!selectedNumber || !callerNumber) return;
    const response = await fetch(`/api/agent/${agentId}/phone-call`, {
      method: "POST",
      body: JSON.stringify({
        from_number: selectedNumber,
        to_number: callerNumber,
        override_agent_id: agentId,
      }),
    });
    const data = await response.json();
    if (data.status !== "error") {
      toast.success("The agent will call you shortly");
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      <Select
        onValueChange={(value) => setSelectedNumber(value)}
        value={selectedNumber}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Phone Number" />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="text"
        value={callerName}
        onChange={(e) => setCallerName(e.target.value)}
        placeholder="Enter Name"
      />

      <Input
        type="text"
        value={callerNumber}
        onChange={(e) => setCallerNumber(e.target.value)}
        placeholder="Enter Phone Number"
      />

      <Button
        className="w-full bg-primary text-white"
        disabled={!selectedNumber || !callerNumber}
        onClick={handleCall}
      >
        Call Me
      </Button>
    </div>
  );
}

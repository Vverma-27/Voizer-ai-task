"use client";
import { useState } from "react";
import { FaCog, FaCalendar } from "react-icons/fa";
import { PiHashStraightBold } from "react-icons/pi";
import { RiVoiceprintFill } from "react-icons/ri";
import { MODES } from "./HomePage";

export default function Sidebar({
  mode,
  setSelectedMode,
}: {
  mode: MODES;
  setSelectedMode: Function;
}) {
  return (
    <div className="border-r border-[rgba(0,0,0,0.6)] text-black flex flex-col items-center py-4 px-6 gap-4 h-full">
      <div
        className="relative group"
        onClick={() => setSelectedMode(MODES.VOICE)}
      >
        <div
          className={`${
            mode === MODES.VOICE ? "bg-[rgba(95,78,225,0.25)]" : ""
          } p-3 cursor-pointer hover:bg-[rgba(95,78,225,0.25)] rounded-md`}
        >
          {<RiVoiceprintFill fontSize={32} />}
        </div>
      </div>
      <div
        className="relative group"
        onClick={() => setSelectedMode(MODES.SETTINGS)}
      >
        <div
          className={`${
            mode === MODES.SETTINGS ? "bg-[rgba(95,78,225,0.25)]" : ""
          } p-3 cursor-pointer hover:bg-[rgba(95,78,225,0.25)] rounded-md`}
        >
          {<FaCog fontSize={32} />}
        </div>
      </div>
      <div
        className="relative group"
        onClick={() => setSelectedMode(MODES.CALENDAR)}
      >
        <div
          className={`${
            mode === MODES.CALENDAR ? "bg-[rgba(95,78,225,0.25)]" : ""
          } p-3 cursor-pointer hover:bg-[rgba(95,78,225,0.25)] rounded-md`}
        >
          {<FaCalendar fontSize={32} />}
        </div>
      </div>
      <div
        className="relative group"
        onClick={() => setSelectedMode(MODES.HASH)}
      >
        <div
          className={`${
            mode === MODES.HASH ? "bg-[rgba(95,78,225,0.25)]" : ""
          } p-3 cursor-pointer hover:bg-[rgba(95,78,225,0.25)] rounded-md`}
        >
          {<PiHashStraightBold fontSize={32} />}
        </div>
      </div>
    </div>
  );
}

// function SidebarIcon({
//   Icon,
//   tooltip,
// }: {
//   Icon: ()=>JSX.Element;
//   tooltip: string;
// }) {
//   return (
//     <div className="relative group">
//       {/* <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">
//         {tooltip}
//       </span> */}
//     </div>
//   );
// }

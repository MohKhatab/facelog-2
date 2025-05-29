import React from "react";
import { MdThumbDown } from "react-icons/md";

export default function InteractionButton({ icon }) {
  return (
    <div className="relative h-12 w-18">
      <input
        type="checkbox"
        className="w-full h-full -translate-1/2 top-1/2 left-1/2 opacity-0 absolute peer cursor-pointer z-10"
      />
      <div
        className="peer-checked:drop-shadow-[0_0_6px_rgba(255,115,179,0.5)]
    shadow-none transition-all duration-200
    peer-checked:bg-accent-400/10 bg-background-900/10 
    peer-checked:text-accent-500 peer-checked:border-accent-500/60
    flex items-center justify-center w-full h-full rounded-lg text-2xl 
    border border-accent-500/40 text-accent-500/40"
      >
        {icon}
      </div>
    </div>
  );
}

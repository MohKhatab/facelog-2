import React from "react";

export default function EditorButton({
  active,
  icon,
  clickHandle,
  isDisabled,
}) {
  return (
    <button
      type="button"
      onClick={clickHandle}
      disabled={isDisabled}
      className={`
      ${
        active
          ? "drop-shadow-[0_0_6px_rgba(255,115,179,0.5)] bg-accent-400/15 text-accent-500 "
          : "text-accent-500 shadow-none"
      }
     transition-all duration-200  cursor-pointer flex items-center justify-center size-11 rounded-lg text-xl shrink-0
`}
    >
      {icon}
    </button>
  );
}

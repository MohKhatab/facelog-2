import { useState } from "react";
import { MdMenu, MdMoreVert } from "react-icons/md";

export default function Dropdown({ actions }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prevState) => !prevState)}
        className="text-3xl cursor-pointer text-accent-500"
      >
        <MdMoreVert></MdMoreVert>
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 glass p-2 flex">
          <ul className="flex flex-col gap-2">
            {actions.map((action) => (
              <button
                key={action.title}
                onClick={action.handler}
                className="flex gap-2 items-center bg-accent-50/5 px-3 py-2 rounded cursor-pointer hover:bg-accent-50/15 transition-colors active:bg-accent-50/25"
              >
                {action.icon}
                {action.title}
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

"use client"

import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

export default function Popup({
    children,
    modeNight,
    width,
    height,
    setActive
  }: {
    children: React.ReactNode;
    modeNight?: boolean;
    width?: string;
    height?: string;
    setActive: Dispatch<SetStateAction<boolean>>
  }) {
    return (
      <div
        className={`fixed  z-50 top-0 min-h-screen flex justify-center  items-center right-0 left-0 ${
          modeNight ? "bg-[#50505089]" : "bg-[rgba(0,0,0,0.1)]"
        } transition-all  duration-1000`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`w-[${width}] h-[${height}] hover:cursor-default absolute shadow-sm bg-primary rounded-lg`} 
        >
            <MdClose 
                className="absolute top-2 right-2 hover:scale-125 cursor-pointer" 
                onClick={() =>  setActive(false)}
            />
          {children}
        </div>
      </div>
    );
  }
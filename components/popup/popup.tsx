"use client"

import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { popupContext } from "@/hooks/usePopup"

export default function Popup({
    children,
    modeNight,
    width,
    height,
    popup,
    className

  }: {
    children: React.ReactNode;
    modeNight?: boolean;
    width?: string;
    height?: string;
    popup: string
    className?: string
  }) {
    const {setDispatch} = useContext(popupContext)
    return (
      <div
        className="fixed  z-50 top-0 min-h-screen flex justify-center  items-center right-0 left-0 bg-[rgba(0,0,0,0.6)] 
        transition-all  duration-300"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${className} w-[${width}] h-[${height}] hover:cursor-default absolute shadow-sm bg-primary`} 
        >
            <MdClose 
                size={28}
                className="absolute top-2 right-2 hover:scale-125 cursor-pointer text-sidebarText" 
                onClick={() =>  {
                  switch (popup) {
                    case 'invitation':
                      setDispatch({invitation: false});
                      break;
                    case 'task':
                      setDispatch({task: false});
                      break;
                    case 'calendar': 
                      setDispatch({calendar: false});
                      break;
                    case 'clock':
                      setDispatch({clock: false})
                    case 'comment':
                      setDispatch({comment: false})
                      break;
                    case 'taskdetails':
                      setDispatch({taskdetails: false})
                  }
                }}
            />
          {children}
        </div>
      </div>
    );
  }
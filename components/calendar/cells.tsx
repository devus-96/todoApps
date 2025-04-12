"use client"
import React, { useState }  from "react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import { connectContext } from "@/hooks/useConnect";
import { popupContext } from "@/hooks/usePopup";
import { ProjectType, Tasks } from "@/types/global";
import { CalendarNotice } from "./calendarNotice";
import { MoreCalendarTaskAction } from "./moreCalenadarTask";

interface Props {
    pastVerify: boolean
    time: number,
    handleClick: (time: number) => void
    isCurrentDate?:boolean
    futureVerify: boolean
    data?: Tasks[]
    project?: ProjectType[]
    currentDate: Date,
    setCurrentDate?: Dispatch<SetStateAction<Date>>
    className?: string
    cellsClass? : string
  }

const Cell:React.FC<Props> =  ({
    pastVerify,
    time,
    handleClick,
    isCurrentDate,
    futureVerify,
    data,
    project,
    currentDate,
    setCurrentDate,
    className = 'flex flex-col select-none transition-colors h-[80px] ', 
    cellsClass = clsx(
      "pt-1 pb-1 w-full h-full",
      {
        "bg-gray-800" : isCurrentDate,
        "text-[#6b6b6b]" : pastVerify,
        "text-gray-200 hover:bg-[#6b6b6b] cursor-pointer" : futureVerify
      }
    )
}) =>  {
    const {setDispatch, state} = useContext(popupContext)
    const {dateValue, setGroups} = useContext(connectContext)
    const [position, setPosition] = useState({x:0, top:0})
    function handleAction () {
        switch (dateValue) {
          case "start_date": 
            setGroups({start_date: currentDate})
            break;
          case "deadline":
            setGroups({deadline: currentDate})
            break;
    }
}
    return (
        <div
        className={className}>
          {state.calendarNotice &&
            <div className="fixed w-[244px] h-[150px] z-50 text-sidebarText bg-primary rounded"
                  style={{
                      left: position.x + 'px',
                      top: position.top + 'px',
                  }}
                  >
                  <MoreCalendarTaskAction />
            </div>
                      }
        
        <div
          key={time}
          onClick={() => {
            if (!pastVerify) {
              handleClick(time)
              handleAction()
              setDispatch({calendar: false})
            } else {
              alert("vous ne pouvez pas programmer un date dans le passe")
            }
            setCurrentDate && setCurrentDate(currentDate)
          }}
          className={cellsClass}
        >
          <p className="text-left text-sm font-medium ml-4">{time}</p>
            {data && 
             <div>
                {data.map((item, index) => {
                   return (
                    <CalendarNotice 
                      key={index}
                      setCurrentDate={setCurrentDate} 
                      item={item}
                      currentDate={currentDate}
                      setPosition={setPosition}
                    />
                   )
                })}
             </div>
            }
        </div>
      </div>
    )
}



export default Cell
"use client"
import React  from "react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import { connectContext } from "@/hooks/useConnect";
import { popupContext } from "@/hooks/usePopup";
import { ProjectType, Tasks } from "@/types/global";
interface Props {
    pastVerify: boolean
    time: number,
    handleClick: (time: number) => void
    isCurrentDate?:boolean
    futureVerify: boolean
    data?: Tasks
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
      "pt-1 pb-1 px-5 w-full h-full",
      {
        "bg-btnColor" : isCurrentDate,
        "text-[#6b6b6b]" : pastVerify,
        "text-gray-200 hover:bg-[#6b6b6b] cursor-pointer" : futureVerify
      }
    )
}) =>  {
    const {setDispatch} = useContext(popupContext)
    const {dateValue} = useContext(connectContext)
    const {setGroups} = useContext(connectContext)
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
          <p className="text-left text-sm font-medium">{time}</p>
        </div>
      </div>
    )
}

export default Cell
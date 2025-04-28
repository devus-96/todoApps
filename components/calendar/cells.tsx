"use client"
import React, { useEffect, useRef, useState }  from "react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import { connectContext } from "@/hooks/useConnect";
import { popupContext } from "@/hooks/usePopup";
import { ProjectType, Tasks } from "@/types/global";
import { CalendarNotice } from "./calendarNotice";
import { format } from "date-fns";
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
    data=[],
    project,
    currentDate,
    setCurrentDate,
    className = 'flex flex-col select-none transition-colors h-[80px] ', 
    cellsClass = clsx(
      "pt-1 pb-1 w-full h-full cursor-pointer",
      {
        "bg-zinc-600" : isCurrentDate,
        "text-[#6b6b6b]" : pastVerify,
        "text-gray-200 hover:bg-[#6b6b6b] cursor-pointer" : futureVerify
      }
    )
}) =>  {
    const {setDispatch, state} = useContext(popupContext)
    const {dateValue, setGroups, setDate} = useContext(connectContext)
    const [tab, setTab] = useState<Tasks[]>([])
    function handleAction () {
      switch (dateValue) {
        case "start_date": 
          setGroups({start_date: currentDate})
          break;
        case "deadline":
          setGroups({deadline: currentDate})
          break;
        case "start":
          setDate({start_date: currentDate})
          break
        case "end":
          setDate({deadline: currentDate})
          break
      }
    }
    useEffect(() => {
      if (data) {
        setTab(() => {
          const newTab = data.filter((item) => (format(item.start_date, 'dd/MM/yyyy')  === format(currentDate, 'dd/MM/yyyy') || format(item.deadline, 'dd/MM/yyyy')  === format(currentDate, 'dd/MM/yyyy')))
          return newTab
        })
      }
    }, [state.calendartask])
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
            }
            setCurrentDate && setCurrentDate(currentDate)
            /*if (data) {
              setFormTask((prevValue: Tasks) => {
                let newTab = {...prevValue}
                const newValue = {start_date: currentDate}
                newTab = { ...newTab, ...newValue}
                return newTab
              })
              setDispatch({task: true})
            }*/
          }}
          className={cellsClass}
        >
          <p className="text-left text-sm font-medium ml-4">{time}</p>
            {data && 
             <div>
                {tab.map((item, index) => {
                  if (index <= 3) {
                    return (
                      <CalendarNotice 
                        key={index}
                        index={index}
                        item={item}
                        currentDate={currentDate}
                        tab={tab}
                      />
                     )
                  }
                })}
                {tab.length > 3 && 
                <div className="text-sidebarText text-xs text-end hover:underline">
                  <p>See {tab.length - 4} more.</p>
                </div>
                }
             </div>
            }
        </div>
      </div>
    )
}



export default Cell
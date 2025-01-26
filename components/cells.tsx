"use client"
import React from "react";
import { useManageCalendar } from "@/hooks/useManageCalendar";
import { taskContext } from "@/hooks/useTask";
import { task } from "@/types/task";
import clsx from "clsx";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useContext } from "react";
interface Props {
    pastVerify: boolean
    time: number,
    handleClick: (time: number) => void
    isCurrentDate?:boolean
    futureVerify: boolean
    data?: task
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
    currentDate,
    setCurrentDate,
    className = 'flex flex-col select-none transition-colors h-[90px] ', 
    cellsClass = clsx(
      "pt-1 pb-1 text-textcolor text-left px-2 w-full h-full",
      {
        "bg-terciary text-white" : isCurrentDate && !pastVerify ,
        "bg-gray-200 text-gray-300" : pastVerify,
        "bg-gray-200 text-gray-900 hover:bg-white cursor-pointer" : futureVerify
      }
    )
}) =>  {
    const {setDispatch} = useContext(taskContext)
    const {
            colorOptions,
            separe
        } = useManageCalendar(currentDate)

    return (
        <div
        className={className}>
        <div
          key={time}
          onClick={() => {
            !pastVerify ? handleClick(time) : alert("vous ne pouvez pas programmer un date dans le passe")
            setDispatch({ calendar: ''})
            setDispatch({ date: currentDate})
            setDispatch({ typeOfCalendar: 'day'})
            setCurrentDate && setCurrentDate(currentDate)
          }}
          className={cellsClass}
        >
          <p className="text-left text-sm font-medium">{time}</p>
          {data && separe(data)?.map((item: any, id: number) => {
            if (item[0] === format(currentDate, "dd/MM/yyyy")) {
              return <div key={id} className="space-y-2">
                {item[1].map((day: any, index: number) => {
                  if (index <= 1) {
                    return <div key={index} style={{
                      background:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                    }} className="rounded p-2 text-center">
                          <p className="text-xs">{day.name}</p>
                          <p className="text-xs">{day.start_time}-{day.end_time}</p>
                    </div>
                    
                  }
                })}
                {item[1].length > 2 && <p className="text-xs hover:underline">see {item[1].length-2} more</p>}
              </div>
            }
          })}
        </div>
      </div>
    )
}

export default Cell
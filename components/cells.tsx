"use client"
import React, { useEffect, useRef } from "react";
import { useManageCalendar } from "@/hooks/useManageCalendar";
import { taskContext } from "@/hooks/useTask";
import { task } from "@/types/task";
import { ProjectType, taskProject } from "@/types/project";
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
    project?: ProjectType[]
    currentDate: Date,
    setCurrentDate?: Dispatch<SetStateAction<Date>>
    className?: string
    cellsClass? : string
  }

  function TaskAssigment ({data, currentDate}: {data: ProjectType[] | undefined, currentDate: Date}) {
    const {
      colorOptions,
    } = useManageCalendar(currentDate)
    const calendarRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
      if (calendarRef.current) {
        console.log(calendarRef.current)
        Array.from(calendarRef.current.children).forEach((div, index) => {
          console.log(div)
          if (index  > 1) {
            Array.from(div?.children).forEach((child) => {
              child.classList.add('hidden')
            })
          }
        })
      }
    })
    return <div className="">
            {data && data?.map((item, index: number) => {
              return <div key={index}>
              {item.tasks.map((task, index) => {
                return <div key={index}>
                  {task.schedule.map((plan, id) => {
                    if (plan.date === format(currentDate, "dd/MM/yyyy")) {
                      return <div  key={index} style={{
                        borderColor:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                      }} className="text-start bg-white border-l-[6px] p-2">
                          <h1 className="text-xs font-bold bold">{item.name}</h1>
                          <p className="text-xs truncate capitalize">{task.name}</p>
                          <div className="flex items-center space-x-1">
                          {task.assignment.map((menber, index) => {
                            return <div key={index} style={{
                              background:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                            }} className="w-[30px] h-[30px] text-gray-800 rounded-full flex items-center justify-center">
                                <p className="text-xs">{menber[0]}{menber[1]}</p>
                            </div>
                          })}
                      </div>
                      </div>
                    }
                  })}
                </div>
              })}
              {calendarRef.current?.children.length > 2 && <p className="text-xs hover:underline">see {calendarRef.current?.children.length-2} more</p>}
              </div>
            })}
    </div>
  }

  function MonthlyProject ({data, currentDate}: {data: ProjectType[] | undefined, currentDate: Date}) {
    const {
      colorOptions,
    } = useManageCalendar(currentDate)
    return <div className="">
            {data && data?.map((item, index: number) => {
              if (item.start_date === format(currentDate, "dd/MM/yyyy")) {
                return <div key={index} style={{
                  borderColor:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                }} className="text-start bg-white border-l-4 p-2">
                      <p className="text-xs font-bold bold">{item.name}</p>
                      <p className="text-xs">start: {item.start_date}</p>
                      <p className="text-xs">end: {item.deadline}</p>
                      <div className="flex items-center space-x-1 mt-4">
                          {item.menbers.map((menber, index) => {
                            return <div key={index} style={{
                              background:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                            }} className="w-[30px] h-[30px] text-gray-800 rounded-full flex items-center justify-center">
                                <p className="text-xs">{menber.name[0]}{menber.name[1]}</p>
                            </div>
                          })}
                      </div>
                </div>
              }
            })}
    </div>
  }
  
  function MonthlyTask ({data, currentDate}: {data: task | undefined, currentDate: Date}) {
    const {
      colorOptions,
      separe
    } = useManageCalendar(currentDate)
    return <div>
          {data && separe(data)?.map((item: any, id: number) => {
            if (item[0] === format(currentDate, "dd/MM/yyyy")) {
              return <div key={id} className="space-y-2">
                {item[1].map((day: any, index: number) => {
                  if (index <= 1) {
                    return <div key={index} style={{
                      background:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                    }} className="p-2 text-center">
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
    const {setDispatch, state} = useContext(taskContext)
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
          {state.dataType === 'task' ? 
          
          <MonthlyTask data={data} currentDate={currentDate} /> : 
          <>
            <TaskAssigment data={project} currentDate={currentDate} />
            <MonthlyProject data={project} currentDate={currentDate} />
          </>
          }
        </div>
      </div>
    )
}

export default Cell
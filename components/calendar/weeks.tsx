"use client"
import React from "react"
import { weeksMin } from "@/constants/task"
import { hoursOfDays } from "@/constants/calendar"
import { useContext, useRef } from "react"
import clsx from "clsx"
import { taskContext } from "@/hooks/useTask"
import { useManageCalendar } from "@/hooks/useManageCalendar"
import { format } from "date-fns"
import { task } from "@/types/task"


function Week ({date, data}: {date:Date, data: task | undefined}) {
    const {
        converToMinute,
        converToTime,
        converToText,
        dayOfWeek,
        colorOptions,
        separe
    } = useManageCalendar(date)
    const currentDate = useRef<Date>(new Date())
    const {setDispatch} = useContext(taskContext)
    
    return <div className="font-[family-name:var(--font-jetBrains-mono)] overflow-x-hidden">
        <div className="grid grid-cols-7  items-center justify-center text-center pl-10 pr-4">
            {dayOfWeek.map((item, index) => (
                <div key={index} className={clsx('flex flex-col items-center', {"text-btnColor" :  format(currentDate.current, "dd/MM/yyyy")  === format(item, "dd/MM/yyyy")})}>
                     <div className="text-3xl font-semibold">{`${item.getDate()}`}</div>
                     <p>{weeksMin[index]}</p>
                </div>
            ))}
        </div> 
        <div className="w-full flex px-4 mb-4 relative">
            <div className="flex flex-col justify-between col-span-1 text-start pl-2">
                {converToText(hoursOfDays).map((item, index) => (
                    <div key={index} className="h-[60px] flex text-start"><p className="mt-[-13px] text-sm">{item}</p></div>
                ))}
            </div>
            <div className="w-full grid grid-cols-7 relative">
                <div className="flex items-start absolute left-0 right-0 border" style={{
                            top: `${60*(new Date().getHours() - 1) + new Date().getMinutes()}px`
                        }}>
                        <div className="w-full h-[1px] bg-red-500"></div>
                </div>
                {dayOfWeek.map((day: any, id) => (
                    <div key={id} className="w-auto grid grid-cols-1">
                        {converToText(hoursOfDays).map((time, index) => (
                            <div key={index} onClick={() => {
                                setDispatch({form: 'Task'})
                                setDispatch({date: day})
                                setDispatch({clockEnd: `${converToText(hoursOfDays)[index+1]}` })
                                setDispatch({clockStart: `${time}`})
                               }} className="border-t-[.5px] border-r-[.5px] border-[#c7c6c6] w-full h-[60px] p-2 relative z-0 cursor-pointer hover:bg-gray-100">
                                
                                    {data && separe(data)?.map((item, index: number) => {
                                        if (format(day, "dd/MM/yyyy") === item[0]) {
                                            return <div key={index}>
                                                {item[1].map((week: any, index:number) => {
                                                    const tab = converToTime(week.start_time)
                                                    const number = converToMinute(week.start_time, week.end_time)
                                                    if (format(day, "dd/MM/yyyy") === week.start_date && time === tab[0]) {
                                                        return <div key={index} className={clsx('text-center rounded p-2 cursor-pointer hover:bg-blue-300/70', 
                                                        )} style={{
                                                            width: "100%",
                                                            height: `${60 * number}px`,
                                                            marginTop: `${60 * (parseInt(tab[1]) / 60)}px`,
                                                            marginBottom: "1px",
                                                            background:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                                                        }}>
                                                            <p className="truncate">{week.name}</p>
                                                            <p className="text-sm">{week.start_time}-{week.end_time}</p>
                                                        </div>
                                                    }
                                                })}
                                            </div>
                                        }
                                    })}
                                </div>
                            
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default Week


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
import Progress from "../progress"


function Week ({date, data}: {date:Date, data: task | undefined}) {
    const {
        converToMinute,
        converToText,
        dayOfWeek,
        colorOptions,
        separe,
        currTask,
        currDate,
        progress
    } = useManageCalendar(date)
    const currentDate = useRef<Date>(new Date())
    const {setDispatch} = useContext(taskContext)
    const marginRef = useRef<number | null>(null)
    
    return <div className="font-[family-name:var(--font-jetBrains-mono)] overflow-x-hidden">
        <div className="grid grid-cols-7  items-center justify-center text-center pl-10 pr-4">
            {dayOfWeek.map((item, index) => (
                <div key={index} className={clsx('flex flex-col items-center', {"text-terciary font-[family-name:var(--font-jetBrainsExtraBold-mono)]" :  format(currentDate.current, "dd/MM/yyyy")  === format(item, "dd/MM/yyyy")})}>
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
                            top: new Date().getHours() !== 0 ? `${60*(new Date().getHours() - 1) + new Date().getMinutes()}px` : `${60*23 + new Date().getMinutes()}px`
                        }}>
                        <div className="w-full h-[2px] bg-red-500"></div>
                </div>
                {dayOfWeek.map((day, id) => (
                    <div key={id} className="w-auto grid grid-cols-1 relative">
                        <div className="absolute top-0 left-0 right-0">
                            {converToText(hoursOfDays).map((time, index) => (
                                <div  key={index} onClick={() => {
                                    setDispatch({form: 'Task'})
                                    setDispatch({date: day})
                                    setDispatch({clockEnd: `${converToText(hoursOfDays)[index+1]}` })
                                    setDispatch({clockStart: `${time}`})
                                }} className="border-t-[.5px] border-r-[.5px] border-[#c7c6c6] w-full h-[60px] hover:bg-gray-100 cursor-pointer"></div>
                            ))}
                        </div>
                        {data && separe(data)?.map((item, index: number) => {
                            if (format(day, "dd/MM/yyyy") === item[0]) {
                                return <div key={index} className="px-1">
                                    {item[1].map((week, id:number) => {
                                        const number = converToMinute(week.start_time, week.end_time)
                                        const isCurrTask = currTask(week.start_time, week.end_time, week.start_date)
                                        const isCurrDate = currDate(week.start_date)
                                        const start_time = (parseInt(item[1][id]?.start_time.split(':')[0])*60+parseInt(item[1][id]?.start_time.split(':')[1]))
                                        const end_time = (parseInt(item[1][id-1]?.end_time.split(':')[0])*60+parseInt(item[1][id-1]?.end_time.split(':')[1]))
                                        const t = start_time - end_time 
                                        const f = (parseInt(item[1][id]?.start_time.split(':')[0])*60+parseInt(item[1][id]?.start_time.split(':')[1])) - 60
                                        if (id === 0) {
                                            marginRef.current = f
                                        } else if (id > 0) {
                                            marginRef.current = t
                                        }
                                        if (format(day, "dd/MM/yyyy") === week.start_date) {
                                            return <div key={id} 
                                                        onClick={() => {
                                                            setDispatch({details: week})
                                                        }}
                                                        className={clsx('relative z-10 text-center rounded p-2 cursor-pointer hover:bg-blue-300/70', {
                                                                        'border-4 border-terciary': isCurrDate
                                                        }
                                                        )} style={{
                                                            width: "100%",
                                                            minHeight:`${60 * number}px`,
                                                            marginTop: `${marginRef.current}px`,
                                                            background:colorOptions.current[Math.floor(Math.random() * colorOptions.current.length)]
                                                        }}>
                                                            <p className="truncate capitalize">{week.name}</p>
                                                            <p className="text-sm">{week.start_time}-{week.end_time}</p>
                                                            {isCurrTask && <Progress percent={progress(week.end_time, week.start_time)} />}
                                                        </div>
                                                    }
                                                })}
                                            </div>
                                        }
                        })}
                </div>
                ))}
            </div>
        </div>
    </div>
}

export default Week
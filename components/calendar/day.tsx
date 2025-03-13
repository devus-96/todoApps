import { taskContext } from "@/hooks/useTask"
import { format } from "date-fns"
import { useContext } from "react"
import { useManageCalendar } from "@/hooks/useManageCalendar"
import Image from "next/image"
import clsx from "clsx"
import { task } from "@/types/task"
import React from "react";


export default function Day ({data, date}: {data: task | undefined, date: Date}) {
    const {setDispatch} = useContext(taskContext)
    const {
            separe,
            difference,
            sortByTime
        } = useManageCalendar(date)

    return <div className="w-full min-h-screen grid grid-cols-12 h-auto pb-8 px-8">
            <div className="w-full flex px-4 mb-4 relative col-span-7 gap-4">
                <div className="w-full">
                    {data && separe(data)?.map((item, index: number) => {
                        if (format(date, "dd/MM/yyyy") === item[0]) {
                        return <div key={index}>
                                {item[1].sort(sortByTime).map((day, index: number) => {
                                    console.log(item[1][index+1])
                                return <div key={index} className="space-y-2">
                                        <div key={index} className="w-full flex items-center justify-end capitalize">
                                            <div className="w-[5%] h-[50px] flex flex-col justify-between items-center">
                                                <p className="text-xs">{day.start_time}</p>
                                                <p className="text-xs">{day.end_time}</p>
                                            </div>
                                            <div className={clsx("w-[94%] h-[50px] px-8 mt-2  bg-gray-100 rounded py-4 flex flex-col justify-center", {
                                                "bg-gray-300 line-through text-gray-400": day.status === "completed",
                                                "border border-red-600 text-red-600 bg-transparent": day.status === "waiting"
                                            })}>
                                                <p className="">{day.name}</p>
                                                {day.status === "waiting" && <p className="text-xs">(this task has never done)</p>}
                                            </div>
                                        </div>
                                        {day.end_time !== item[1][index+1]?.start_time && index !== item[1].length && 
                                        <div onClick={() => {
                                            setDispatch({form: 'Task'})
                                            setDispatch({clockStart: day.end_time})
                                            setDispatch({clockEnd: item[1][index+1]?.start_time})
                                        }} className="w-[94%] h-[50px] px-8 border border-gray-800 ml-[6%] rounded py-4 flex items-center cursor-pointer hover:bg-gray-100">
                                                <p>{difference(item[1][index+1]?.start_time, day?.end_time)}</p>
                                        </div>}
                                </div>
                            })}
                        </div>
                        }
                    })}
                    {data && data[`${format(date, "dd/MM/yyyy")}`] === undefined && 
                        <div className="w-full flex flex-col items-center text-center mt-52">
                            <Image src="/notdata.svg" alt="no data yet" width={200} height={200}></Image>
                            <button className="btn" onClick={() => setDispatch({form: 'Task'})}>create task</button>
                        </div>
                    }
                </div>
            </div>
            <div className="col-span-5">
                    <div className="w-full flex flex-col items-center text-center mt-24">
                            <Image src="/notdata.svg" alt="no data yet" width={200} height={200}></Image>
                            <button className="btn" onClick={() => setDispatch({form: 'Project'})}>create Project</button>
                        </div>
            </div>
    </div>
}

/*
 
*/
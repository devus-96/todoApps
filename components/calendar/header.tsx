'use client'
import React from "react"
import { Dispatch, FC, SetStateAction, useContext } from "react"
import { format, getDate, getMonth, getYear, set } from "date-fns"
import { useCalendar } from "@/hooks/useCalendar"
import { taskContext } from "@/hooks/useTask"
import { FaArrowLeft } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa"
import { FaRegBell } from "react-icons/fa"
import { MdMailOutline } from "react-icons/md"
import { IoIosSearch } from "react-icons/io"


interface headerProps {
    date: Date
    setDate: Dispatch<SetStateAction<Date>>
}

export const Header:FC<headerProps> = ({date, setDate}) => {
    const {prevMonth, nextMonth} = useCalendar(date, setDate)
    const {state, setDispatch} = useContext(taskContext)
    
    const lastWeek = set(date, {year: getYear(date), month: getMonth(date), date: getDate(date) -7})
    const nextWeek = set(date, {year: getYear(date), month: getMonth(date), date: getDate(date) +7})
    
    return <section className=" px-8 font-[family-name:var(--font-jetBrains-mono)] py-4 space-y-4">
        <div className="w-full flex justify-between items-center">
            <div className="w-auto space-x-4 flex justify-around text-white items-center">
                <h1 className="text-2xl text-gray-800 font-[family-name:var(--font-jetBrainsExtraBold-mono)]">{format(date, "ccc dd LLLL yyyy")}</h1>
                    <div onClick={() => {
                        if (state.typeOfCalendar === 'month' || state.typeOfCalendar === '') {
                            prevMonth()
                        } else if (state.typeOfCalendar === 'week') {
                            setDate(lastWeek)
                        }
                    }} className="w-12 h-8 bg-blue-200 rounded text-gray-800 flex items-center justify-center cursor-pointer">
                         <FaArrowLeft size={16}/> 
                    </div>
                    <div onClick={() => {
                        if (state.typeOfCalendar === 'month' || state.typeOfCalendar === '') {
                            nextMonth()
                        } else if (state.typeOfCalendar === 'week') {
                            setDate(nextWeek)
                        }
                    }} className="w-12 h-8 bg-blue-200 rounded text-gray-800 flex items-center justify-center cursor-pointer">
                        <FaArrowRight size={16}/> 
                    </div>  
                </div>
                <div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-200 w-[40px] h-[40px] rounded-full flex items-center justify-center"><IoIosSearch/></div>
                            <div className="bg-blue-200 w-[40px] h-[40px] rounded-full flex items-center justify-center"><FaRegBell/></div>
                            <div className="bg-blue-200 w-[40px] h-[40px] rounded-full flex items-center justify-center"><MdMailOutline/></div>
                        </div>
                        <div className="w-[50px] h-[50px] rounded-full bg-gray-600"></div>
                        
                    </div>
                </div>
                
        </div>
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-4 w-[300px]">
                    <button onClick={() => {
                        setDispatch({typeOfCalendar: "day"})
                    }} className="w-full py-2 rounded text-xs bg-blue-200 cursor-pointer hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-600 transition-colors duration-300">Day</button>
                    <button onClick={() => {
                        setDispatch({typeOfCalendar: "week"})
                    }} className="w-full py-2 rounded text-xs bg-blue-200 cursor-pointer hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-600 transition-colors duration-300">Week</button>
                    <button onClick={() => {
                        setDispatch({typeOfCalendar: "month"})
                    }} className="w-full py-2 rounded text-xs bg-blue-200 cursor-pointer hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-600 transition-colors duration-300">Month</button>
            </div>
            <div className="flex items-center space-x-4 w-[200px]">
                    <button onClick={() => {
                        setDispatch({dataType: 'task'})
                    }} className="w-full py-2 rounded text-xs bg-blue-200 cursor-pointer hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-600 transition-colors duration-300">Task</button>
                    <button onClick={() => {
                        setDispatch({dataType: 'project'})
                    }} className="w-full py-2 rounded text-xs bg-blue-200 cursor-pointer hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-600 transition-colors duration-300">Project</button>
            </div>
        </div>

                
    </section>
}
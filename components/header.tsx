'use client'
import React from "react"
import { usePathname } from "next/navigation"
import { Dispatch, FC, SetStateAction, useContext } from "react"
import { format, getDate, getMonth, getYear, set } from "date-fns"
import { useCalendar } from "@/hooks/useCalendar"
import { taskContext } from "@/hooks/useTask"
import { FaArrowLeft } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa"

interface headerProps {
    date: Date
    setDate: Dispatch<SetStateAction<Date>>
}

export const Header:FC<headerProps> = ({date, setDate}) => {
    const {state} = useContext(taskContext)
    const {prevMonth, nextMonth} = useCalendar(date, setDate)
    
    const lastWeek = set(date, {year: getYear(date), month: getMonth(date), date: getDate(date) -7})
    const nextWeek = set(date, {year: getYear(date), month: getMonth(date), date: getDate(date) +7})

    console.log(state.typeOfCalendar)
    
    return <section className=" px-8 font-[family-name:var(--font-jetBrains-mono)]">
        <div className="w-full h-[100px] flex justify-between items-center">
            <div className="w-auto space-x-4 flex justify-around text-white items-center py-8">
                <h1 className="text-2xl text-gray-800 font-[family-name:var(--font-jetBrainsExtraBold-mono)]">{format(date, "ccc dd LLLL yyyy")}</h1>
                    <div onClick={() => {
                        if (state.typeOfCalendar === 'month' || state.typeOfCalendar === '') {
                            prevMonth()
                        } else if (state.typeOfCalendar === 'week') {
                            setDate(lastWeek)
                        }
                    }} className="w-12 h-8 bg-white rounded text-gray-800 flex items-center justify-center cursor-pointer">
                         <FaArrowLeft size={16}/> 
                    </div>
                    <div onClick={() => {
                        if (state.typeOfCalendar === 'month' || state.typeOfCalendar === '') {
                            nextMonth()
                        } else if (state.typeOfCalendar === 'week') {
                            setDate(nextWeek)
                        }
                    }} className="w-12 h-8 bg-white rounded text-gray-800 flex items-center justify-center cursor-pointer">
                        <FaArrowRight size={16}/> 
                    </div>  
                </div>
                <div className="w-[50px] h-[50px] rounded-full bg-gray-600"></div>
        </div>
        <div>
            
        </div>

                
    </section>
}
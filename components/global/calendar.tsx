"use client"

import { useEffect, useState } from "react"
import { Calendar } from "../calendar/calendar"
import { add, sub } from "date-fns"
import { project } from "@/constants/task"

export const Calendar1 = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    useEffect(() => {
         function handleRightLeft (e: KeyboardEvent) {
            if (e.key === 'ArrowRight') {
                setCurrentDate(add(currentDate, { months: 1 }))
            } else if (e.key === 'ArrowLeft') {
                setCurrentDate(sub(currentDate, { months: 1 }))
            }
         }
         document.addEventListener('keyup', handleRightLeft)
         return () => {
          document.removeEventListener('keyup',handleRightLeft)
         }
      }, [currentDate])
    return <div className="w-full">
        <Calendar 
            value={currentDate} 
            onChange={setCurrentDate}
            showHeader={false}
            setCurrentDate={setCurrentDate}
            data={project}
            className="w-full rounded"
            divClassCells='border-b border-r border-borderCard h-[208px] text-sidebarText'
            headerClass='border-b border-borderCard flex items-center space-x-4 pl-4 text-sidebarText'
            btnClass='rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer'
            labelClass='w-full grid grid-cols-7 pb-2 text-sidebarText text-center mt-4'
        />
    </div>
}


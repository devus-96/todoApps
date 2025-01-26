'use client'
import { useContext, useEffect, useState } from "react"
import { Calendar } from "@/components/calendar"
import { Header } from "@/components/header"
import Week from "@/components/calendar/weeks"
import Day from "@/components/calendar/day"
import { taskContext } from "@/hooks/useTask"
import axios from "axios"
import { task } from "@/types/task"

function CalendarPage () {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [data, setData] = useState<task>()
    const {state,setDispatch} = useContext(taskContext)

    useEffect(() => {
        axios.get('http://localhost:8001/task').then((res) => {
            setData(res?.data)
            setDispatch({ date: new Date()})
        })  
    }, [])
    
    return <main className='absolute bg-bgLoging top-0 right-0 w-[calc(100%-200px)] h-auto'>
            <Header date={currentDate} setDate={setCurrentDate} />
            {state.typeOfCalendar === 'week' && <Week date={currentDate} data={data} />}
            {state.typeOfCalendar === 'day' && <Day date={currentDate} data={data} />}
            {(state.typeOfCalendar === 'month' || state.typeOfCalendar === '') &&
            <Calendar 
                value={currentDate} 
                onChange={setCurrentDate}
                showHeader={false}
                className="w-full bg-bgLoging font-[family-name:var(--font-jetBrains-mono)] pb-4"
                cellsClass='text-right text-gray-800'
                divClassCells = "w-full h-[200px] border border-gray-600 p-2 cursor-pointer hover:bg-gray-100/70"
                divClass='grid grid-cols-7 items-center justify-center text-center h-auto'
                labelClass='w-full grid grid-cols-7 pb-2 text-gray-800 capitalize text-center'
                textColor='text-black'
                data={data}
                setCurrentDate={setCurrentDate}
            />
        }
    </main>
}

export default CalendarPage

/*


*/
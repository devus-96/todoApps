"use client"

import { useEffect, useMemo, useState } from "react"
import { Calendar } from "../calendar/calendar"
import { add, getMonth, getYear, set, setDate, sub } from "date-fns"

export const myprojects = [
    {
      "id": '0',
      "name": "symphony social",
      "priority": "High",
      "assign": {},
      "state": "In Progress",
      "start_date": setDate(new Date(), 2),
      "deadline": setDate(new Date(), 20),
    },
    {
        "id": '0',
        "name": "create that react components",
        "assign": {
          "0": "marcdeus@gmail.com",
          "1": "austinndjom@gmail.com",
          "2": "dsfdsfsdfsd@gmail.com"
        },
        "priority": "High",
        "state": "In Progress",
        "start_date": setDate(new Date(), 6),
        "deadline": setDate(new Date(), 8),
        "start_time": "",
        "end_time": ""
    },
    {
        "id": '1',
        "name": "write a redaction",
        "assign": {
          "0": "marcdeus@gmail.com"
        },
        "priority": "Low",
        "state": "Planning",
        "start_date": setDate(new Date(), 2),
        "deadline": setDate(new Date(), 9),
        "start_time": "01:00PM",
        "end_time": "06:00PM",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
    },
    {
    "id": '1',
    "name": "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
    "assign": {
        "0": "marcdeus@gmail.com",
        "1": "marcdeus@gmail.com",
        "2": "marcdeus@gmail.com",
        "3": "marcdeus@gmail.com"
    },
    "priority": "High",
    "state": "Planning",
    "start_date": setDate(new Date(), 22),
    "deadline": set(new Date(), {year: getYear(setDate(new Date(), 9)), month: getMonth(setDate(new Date(), 9)) +1, date: 9}),
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
    },
    {
    "id": '1',
    "name": "Lorem, ipsum dolor",
    "assign": {
        "0": "jessicaYik@gmail.com",
        "1": "marcdeus@gmail.com",
        "2": "danielsKalvin@gmail.com",
        "3": "samiraMarchal@gmail.com"
    },
    "priority": "Medium",
    "state": "Done",
    "start_date": setDate(new Date(), 5),
    "deadline": setDate(new Date(), 12),
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
    },
    {
        "id": '1',
        "name": "Lorem, ipsum",
        "assign": {
          "0": "jessicaYik@gmail.com"
        },
        "priority": "Low",
        "state": "Done",
        "start_date": setDate(new Date(), 1),
        "deadline":setDate(new Date(), 11),
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
    },
    {
        "id": '1',
        "name": "sit amet consectetur adipisicing elit",
        "assign": {
          "0": "samiraMarchal@gmail.com"
        },
        "priority": "High",
        "state": "Canceled",
        "start_date": new Date(),
        "deadline": new Date(),
         "start_time": "08:10AM",
        "end_time": "18:00AM",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
  ]

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
            data={myprojects}
            className="w-full rounded"
            divClassCells='border-b border-r border-borderCard h-[208px] text-sidebarText'
            headerClass='border-b border-borderCard flex items-center space-x-4 pl-4 text-sidebarText'
            btnClass='rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer'
            labelClass='w-full grid grid-cols-7 pb-2 text-sidebarText text-center mt-4'
        />
    </div>
}


"use client"

import { popupContext } from "@/hooks/usePopup"
import { useContext, useState } from "react"
import Popup from "./popup"
import { Calendar } from "../ui/calendar"

export const CalendarPopUp = () => {
    const {state} = useContext(popupContext)
    const [currentDate, setCurrentDate] = useState(new Date())
    return (
        <>
            {state.calendar &&
                <Popup width="400px" height="auto" modeNight={true} popup='calendar' className="rounded-lg">
                    <div>
                    <Calendar 
                          value={currentDate} 
                          onChange={setCurrentDate}
                          showHeader={false}
                          setCurrentDate={setCurrentDate}
                      />
                    </div>
                </Popup>
            }
        </>
    )
}
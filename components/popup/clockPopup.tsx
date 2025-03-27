"use client"

import { useContext } from "react"
import { Clock } from "../ui/clock"
import Popup from "./popup"
import { popupContext } from "@/hooks/usePopup"


export const ClockPopUp = () => {
    const {state} = useContext(popupContext)
    return (
        <>
        {state.clock &&
        <Popup width="300px" height="auto" popup="clock" modeNight={true} className="z-10">
            <Clock />
        </Popup>
        }
        </>
    )
}
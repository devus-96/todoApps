"use client"
import React from "react";
import { useContext, useEffect, useRef, useState } from "react"
import { FaRegKeyboard } from "react-icons/fa"
import { SelectTime } from "./selectTime"
import clsx from "clsx"
import { taskContext } from "@/hooks/useTask"


interface clockProps {
    type: string
    clockName?: string
}

export const Clock:React.FC<clockProps> = ({
    type,
    clockName = "w-[300px] h-[420px] absolute bg-gray-800 py-8 rounded flex justify-center font-[family-name:var(--font-jetBrains-mono)]"
}) => {
     const {setDispatch} = useContext(taskContext)
    //appel useState
    const [time, setTime] = useState<string>("hours")
    const [insertHours, setInsertHours] = useState<string>('00')
    const [insertMinutes, setInsertMinutes] = useState<string>('00')
    const [moment, setMoment] = useState<string>('AM')
    const [insertionMode, setInsertionMode] = useState(false)

    //appel useRefcustom
    const hoursRef = useRef<HTMLInputElement | null>(null)
    const munitesRef = useRef<HTMLInputElement | null>(null)

    //constant call
    const hours = ['12', '01', '02', "03","04", "05", "06", "07", "08", "09", "10", "11"]
    const minutes = ['00', '05', '10', "15","20", "25", "30", "35", "40", "45", "50", "55"]

    //useRef call
    useEffect (() => {
        function handleHours (e: Event) {
            const target = e.target as HTMLInputElement
            setInsertHours(target.value)
        }
        function handleMinutes  (e: Event) {
            const target = e.target as HTMLInputElement
            setInsertMinutes(target.value)
        }
        if (hoursRef.current && munitesRef.current) {
            hoursRef.current.addEventListener('change', (e) => handleHours(e))
            munitesRef.current.addEventListener('change', (e) => handleMinutes(e))

            return () => {
                hoursRef.current?.removeEventListener('change', (e) => handleHours(e))
                munitesRef.current?.removeEventListener('change',(e) => handleMinutes(e))
              }
        }
    })

    return <section className={clockName}>
            <p className="absolute text-white top-4">select time</p> 
            {time === "hours" || insertionMode ? <SelectTime time={hours} setInsert = {setInsertHours}/> :
             <SelectTime time={minutes} setInsert = {setInsertMinutes}/>}
            <div className="absolute text-white top-12">
                <span className="flex items-center space-x-4 text-4xl">
                    <input 
                        type={!insertionMode ? 'button' : 'number'} 
                        ref={hoursRef} 
                        onChange={() => {setTime("hours")}} 
                        onClick={() => {setTime("hours")}} 
                        className={clsx("px-4 py-1 w-20 rounded cursor-pointer", {
                            'bg-terciary' : time === 'hours',
                            'bg-gray-400' : time !== 'hours'
                        })} 
                        value={insertionMode === false ? insertHours : undefined}/>
                    <p>:</p>
                    <input 
                        type={!insertionMode ? 'button' : 'number'} 
                        ref={munitesRef} 
                        onChange={() => {setTime("minutes")}} 
                        onClick={() => {setTime("minutes")}} 
                        className={clsx("px-4 py-1 w-20 rounded cursor-pointer", {
                            'bg-terciary' : time === 'minutes',
                            'bg-gray-400' : time !== 'minutes'
                        })} 
                        value={insertionMode === false ? insertMinutes : undefined}/>
                    <div className="text-sm flex flex-col border rounded">
                        <p onClick={()=> {setMoment('AM')}} className={clsx("p-2 cursor-pointer border-b", {'bg-terciary' : moment === 'AM'})}>AM</p>
                        <p onClick={()=> {setMoment('PM')}} className={clsx("p-2 cursor-pointer", {'bg-terciary' : moment === 'PM'})}>PM</p>
                    </div>
                </span>
            </div>
            
            <div className="flex justify-between absolute w-full bottom-4 px-4">
                <FaRegKeyboard 
                    color="#fff" 
                    className="cursor-pointer"
                    size={24}
                    onClick={() => {
                        
                        insertionMode === false ? setInsertionMode(true) : setInsertionMode(false)
                    }}
                />
                <div className="space-x-4">
                    <button  
                        className="text-terciary"
                        onClick={() => {
                            if (type === 'start') {
                                setDispatch({clockStart: `${insertHours}:${insertMinutes} ${moment}`})
                            } else {
                                setDispatch({clockEnd: `${insertHours}:${insertMinutes} ${moment}`})
                            }
                            setDispatch({clock: ''})
                        }}
                    >ok</button>
                    <button className="text-terciary" onClick={() => setDispatch({clock: ''})}>cancel</button>
                </div>
            </div>
    </section>
}
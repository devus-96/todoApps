"use client"
import React from "react";
import { useContext, useEffect, useRef, useState } from "react"
import { FaRegKeyboard } from "react-icons/fa"
import { SelectTime } from "./selectTime"
import clsx from "clsx"
import { connectContext } from "@/hooks/useConnect";
import { popupContext } from "@/hooks/usePopup";
import { tabTask } from "@/types/task";

export const Clock = () => {
     const {typeTime, setFormTask, formTask, action, setGroupFormTask, indexes} = useContext(connectContext)
     const {setDispatch} = useContext(popupContext)
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

    return <section className='w-[300px] h-[420px] bg-primary py-8 rounded flex justify-center font-[family-name:var(--font-jetBrains-mono)]'>
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
                            'bg-btnColor' : time === 'hours',
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
                            'bg-btnColor' : time === 'minutes',
                            'bg-gray-400' : time !== 'minutes'
                        })} 
                        value={insertionMode === false ? insertMinutes : undefined}/>
                    <div className="text-sm flex flex-col rounded">
                        <p onClick={()=> {setMoment('AM')}} className={clsx("p-2 cursor-pointer", {'bg-btnColor' : moment === 'AM'})}>AM</p>
                        <p onClick={()=> {setMoment('PM')}} className={clsx("p-2 cursor-pointer", {'bg-btnColor' : moment === 'PM'})}>PM</p>
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
                        className="text-btnColor"
                        onClick={() => {
                            switch (action) {
                                case 'task':
                                    if (typeTime === 'start') {
                                        let value = {start_time: `${insertHours}:${insertMinutes} ${moment}`}
                                        setFormTask({...formTask, ...value})
                                    } else {
                                        let value = {end_time: `${insertHours}:${insertMinutes} ${moment}`}
                                        setFormTask({...formTask, ...value})
                                    }
                                case 'project':
                                    if (typeTime === 'start') {
                                        setGroupFormTask((prevElements: tabTask[]) => {
                                            const nouveauTableau = [...prevElements];
                                            nouveauTableau[indexes].start_time = `${insertHours}:${insertMinutes} ${moment}` ;
                                            return nouveauTableau;
                                        })
                                    } else {
                                        setGroupFormTask((prevElements: tabTask[]) => {
                                            const nouveauTableau = [...prevElements];
                                            nouveauTableau[indexes].end_time = `${insertHours}:${insertMinutes} ${moment}` ;
                                            return nouveauTableau;
                                        })
                                    }
                            }
                            
                            setDispatch({clock: false})
                        }}
                    >ok</button>
                    <button className="text-btnColor" onClick={() => setDispatch({clock: false})}>cancel</button>
                </div>
            </div>
    </section>
}
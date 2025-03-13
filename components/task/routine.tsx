"use client"
import React from "react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Select } from "../select";
import { weeks } from "@/constants/task";
import clsx from "clsx";
import PopUpTags from "../PopUpTags";
import { Calendar } from "../calendar";
import { taskContext } from "@/hooks/useTask";
import { format } from "date-fns";
import { useForm } from "@/hooks/useForm";

export default function Routine ({setOutput}: {setOutput: Dispatch<SetStateAction<unknown>>}) {
    const [ select, setSelect ] = useState('day')
    const [monthly, setMonthly] = useState('')
    const [active, setActive] = useState<number[]>([])
    const {state, setDispatch} = useContext(taskContext)
    const [date, setDate] = useState(new Date())


    const { 
            handleOption, 
            handleChange, 
            value, 
            setValue,
            checked
            } = useForm(state.deadline, state.date, state.clockStart, state.clockEnd)

    useEffect (() => {
        const tab = active.map((item) => weeks[item])
        setValue({
            ...value, 
            end: format(date, "ccc dd LLLL yyyy"), 
            occMonth: monthly,
            occWeek: tab,
            each: select
        })
    }, [select, active, monthly, date])

    return <>
        <PopUpTags state={state.calendar}>
            <Calendar value={date} onChange={setDate}/>
        </PopUpTags>
        <div className="w-[300px] h-[420px] bg-white px-4 py-4 space-y-4 rounded capitalize flex flex-col font-[family-name:var(--font-jetBrains-mono)]">
            <div className="space-y-4">
                <h1>repeat every</h1>
                <div className="flex items-center space-x-4">
                    <input type="number" onChange={handleChange} name="every" className="px-4 py-2.5 bg-gray-200 w-20 rounded cursor-pointer border"/>
                    <Select 
                        name="day" 
                        handler={setSelect} 
                        options={["day", 'week', 'month', 'year']}
                        inputClass="inputClass"
                        className = "inputclassName"
                        seclectClass = 'absolute w-full top-[-180px] rounded p-5 mb-2 bg-white shadow'
                    />
                </div>
            </div>
            {select === 'week' &&
                <div className="w-full flex justify-around">
                    {weeks.map((item, index) => (
                        <button key={index} onClick={() => {
                            !active.includes(index) ? setActive([...active, index]) : setActive(active.filter((item) => item !== index))
                        }} value={item} className={clsx("flex-center btnWeekly border-terciary text-terciary", {
                            'border border-terciary text-terciary' : !active.includes(index),
                            'bg-terciary text-white' : active.includes(index),
                        })}>{item[0]}</button>
                    ))}
                </div>
            }
            {select === 'month' && 
                <Select 
                    name="same day number" 
                    handler={setMonthly} 
                    options={["same day number", 'same day of week', 'last day of month']}
                    inputClass="inputClass"
                    className = "inputclassName"
                    seclectClass = 'absolute w-full top-[-150px] rounded p-5 mb-2 bg-white shadow'
                />
            }
            
            <div className="space-y-4">
                <h1>ends</h1>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <input type="radio" name="end" onChange={handleOption} checked={checked}/>
                        <label htmlFor="">Never</label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="radio" name=""/>
                        <button className="btnClock" onClick={() => {
                            setDispatch({calendar: 'calendar'})
                        }}>{`${format(date, "ccc dd LLLL yyyy")}`}</button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="radio" name=""/>
                        <div className="flex items-center">after <input type="number" onChange={handleChange} name="end" className="px-4 py-1 w-20 bg-gray-200 rounded cursor-pointer border"/> ocurrences</div>
                    </div>
                </div>
                
            </div>
            <div className="w-full">
                <button className=" float-right cursor-pointer text-terciary" onClick={() => {
                    setOutput(value)
                    setDispatch({routine: ''})
                }}>done</button>
            </div>
    </div>
    </>
}
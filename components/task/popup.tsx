"use client"
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { Calendar } from '../calendar';
import { format } from 'date-fns';
import { Select } from '../select';
import { Spinner } from '../spinner';
import { taskContext } from "@/hooks/useTask";
import { useContext } from "react";
import clsx from "clsx";
import PopUpTags from '../PopUpTags';
import { optionsRepetition } from '@/constants/task';
import { Clock } from './clock';


type task = {
    name: string
    date: Date
    startTime: string
    endTime: string
    allday: boolean
    repetition: boolean | string | any[]
    description: string
}

export const Popup = () => {
    // state call
    const [select, setSelect] = useState<string>('')
    const [ type, setType ] = useState('start')
    const data = useRef<task | any >({})
    const {state, setDispatch} = useContext(taskContext)

    useEffect(() => {
        if (data.current) {
            if (select === 'Does not repeat') {
                data.current['repetition'] = false
            } else {
                data.current['repetition'] = select
            }
        }
    }, [select])

    function handleChange (e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        const key = target.name as 'name' | 'description'
        if (data.current && (target.type === "text" || target.type === 'textarea')) {
            data.current[key] = target.value
        } else {
            data.current[key] = target.checked
        }
    }

    return <>
            <PopUpTags state={state.clock}>
                <Clock type={type}/>
            </PopUpTags>
            <div className={clsx({
                'hidden' : state.form === '',
                'popupTask' : state.form === 'Project' || state.form === 'Task'
            })}>
                <input 
                    type="text" 
                    name='name'
                    className="inputnameTask" 
                    placeholder="Add task"
                    onChange={handleChange}
                />
            
                <input 
                    onClick={() => setDispatch({calendar: 'calendar'})} 
                    type="button" value={`${format(state.date, "ccc dd LLLL yyyy")}`} 
                    className="btnClock"
                />
                <div className="w-full flex items-center space-x-4">
                    <button type="button" onClick={() => {
                        setDispatch({clock: 'start'})
                        setType('start')
                    }} className="btnClock">{state.clockStart}</button>
                    <p>-</p>
                    <button type="button" onClick={() => {
                        setDispatch({clock: 'end'})
                        setType('end')
                    }} className="btnClock">{state.clockEnd}</button>
                </div>
                <div>
                    <input type="checkbox" name="allday" onChange={handleChange} />
                    <label htmlFor="">all day</label>
                </div>
                <Select 
                    name="Does not repeat" 
                    handler={setSelect} 
                    options={optionsRepetition}
                    inputClass="inputClass"
                    className = "inputclassName"
                    seclectClass = 'seclectClass'
                />
                <textarea 
                    placeholder='add description'
                    onChange={handleChange}
                    name='description'
                    className="textarea"
                ></textarea>
                <button type="submit" className="btn1 flex-center gap-4">{<Spinner className="w-[30px] p-0"/>}Save</button>
            </div>
            </>
}

 /*
 
           
            */
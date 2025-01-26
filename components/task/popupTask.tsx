"use client"
import React from "react"
import { taskContext } from "@/hooks/useTask"
import clsx from "clsx"
import { format } from "date-fns"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Select } from "../select"
import { optionsRepetition } from "@/constants/task"
import { Spinner } from "../spinner"
import { useForm } from "@/hooks/useForm"

interface PopUpTaskProps {
    setType: Dispatch<SetStateAction<string>>
    output: any
}

const PopUpTask:React.FC<PopUpTaskProps> = ({
    setType,
    output
}) => {
    const {state, setDispatch} = useContext(taskContext)
    const [select, setSelect] = useState<string>('')
    const { 
            handleOption, 
            handleChange, 
            value, 
            startDateRef,
            endRef,
            startRef,
            dedlineRef,
            setValue
            } = useForm(state.date, state.deadline, state.clockStart, state.clockEnd)
    
    useEffect(() => {
        setValue({next_time: select})
        if (select === 'custom') {
            setDispatch({routine: 'routine'})
            setSelect('Does not repeat')
        }
        if (select === 'Does not repeat') {
            setValue({...value, next_time: false})
        } else if (output !== null) {
            setValue({...value, next_time: output})
        } else {
            setValue({...value, next_time: select})
        }
    }, [select, state.routine])
    return <>

             <div className={clsx({
                    'hidden' : state.form === '',
                    'popupTask' : state.form === 'Task'
                })}>
                    <input 
                        type="text" 
                        name='name'
                        className="inputnameTask" 
                        placeholder='Add Task'
                        onChange={handleChange}
                    />
                    <div className="w-full flex items-center justify-between">
                        <div className="">
                            <p>start date</p>
                            <input 
                                ref={startDateRef}
                                onClick={(e: any) => {
                                    handleChange(e)
                                    setDispatch({calendar: 'calendar'})
                                }} 
                                name="start_date"
                                type="button" value={`${format(state.date, "ccc dd LLLL yyyy")}`} 
                                className="btnClock bg-gray-100 text-sm"
                            />
                        </div>
                       
                        <div className="">
                            <p>end date</p>
                            <input 
                                ref={dedlineRef}
                                onClick={(e: any) => {
                                    setDispatch({calendar: 'calendar'})
                                    setDispatch({isDeadline: true})
                                    handleChange(e)
                                }} 
                                name="deadline"
                                type="button" value={`${format(state.deadline, "ccc dd LLLL yyyy")}`} 
                                className="btnClock bg-gray-100 text-sm"
                            />
                        </div>
                        
                    </div>
                    <div className="w-full flex items-center space-x-4">
                        <input ref={startRef} type="button" value={state.clockStart} onClick={() => {
                            setDispatch({clock: 'start'})
                            setType('start')
                        }} className="btnClock" />
                        <p>-</p>
                        <input ref={endRef} type="button" value={state.clockEnd} onClick={() => {
                            setDispatch({clock: 'end'})
                            setType('end')
                        }} className="btnClock" />
                    </div>
                    
                    <div>
                        <input type="checkbox" name="allday" value={undefined} onChange={handleOption} />
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

export default PopUpTask
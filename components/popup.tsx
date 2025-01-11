"use client"

import { Clock } from './clock';
import { useRef, useState, useEffect } from 'react';
import { Calendar } from './calendar';
import { format } from 'date-fns';
import { Select } from './select';
import { Spinner } from './spinner';

export const Popup = () => {
    // state call
    const [clock, setClock] = useState('00 : 00 AM')
    const [type, setType] = useState('start')
    const [show, setShow] = useState(false)
    const [showCalendar, setShowCalendar] = useState(true)
    const [currentDate, setCurrentDate] = useState(new Date())

    //useRef call
    const startRef = useRef<HTMLInputElement | null>(null)
    const endRef = useRef<HTMLInputElement | null>(null)

    //useEffet call
    useEffect(() => {
        if (startRef.current && type === 'start') {
            startRef.current.value = clock
        }
        if (endRef.current && type === 'end') {
            endRef.current.value = clock
        }
    }, [type])

    return <div className="fixed top-0 bottom-0 left-0 right-0 bg-popup flex items-center justify-center font-[family-name:var(--font-jetBrains-mono)]">
            <Clock setClock={setClock} setShow={setShow} show={show} />
            <Calendar value={currentDate} onChange={setCurrentDate} setTrigger={setShowCalendar}/>
            <div className="w-[500px] h-auto space-y-4 bg-white rounded px-8 py-8">
                <input 
                    type="text" 
                    className="w-full border-b-2 border-b-gray-500 outline-none placeholder:text-xl" 
                    placeholder="Add task"
                />
                <div className='space-x-4'>
                    <button className='bg-primary text-white smallbtn'>task</button>
                    <button className='bg-primary text-white smallbtn'>step1</button>
                    <button className='bg-primary text-white smallbtn'>step2</button>
                </div>
                <input type="button" value={`${format(currentDate, "ccc dd LLLL yyyy")}`} className="bg-gray-200 rounded px-4 py-2 cursor-pointer"/>
                <div className="w-full flex items-center space-x-4">
                    <input ref={startRef} type="button" onClick={() => {
                        setType('start')
                        setShow(true)
                    }} className="bg-gray-200 rounded px-4 py-2 cursor-pointer"/>
                    <p>-</p>
                    <input ref={endRef} type="button" onClick={() => {
                        setType('end')
                        setShow(true)
                    }} className="bg-gray-200 rounded px-4 py-2 cursor-pointer"/>
                </div>
                <div>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">all day</label>
                </div>
                <Select 
                    name="" 
                    handler={() => {}} 
                    value="" 
                    options={["Does not repeat", 'Daily', 'weekly on monday', 'monthly on first monday', 'annually on january 1','every weekend', 'custom' ]}
                    inputClass="flex h-12 bg-gray-200 p-5 text-base sm:text-sm 2xl:text-lg font-normal rounded items-center cursor-pointer justify-between"
                    className = "w-full relative border border-secondary rounded"
                    seclectClass = "absolute w-full top-[-300px] rounded p-5 mb-2 bg-white shadow"
                />
                <textarea 
                    placeholder='add description'
                    className="w-full h-[20vh] bg-gray-200 rounded-lg border outline-none p-3 text-textcolor resize-none text-sm max-lg:mb-5"
                ></textarea>
                <button type="submit" className="btn1 flex-center gap-4">{<Spinner className="w-[30px] p-0"/>}Save</button>
            </div>
    </div>
}
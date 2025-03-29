"use client"

import { connectContext } from "@/hooks/useConnect"
import { useContext, useEffect, useRef, useState } from "react"
import { EmailList } from "./emailList"
import { popupContext } from "@/hooks/usePopup"
import { format } from "date-fns"
import { Status } from "./status"

/*DOMRect {x: 906.296875, y: 530, width: 109.578125, height: 32, top: 530
*/


export const ProjectTable = ({setPosition}:{setPosition: React.Dispatch<React.SetStateAction<{
    x: number;
    top: number;
}>>}) => {
    //useState
    let [numberEmal, setNumberEmail] = useState(1)
    let [priority, setPriority]  = useState<string>('')
    let [status, setStatus]  = useState<string>('')
    //useRef
    let numberEmailRef = useRef<number>(1)
    let emailsRef = useRef<string[]>([''])
    let statusRef = useRef<HTMLDivElement>(null)
    let priorityRef = useRef<HTMLDivElement>(null)
    //useContext
    const {formTask, setFormTask, setDateValue, setTypeTime} = useContext(connectContext)
    const {setDispatch} = useContext(popupContext)
    //useEffect
    useEffect(() => {
        let newValue = {priority: priority}
        setFormTask({...formTask, ...newValue})
    }, [priority])
    useEffect(() => {
        let newValue = {status: status}
        setFormTask({...formTask, ...newValue})
    }, [status])
    useEffect(() => {
        function handlerBoundingClientRect (event: MouseEvent) {
            let target = event.target as HTMLDivElement
            // Récupérer les coordonnées du clic
            const y = event.clientY;
            let upordown = y  + 300 > window.innerHeight
            const boutonRect = target.getBoundingClientRect();
            let height = boutonRect.bottom - boutonRect.top
            if (upordown) {
                setPosition({x: boutonRect.left,top: (boutonRect.top - 300) + height})
            } else {
                setPosition({x: boutonRect.left,top: boutonRect.top})
            }

        }
        statusRef.current?.addEventListener('click', (e) => handlerBoundingClientRect(e))
        return () => {
            statusRef.current?.removeEventListener('click', (e) => handlerBoundingClientRect(e))
        }
    })
    //Dom
    return (
    <>
        <tr>
            <td className="border-l border-r border-t border-primary">
                <input 
                onChange={(e) => {}}
                value={undefined}
                type="text" 
                name='name'
                className="px-4 py-2 w-full outline-none bg-secondary placeholder:text-gray-500" 
                placeholder="Write project's objectif"
                />
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="full py-1 px-1">
                {Array.from({ length: numberEmal }).map((_,index) => (
                    <EmailList key={index} numberEmailRef={numberEmailRef} emailsRef={emailsRef} setNumberEmail={setNumberEmail} />
                ))}
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div ref={statusRef} className="w-full px-4 py-[4px]  text-start rounded text-gray-500 cursor-pointer duration-300 hover:bg-gray-800" onClick={() => setDispatch({status: true})}>
                    <p>Status</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px]  text-start rounded text-gray-500 cursor-pointer duration-300 hover:bg-gray-800">
                    <p>Priority</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary ">
                <div className="w-full px-4 py-[4px] text-start text-gray-500 cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('startdate')
                }}>
                    <p>{format(formTask.start_date, "dd/MM/yyyy")}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px] text-start text-gray-500 cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('deadline')
                }}>
                    <p>{format(formTask.deadline, "dd/MM/yyyy")}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary pl-4">
                <div className="w-full px-4 py-[4px]  text-start rounded text-gray-500 cursor-pointer duration-300 hover:bg-gray-800" onClick={() => {
                setTypeTime('start')
                setDispatch({clock: true})
                }}>
                    <p>{formTask.start_time}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary pl-4">
                <div className="w-full px-4 py-[4px]  text-start rounded text-gray-500 cursor-pointer duration-300 hover:bg-gray-800" onClick={()=> {
                setTypeTime('end')
                setDispatch({clock: true})
                }}>
                <p>{formTask.end_time}</p>
                </div>
            </td>
        </tr>
    </>
    )
}
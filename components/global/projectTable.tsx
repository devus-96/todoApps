"use client"

import { connectContext } from "@/hooks/useConnect"
import { useContext, useRef, useState } from "react"
import { EmailList } from "./emailList"
import { popupContext } from "@/hooks/usePopup"
import { useForm } from "@/hooks/useForm"
import { tabTask } from "@/types/task"

interface ProjectProps {
    index: number
    priority: string,
    states: string,
    start_date: string,
    deadline: string,
    setPosition: React.Dispatch<React.SetStateAction<{
        x: number;
        top: number;
    }>>
}

export const ProjectTable:React.FC<ProjectProps> = ({
    index,
    priority,
    states,
    start_date,
    deadline,
    setPosition
}) => {
    //useState
    let [numberEmal, setNumberEmail] = useState(1)
    //useRef
    let numberEmailRef = useRef<number>(1)
    let emailsRef = useRef<string[]>([''])
    //useContext
    const {setDateValue, setIndexes,setAction, setGroupFormTask} = useContext(connectContext)
    const {setDispatch} = useContext(popupContext)
    //hook
    const {handleChange, value, valueRef} = useForm({name: ''})
    //function
    function handlerBoundingClientRect (event: React.MouseEvent) {
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
    //Dom
    return (
    <>
        <tr>
            <td className="border-l border-r border-t border-primary">
                <textarea
                 onChange={(e) => {
                    handleChange(e)
                    setGroupFormTask((prevElements: tabTask[]) => {
                        // Créer une copie du tableau pour éviter de modifier l'état directement
                        const nouveauTableau = [...prevElements];
                        // Modifier la valeur de x du premier élément
                        nouveauTableau[index].name = valueRef.current;
                        return nouveauTableau;
                    });
                 }}
                 value={value.name}
                 name='name'
                 placeholder="Write task's name"
                 className="px-4 py-2 w-full outline-none resize-none scrollbar-hide bg-secondary placeholder:text-gray-500" 
                 ></textarea>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="full py-1 px-1">
                {Array.from({ length: numberEmal }).map((_, i) => (
                    <EmailList key={i} index={index} numberEmailRef={numberEmailRef} emailsRef={emailsRef} setNumberEmail={setNumberEmail} />
                ))}
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px]  text-start rounded text-gray-500 cursor-pointer duration-300 hover:bg-gray-800" onClick={(e) => {
                    setDispatch({states: true})
                    setDispatch({priority: false})
                    handlerBoundingClientRect(e)
                    setIndexes(index)
                }}>
                    <p>{states}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px]  text-start rounded text-gray-500 cursor-pointer duration-300 hover:bg-gray-800" onClick={(e) => {
                    setDispatch({states: false})
                    setDispatch({priority: true})
                    handlerBoundingClientRect(e)
                    setIndexes(index)
                }}>
                    <p>{priority}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary ">
                <div className="w-full px-4 py-[4px] text-start text-gray-500 cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('startdate')
                setIndexes(index)
                setAction('project')
                }}>
                    <p>{start_date}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px] text-start text-gray-500 cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('deadline')
                setIndexes(index)
                setAction('project')
                }}>
                    <p>{deadline}</p>
                </div>
            </td>
        </tr>
    </>
    )
}
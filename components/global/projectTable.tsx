"use client"

import { connectContext } from "@/hooks/useConnect"
import { useContext, useEffect, useRef, useState } from "react"
import { EmailList } from "./emailList"
import { popupContext } from "@/hooks/usePopup"
import { useForm } from "@/hooks/useForm"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"

interface ProjectProps {
    index: number
    priority: string,
    states: string,
    start_date: string,
    deadline: string,
    start_time: string | undefined,
    end_time: string | undefined,
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
    start_time,
    end_time,
    setPosition
}) => {
    //useState
    let [numberEmail, setNumberEmail] = useState(1)
    //useRef
    let numberEmailRef = useRef<number>(1)
    //useContext
    const {setDateValue, setIndexes,setAction, setGroupFormTask, setTypeTime, groups} = useContext(connectContext)
    const {setDispatch} = useContext(popupContext)
    //hook
    const {handleChange, value, valueRef} = useForm({name: ''})
    const positonState = usePosition()
    const priorityPosition = usePosition()
    //useEffect
    useEffect(() => {
        setPosition(positonState.position)
    }, [positonState.position])
    useEffect(() => {
        setPosition(priorityPosition.position)
    }, [priorityPosition.position])
    
    function handleKeyUp (occurence: number, value: string, index: number) {
        console.log(occurence)
        let objectifValue = {[`${occurence- 1}`]: value};
        setGroupFormTask((prevElements: Tasks[]) => {
            const nouveauTableau = [...prevElements];
            nouveauTableau[index].assign = {...nouveauTableau[index].assign, ...objectifValue};
            return nouveauTableau;
        })
    }
    //Dom
    return (
    <>
        <tr>
            <td className="border-l border-r border-t border-primary">
                <textarea
                 onChange={(e) => {
                    handleChange(e)
                    setGroupFormTask((prevElements: Tasks[]) => {
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
                 className="px-4 py-2 w-full outline-none resize-none scrollbar-hide bg-secondary placeholder:text-holder" 
                 ></textarea>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="full py-1 px-1">
                {Array.from({ length: numberEmail }).map((_, i) => (
                    <EmailList key={i} index={index} handle={handleKeyUp} numberEmailRef={numberEmailRef} setNumberEmail={setNumberEmail} />
                ))}
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px]  text-start rounded text-sidebarText cursor-pointer duration-300 hover:bg-gray-800" onClick={(e) => {
                }}>
                    <div className="flex-center px-2 text-sm text-gray-800 rounded-full bg-[#60a5fa]">
                        <p>{states}</p>
                    </div>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px]  text-start rounded text-sidebarText cursor-pointer duration-300 hover:bg-gray-800" onClick={(e) => {
                    setDispatch({states: false})
                    setDispatch({priority: true})
                    priorityPosition.handlerBoundingClientRight(e, 250)
                    setIndexes(index)
                }}>
                    <p>{priority}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary ">
                <div className="w-full px-4 py-[4px] text-start text-sidebarText cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('startdate')
                setIndexes(index)
                setAction('project')
                }}>
                    <p>{start_date}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px] text-start text-sidebarText cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('deadline')
                setIndexes(index)
                setAction('project')
                }}>
                    <p>{deadline}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary ">
                <div className="w-full px-4 py-[4px] text-start text-sidebarText cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({clock: true})
                setIndexes(index)
                setAction('project')
                setTypeTime('start')
                }}>
                    <p>{start_time && start_time}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="w-full px-4 py-[4px] text-start text-sidebarText cursor-pointer  duration-300 hover:bg-gray-800" onClick={() => {
                setDispatch({clock: true})
                setIndexes(index)
                setAction('project')
                setTypeTime('end')
                }}>
                    <p>{end_time && end_time}</p>
                </div>
            </td>
        </tr>
    </>
    )
}
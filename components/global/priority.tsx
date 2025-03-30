"use client"

import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { tabTask } from "@/types/task"
import { useContext, useEffect, useRef } from "react"

const priorityState = [
    {name: 'low', color: '#a1a1aa'},
    {name: 'medium', color: '#a78bfa'},
    {name: 'high', color: '#f87171'},
]

export const Priority = ({left, top}:{left: number, top: number}) => {
    //useRef
    const priorityRef = useRef<HTMLDivElement>(null)
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {indexes, setGroupFormTask} = useContext(connectContext)
    //useEffect
    useEffect(() => {
        const handlerClic = (e: MouseEvent) => {
            const target = e.target as Document
            if (!priorityRef?.current?.contains(target)) {
                setDispatch({priority: false})
            }

        }
        document.addEventListener("mousedown", handlerClic)
            return () => {
                document.removeEventListener("mousedown", handlerClic)
            }
        }, [state.priority])
    //DOM
    return (
        <>
            {state.priority &&
                <div ref={priorityRef} className={`w-[250px] h-[300px] flex flex-col text-sidebarText bg-primary fixed z-50 rounded`} 
                    style={{
                        left: left + 'px',
                        top: top + 'px'
                    }}
                >
                    <p className="text-xs mb-4 ml-4 mt-4">select one option below</p>
                    <div className="space-y-4">
                        {priorityState.map((item, index) => (
                            <div key={index} onClick={() => {
                                setGroupFormTask((prevElements: tabTask[]) => {
                                    // Créer une copie du tableau pour éviter de modifier l'état directement
                                    const nouveauTableau = [...prevElements];
                                    // Modifier la valeur de x du premier élément
                                    nouveauTableau[indexes].priority = item.name;
                                    return nouveauTableau;
                                });
                                setDispatch({priority: false})
                            }} className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer py-1">
                                <div className="px-2 py-1 text-gray-800 rounded-full" style={{
                                    background: `${item.color}`
                                }}>
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
        
    )
}
"use client"

import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { tabTask } from "@/types/task"
import { useContext, useEffect, useRef } from "react"

const statusState = [
    {name: 'Cancel', color: '#a1a1aa'},
    {name: 'Done', color: '#34d399'},
    {name: 'In Progress', color: '#fbbf24'},
    {name: 'Plan', color: '#60a5fa '}
]

export const Status = () => {
    //useRef
    const menuRef = useRef<HTMLTableCellElement>(null)
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {indexes, setGroupFormTask} = useContext(connectContext)
    //useEffect
    useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            const target = e.target as Document
            if (!menuRef?.current?.contains(target)) {
                setDispatch({states: false})
            }
        }
        document.addEventListener("mousedown", handlerClick)
            return () => {
                document.removeEventListener("mousedown", handlerClick)
            }
        }, [state.states])
    //DOM
    return (
        <>
                <td ref={menuRef} className={`flex flex-col`}>
                    <p className="text-xs mb-4 ml-4 mt-4">select one option below</p>
                    <div className="space-y-4">
                        {statusState.map((item, index) => (
                            <div key={index} onClick={() => {
                                setGroupFormTask((prevElements: tabTask[]) => {
                                    console.log(index)
                                    // Créer une copie du tableau pour éviter de modifier l'état directement
                                    const nouveauTableau = [...prevElements];
                                    // Modifier la valeur de x du premier élément
                                    nouveauTableau[indexes].state = item.name;
                                    return nouveauTableau;
                                  });
                                setDispatch({states: false})
                            }} className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer py-1">
                                <div className="px-2 text-sm text-gray-800 rounded-full" style={{
                                    background: `${item.color}`
                                }}>
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </td>
        </>
    )
}
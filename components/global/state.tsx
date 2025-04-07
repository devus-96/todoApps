"use client"

import { statusState } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { useContext, useEffect, useRef } from "react"
import { Menu } from "./Menu"
import { Tasks } from "@/types/global"

export const Status = () => {
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {indexes, setGroupFormTask, setGroups, groups} = useContext(connectContext)
    //DOM
    return (
        <Menu active={state.priority} dispatch='priority'>
        <div className={`flex flex-col`}>
            <p className="text-xs mb-4 ml-4 mt-4">select one option below</p>
            <div className="space-y-4">
                {statusState.map((item, index) => (
                    <div key={index} onClick={() => {
                        setGroups({state: item.name})
                        setGroupFormTask((prevElements: Tasks[]) => {
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
        </div>
        </Menu>
    )
}
"use client"
import { taskAction } from "@/constants/popup";
import { connectContext } from "@/hooks/useConnect";
import { popupContext } from "@/hooks/usePopup";
import { Tasks } from "@/types/global";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Menu } from "../global/Menu";

export const TaskAction = ({
    value, 
    setValue,
    position
}: {
    value: Tasks, 
    setValue: Dispatch<SetStateAction<Tasks[]>>,
    position: {x: number, top: number}
}) => {
    const {state, setDispatch} = useContext(popupContext)
    const {setFormTask} = useContext(connectContext)
    return (
        <>
        {state.taskAction &&
        <Menu active={state.taskAction} dispatch='taskAction'>
        <div className="fixed w-[234px] h-[180px] z-50 text-sidebarText bg-secondary rounded border border-borderCard"
        style={{
            left: position.x + 'px',
            top: position.top + 'px',
        }}>
        <div>
            <p className="m-4">opions</p>
        {taskAction.map((item, index) => (
        <div key={index} className="w-full px-4">
            <div onClick={() => {
            document.body.style.overflow = 'auto'
            switch (item.name) {
                case 'Duplicate':
                    value && setFormTask(value)
                    setDispatch({task: true, taskAction: false})
                    break;
                case 'Add comment':
                    value && setFormTask(value)
                    setDispatch({comment: true, taskAction: false})
                    break;
                case 'Open':
                    value && setFormTask(value)
                    setDispatch({task: true, taskAction: false})
                    break;
                case 'Delete task':
                    setDispatch({taskAction: false})
                    setValue((prevElements: Tasks[]) => {
                        let newTab = [...prevElements]
                        newTab = newTab.filter((item) => item !== value)
                        return newTab
                    })
                    break;
            }
            }} className={clsx("w-full flex items-center space-x-2 rounded p-1 text-sidebarText hover:bg-primary cursor-pointer text-sm", {
                'hover:text-red-400' : item.name === 'Delete task'
            })}>
                <item.icon size={18} />
                <p>{item.name}</p>
            </div>
        </div>
        ))}
        </div>
        </div>
        </Menu>
        }
        </>
    )
}
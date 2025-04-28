"use client"

import { connectContext } from "@/hooks/useConnect"
import { useContext, useEffect } from "react"
import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"
import { IoMdClose } from "react-icons/io"

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
    }>>,
    error: string,
    value: Tasks[],
}

export const ProjectTable:React.FC<ProjectProps> = ({
    index,
    priority,
    states,
    start_date,
    deadline,
    start_time,
    end_time,
    setPosition,
    error,
    value,
}) => {
    //useContext
    const {setDateValue, setIndexes,setAction, setTypeTime, setGroups, groups} = useContext(connectContext)
    const {setDispatch} = useContext(popupContext)
    //hook
    const menberPosition = usePosition()
    const positonState = usePosition()
    const priorityPosition = usePosition()
    //useEffect
    useEffect(() => {
        setPosition(positonState.position)
    }, [positonState.position])
    useEffect(() => {
        setPosition(priorityPosition.position)
    }, [priorityPosition.position])
    useEffect(() => {
        setPosition(menberPosition.position)
    }, [menberPosition.position])
    //Dom
    return (
    <>
        <tr>
            <td className="border-l border-r border-t border-primary w-[250px]">
                <textarea
                 onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    setGroups({name: target.value})
                }}
                 onClick={() => setIndexes(index)}
                 value={undefined}
                 name='name'
                 placeholder="Write task's name"
                 className="px-4 py-2 w-full text-sm outline-none resize-none scrollbar-hide bg-secondary placeholder:text-holder" 
                 ></textarea>
            </td>
            <td className="border-l border-r border-t border-primary w-[250px]">
                <div>
                <div>
                {value[index].assign &&
                    <div>
                    {Object.entries(value[index].assign).map((menber, i) => {
                        return (
                        <div key={i}>
                            <div className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                <p>{menber[1]}</p>
                                <IoMdClose onClick={() => {
                                    setIndexes(index)
                                    if (typeof value[index].assign !== 'string') {
                                        let assign = value[index].assign
                                        if (assign) {
                                            delete assign[menber[0]]
                                        }
                                    }
                                }} size={12} className="cursor-pointer"/>
                            </div>
                        </div>
                        )
                    })}
                    </div>
                }
                </div>
                <div className="full">
                    <button onClick={(e) => {
                        menberPosition.handlerBoundingClientRight(e, 250)
                        setDispatch({
                            states: false,
                            priority: false,
                            menberList: true
                        })
                        setIndexes(index)
                        setGroups({})
                    }} className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 text-center text-xs">
                        <p>Add Participants</p>
                    </button>
                </div>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="statepriority_btn" onClick={(e) => {
                }}>
                    <div className="flex-center px-2 text-sm text-gray-800 rounded-full bg-[#a1a1aa]">
                        <p>{states}</p>
                    </div>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="statepriority_btn" onClick={(e) => {
                    setDispatch({states: false})
                    setDispatch({priority: true})
                    priorityPosition.handlerBoundingClientRight(e, 250)
                    setIndexes(index)
                }}>
                    <p>{priority}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary ">
                <div className="taskTab_btn" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('start_date')
                setIndexes(index)
                }}>
                    <p>{start_date}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="taskTab_btn" onClick={() => {
                setDispatch({calendar: true})
                setDateValue('deadline')
                setIndexes(index)
                }}>
                    <p>{deadline}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary ">
                <div className="taskTab_btn" onClick={() => {
                setDispatch({clock: true})
                setIndexes(index)
                setAction('project')
                setTypeTime('start')
                }}>
                    <p>{start_time ? start_time : "00:00AM"}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary">
                <div className="taskTab_btn" onClick={() => {
                setDispatch({clock: true})
                setIndexes(index)
                setAction('project')
                setTypeTime('end')
                }}>
                    <p>{end_time ? end_time : "00:00AM"}</p>
                </div>
            </td>
        </tr>
    </>
    )
}
"use client"
import React from "react"
import { HeaderProject } from "@/components/global/header"
import { Menu } from "@/components/global/Menu"
import { Priority } from "@/components/Tasks/priority"
import { sortListProps, SortTask } from "@/components/Tasks/sortTasks"
import { Status } from "@/components/Tasks/state"
import { TaskTableComponent } from "@/components/project/tasksComponent"
import { Select } from "@/components/ui/select"
import { project, sortTask, tasksRow } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { useForm } from "@/hooks/useForm"
import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"
import { Plus, Search, SquareCheck } from "lucide-react"
import { Filter } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import { CardTasks } from "@/components/Tasks/cardTasks"
import { taskAction, taskOptions } from "@/constants/popup"
import { Menbers } from "@/components/Tasks/menbers"
import { Calendar1 } from "@/components/global/calendar"
import { TaskDetails } from "@/components/popup/taskDetailsPopup"
import clsx from "clsx"
import { useFilter } from "@/hooks/useFilter"

const TaskPage = () => {
    //useRef
    const tabStates = useRef<string[]>([])
    const storeTasks = useRef(project)
    const statesRef = useRef(["Planning","Paused",'In Progress','Done','Canceled'])
    //useState
    const [select, setSelect] = useState('')
    const [sortList, setSortList] = useState<sortListProps>(sortTask)
    const [position, setPosition] = useState({x:0, top:0})
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {groups, indexes, currTaskDetails, setFormTask} = useContext(connectContext)
    //useEffect
    useEffect(() => {
        if (sortList.state === '') {
            statesRef.current = ["Planning","Paused",'In Progress','Done','Canceled']
        } else {
            statesRef.current = statesRef.current.filter((item) => item === sortList.state)
        }
    }, [sortList.state])
    useEffect(() => {
        if (indexes !== null) {
            tasks.setValue((value: Tasks[]) => {
                const newTab = [...value];
                newTab[indexes] = {...newTab[indexes], ...groups};
                return newTab
            })
            storeTasks.current[indexes] = {...storeTasks.current[indexes], ...groups}
        }
    }, [groups, indexes])
    useEffect(() => {
        switch (select) {
            case 'All Tasks':
                setDispatch({
                    boardTask: false,
                    tableTask: true,
                    calendartask: false
                })
                setSortList((list) => {
                    const newValue = sortTask
                    return {...list, ...newValue}
                })
                break;
            case 'Board' :
                setDispatch({
                    boardTask: true,
                    tableTask: false,
                    calendartask: false
                })
                break
            case 'Calendar' :
                setDispatch({
                    boardTask: false,
                    tableTask: false,
                    calendartask: true
                })
                break
        }
    }, [select])
    
    //hook
    const sortPositon = usePosition()
    const tasks = useForm(project)
    //function de trie
    const {values}  = useFilter(sortList, storeTasks.current)
    useEffect(() => {tasks.setValue(() => values)}, [values])
    //DOM
    return  (
        <div className='w-[calc(100%-220px)] pb-8 bg-secondary min-h-screen isolate'>
            <HeaderProject />
            {currTaskDetails.data !== undefined && <TaskDetails task={currTaskDetails} />}
            {state.states &&
            <div aria-hidden='true' className="top-0 left-0 w-svw h-screen absolute">
            <div className="fixed w-[234px] h-[280px] z-50 text-sidebarText bg-primary rounded border-borderCard"
                style={{
                    left: position.x + 'px',
                    top: position.top + 'px',
                }}>
                <Status  />
            </div>
            </div>

            }
            {state.priority &&
            <div className="fixed w-[244px] h-[200px] z-50 text-sidebarText bg-primary rounded"
                 style={{
                     left: position.x + 'px',
                     top: position.top + 'px',
                 }}
                 >
                 <Priority />
            </div>
            }
            {state.sortTask && 
            <Menu active={state.sortTask} dispatch='sortTask'>
                <div className='fixed z-30' style={{
                    left: sortPositon.position.x + 'px',
                    top: sortPositon.position.top + 'px',
                }}>
                    <SortTask taskOptions={taskOptions} type="sort" setSortList={setSortList} sortList={sortList} />
                </div>
            </Menu>
            }
            {state.taskAction && 
            <Menu active={state.taskAction} dispatch='taskAction'>
                <div className='fixed z-30' style={{
                     left: position.x + 'px',
                     top: position.top + 'px',
                }}>
                    {indexes !== null && <SortTask taskOptions={taskAction} setValue={tasks.setValue} value={tasks.value[indexes]} type="action" setSortList={setSortList} sortList={sortList} />}
                </div>
            </Menu>
            }
            {state.menberList && 
            <Menu active={state.menberList} dispatch='menberList'>
                <div className='fixed z-30' style={{
                     left: position.x + 'px',
                     top: position.top + 'px',
                }}>
                    {indexes !== null && <Menbers value={tasks.value[indexes]} />}
                </div>
            </Menu>
            }
            <div className="banniere">

            </div>
            <section>
                <div className="flex items-center text-3xl text-sidebarText space-x-4 px-4 my-4">
                    <SquareCheck /><p>Tasks</p>
                </div>
                <div className="w-full flex justify-between border-b border-borderCard px-4 py-2">
                    <div className="flex items-center">
                        <p className="text-xl text-sidebarText">Music Group</p>
                    </div>
                    <div className="flex items-center text-sidebarText space-x-4">
                        <div>
                            <div onClick={(e) => {
                                setDispatch({sortTask: true})
                                sortPositon.handlerBoundingClientLeft(e, 250, 244)
                            }} className="rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer">
                                <Filter size={16} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-secondary space-x-2 rounded-full text-sidebarText">
                            <Search size={16} />
                            <input 
                                type="text" 
                                className="w-[90%] bg-secondary outline-none placeholder:text-gray-500 placeholder:text-xs"
                                placeholder="search a task"
                                onChange={(e) => tasks.handleFilter(e)}
                            />
                        </div>
                        <Select 
                        name="Daily" 
                        options={['All Tasks', 'Board', 'Calendar']} 
                        handler={setSelect}
                        inputClass="flex items-center cursor-pointer justify-between text-gray-300" 
                        className="w-[200px] relative rounded bg-secondary hover:bg-primary p-1 text-sm border border-borderCard"
                        seclectClass="absolute w-[250px] top-[45px] rounded p-5 mb-2 bg-primary shadow text-sidebarText border border-borderCard"
                        />
                    </div>
                </div>
            </section>
            {Object.values(sortList).filter((item) => item !== '').length !== 0 &&
                <section className="w-full flex items-center border-b border-borderCard px-4 py-2 space-x-4">
                    {Object.entries(sortList).filter((item) => item[1] !== '').map((item, index) => {
                        return (
                            <div key={index} className="flex-justify px-4 py-1 rounded-full border border-btnColor text-btnColor">
                                <p className="mr-4">{item[1]}</p>
                                <MdClose className="cursor-pointer" onClick={() => {
                                    setSortList((list) => {
                                        const newValue = {[item[0]]: ''}
                                        return {...list, ...newValue}
                                    })
                                }} />
                            </div>
                        )
                    })} 
                </section>}
            {state.tableTask &&
            <>
            <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                    <thead>
                        <tr className="text-gray-500">
                        {tasksRow.map((item, index) => (
                                <td key={index} className="border-l border-r border-b border-primary pl-4">
                                    <div className="flex items-center gap-2 text-sm py-2">
                                        <item.icon size={16} className="block"/><p>{item.name}</p>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.value.map((item: Tasks , index: number) => (
                            <TaskTableComponent 
                            key={index} 
                            setPosition={setPosition} 
                            item={item} 
                            occ={index} 
                            value={tasks.value}
                            setProjects={tasks.setValue}
                            />
                        ))}
                </tbody>
            </table>
            <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                setDispatch({task: true})
            }}>
                <Plus size={24} />
                <p>New Task</p>
            </div>
            </>
            }
        {state.boardTask &&
        <div className="w-full overflow-x-auto px-8 scrollbar-hide">
            <div className={clsx("mt-4", {
                'w-[1500px] grid grid-cols-5 gap-4 ': sortList.state === '',
                'w-full': sortList.state !== ''
            })}>
            {statesRef.current.map((state, index) => (
                <div key={index} className="flex flex-col h-fit bg-primary rounded p-4 mb-4 text-sidebarText">
                    <div className="w-full text-2xl capitalize ">
                        <p>{state}</p>
                    </div>
                    {tasks.value.map((item: Tasks , index: number) => {
                        tabStates.current = [...tabStates.current, item.state]
                        return (
                            <div key={index}>
                                {item.state === state &&
                                    <CardTasks occ={index} item={item} setPosition={setPosition} />
                                }
                            </div>
                        )
                    })}
                    <div onClick={() => {
                        setDispatch({task: true})
                        setFormTask((prevValue: Tasks) => {
                            let newTab = {...prevValue}
                            const newValue = {state: state}
                            newTab = { ...newTab, ...newValue}
                            return newTab
                        })
                    }} 
                    className="flex items-center text-sm space-x-4 border rounded py-2 px-2 cursor-pointer border-borderCard">
                        <Plus size={16} /> <p>New task</p>
                    </div>
            </div>
            ))}
        </div>
        </div>  
        }
        {state.calendartask && <Calendar1 />}
        </div>
    )
}

export default TaskPage
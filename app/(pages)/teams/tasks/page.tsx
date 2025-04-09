"use client"

import { HeaderProject } from "@/components/global/header"
import { Menu } from "@/components/global/Menu"
import { Priority } from "@/components/global/priority"
import { SortTask } from "@/components/global/sortTasks"
import { Status } from "@/components/global/state"
import { TaskTableComponent } from "@/components/global/tasksComponent"
import { Select } from "@/components/ui/select"
import { project, projectRow, states } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { useForm } from "@/hooks/useForm"
import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"
import { Plus, SquareCheck } from "lucide-react"
import { Filter } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import { CardTasks } from "@/components/global/cardTasks"
import { taskAction, taskOptions } from "@/constants/popup"

const TaskPage = () => {
    //useRef
    const tabStates = useRef<string[]>([])
    const storeTasks = useRef(project)
    //useState
    const [select, setSelect] = useState('')
    const [sortList, setSortList] = useState({assign: '', priority: '',  state: ''})
    const [position, setPosition] = useState({x:0, top:0})
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {groups, indexes} = useContext(connectContext)
    //useEffect
    useEffect(() => {
        tasks.setValue((value: Tasks[]) => {
            const newTab = [...value];
            newTab[indexes] = {...newTab[indexes], ...groups};
            return newTab
        })
        storeTasks.current[indexes] = {...storeTasks.current[indexes], ...groups}
    }, [groups])
    useEffect(() => {
        switch (select) {
            case 'All Tasks':
                setDispatch({
                    boardTask: false,
                    tableTask: true
                })
                setSortList((list) => {
                    const newValue = {assign: '', priority: '',  state: ''}
                    return {...list, ...newValue}
                })
                break;
            case 'Board' :
                setDispatch({
                    boardTask: true,
                    tableTask: false
                })
                break
        }
    }, [select])
    useEffect(() => {
        if (sortList.priority !== '' || sortList.state !== '' || sortList.assign !== '') {
            tasks.setValue(() => {
                const newtab = [...storeTasks.current]
                const tab = newtab.filter((item: Tasks) => {
                    let condition = true;
                    let condition2 = true;
                    let condition3 = true;
                    for(const [key, value] of Object.entries(sortList)) {
                        if (value !== '' && key === 'state') {
                            condition = item[key].toLowerCase() === value.toLowerCase()
                        } else if (value !== '' && key === 'priority') {
                            condition2 = item[key].toLowerCase() === value.toLowerCase()
                        } else if (value !== '' && key === 'assign') {
                            const menber = sortByMenbers(item.assign, value)
                            condition3 = menber === value
                        }
                    }
                    return condition && condition2 && condition3
                })
                return tab;
            })
        } else {
            tasks.setValue(storeTasks.current)
        }
    }, [sortList])
    //hook
    const sortPositon = usePosition()
    const tasks = useForm(project)
    //function
    function sortByMenbers (menbers: {[key: string]: string}, value: string) {
        for (const [_, menber] of Object.entries(menbers)) {
            if (menber.toLowerCase() === value.toLowerCase()) {
                return menber.toLowerCase()
            }
        }
        return undefined
    }
    //DOM
    return  (
        <div className='w-[calc(100%-200px)] pb-8 bg-secondary min-h-screen'>
            <HeaderProject />
            {state.states &&
            <div className="fixed w-[234px] h-[250px] z-50 text-sidebarText bg-primary rounded border-borderCard"
                style={{
                    left: position.x + 'px',
                    top: position.top + 'px',
                }}>
                <Status  />
            </div>
            }
            {state.priority &&
            <div className="fixed w-[244px] h-[250px] z-50 text-sidebarText bg-primary rounded"
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
                    <SortTask taskOptions={taskAction} type="action" setSortList={setSortList} sortList={sortList} />
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
                        <p className="text-xl text-sidebarText">Music Groupcasascakjbkjbj</p>
                    </div>
                    <div className="flex items-center text-sidebarText space-x-4">
                        <div onClick={(e) => {
                            setDispatch({sortTask: true})
                            sortPositon.handlerBoundingClientLeft(e, 250, 244)
                        }} className="rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer">
                            <Filter size={16} />
                        </div>
                        <Select 
                        name="Daily" 
                        options={['All Tasks', 'Board', 'Daily tasks', 'Weekly tasks', 'Monthly tasks']} 
                        handler={setSelect}
                        inputClass="flex items-center cursor-pointer justify-between text-gray-300" 
                        className="w-[200px] relative rounded bg-secondary hover:bg-primary p-1 text-sm border border-borderCard"
                        seclectClass="absolute w-[250px] top-[45px] rounded p-5 mb-2 bg-primary shadow text-sidebarText"
                        />
                    </div>
                </div>
            </section>
            {((sortList.priority !== '' || sortList.state !== '' ) || sortList.assign !== '') &&
                <section className="w-full flex items-center border-b border-borderCard px-4 py-2 space-x-4">
                    {sortList.assign !== '' &&
                    <div className="flex-justify px-4 py-1 rounded-full border border-btnColor text-btnColor">
                         <p className="mr-4">{sortList.assign}</p>
                         <MdClose className="cursor-pointer" onClick={() => {
                             setSortList((list) => {
                                 const newValue = {assign: ''}
                                 return {...list, ...newValue}
                             })
                         }} />
                     </div>
                    }
                    {sortList.priority !== '' &&
                    <div className="flex-justify px-4 py-1 rounded-full border border-btnColor text-btnColor">
                        <p className="mr-4">{sortList.priority}</p>
                        <MdClose className="cursor-pointer" onClick={() => {
                            setSortList((list) => {
                                const newValue = {priority: ''}
                                return {...list, ...newValue}
                            })
                        }} />
                    </div>
                    }
                    {sortList.state !== '' &&
                     <div className="flex-justify px-4 py-1 rounded-full border border-btnColor text-btnColor">
                        <p className="mr-4">{sortList.state}</p>
                        <MdClose className="cursor-pointer" onClick={() => {
                            setSortList((list) => {
                                const newValue = {state: ''}
                                return {...list, ...newValue}
                            })
                        }} />
                    </div>
                    }
                </section>
            }
            {state.tableTask &&
            <>
            <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                    <thead>
                        <tr>
                        {projectRow.map((item, index) => (
                                <td key={index} className="border-l border-r border-b border-primary pl-4">
                                    <div className="flex items-center gap-2 text-sm">
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
                            handler={tasks.handleChange}
                            value={tasks.value}
                            setProjects={tasks.setValue}
                            />
                        ))}
                </tbody>
            </table>
            <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                
            }}>
                <Plus size={24} />
                <p>New Task</p>
            </div>
            </>
            }
        {state.boardTask &&
        <div className="w-full grid grid-cols-4 gap-4 px-4 mt-4">
            {states.map((state, index) => (
                <div key={index} className="flex flex-col h-fit bg-primary rounded p-4 mb-4 text-sidebarText">
                    <div className="w-full text-2xl capitalize mb-4">
                        <p>{state}</p>
                    </div>
                    {tasks.value.map((item: Tasks , index: number) => {
                        tabStates.current = [...tabStates.current, item.state]
                        console.log(tabStates.current.includes(state))
                        return (
                            <div key={index}>
                                {item.state === state &&
                                    <CardTasks item={item} setPosition={setPosition} />
                                }
                            </div>
                        )
                    })}
                    {(!tabStates.current.includes(state) && !tasks.value.includes(state)) &&
                        <div className="w-full">
                            <p>No task here !!!</p>
                        </div>
                    }
            </div>
            ))}
        </div>
        }
        </div>
    )
}

export default TaskPage
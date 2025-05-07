"use client"
import { fetchProjects, patchTeamsProject } from "@/api/project"
import { useForm } from "@/hooks/useForm"
import { messageContext } from "@/hooks/useMessage"
import { ProjectType, Tasks } from "@/types/global"
import React, { useContext, useEffect, useRef, useState } from "react"
import { HeaderProject } from "../global/header"
import { Status } from "../Tasks/state"
import { Priority } from "../Tasks/priority"
import { sortListProps, SortTask } from "../Tasks/sortTasks"
import { TaskAction } from "../Tasks/TaskAction"
import { Menbers } from "../Tasks/menbers"
import { usePosition } from "@/hooks/usePosition"
import { useFilter } from "@/hooks/useFilter"
import { defaultValue, sortTask, tasksRow, userstasksRow } from "@/constants/task"
import { popupContext } from "@/hooks/usePopup"
import { connectContext } from "@/hooks/useConnect"
import { taskOptions } from "@/constants/popup"
import { Calendar1, Filter, Plus, Search, SquareCheck } from "lucide-react"
import { Select } from "../ui/select"
import { MdClose } from "react-icons/md"
import { TaskTableComponent } from "./tasksComponent"
import clsx from "clsx"
import { CardTasks } from "../Tasks/cardTasks"
import { TaskDetails } from "../popup/taskDetailsPopup"
import { changeDateFormat } from "@/lib/action"
import { createTasks, patchTeamsProjectTasks } from "@/api/tasks"
import { Menu } from "../global/Menu"
import { TaskSchema } from "@/types/schema"
import { usePathname } from "next/navigation"

export const ProjectDetails = ({teamId, projectId}:{teamId?: string, projectId: string}) => {
    const pathname = usePathname()
    //useRef
    const tabStates = useRef<string[]>([])
    const storeTasks = useRef<Tasks[]>(null)
    const statesRef = useRef(["not started","paused",'in progress','done','canceled'])
    //useState
    const [select, setSelect] = useState('')
    const [sortList, setSortList] = useState<sortListProps>(sortTask)
    const [position, setPosition] = useState({x:0, top:0})
    const [showObjectif, setShowObjectif] = useState(false)
    const [showBtnName, setShowBtnName] = useState(false)
    const [objectif, setObjectif] = useState<Record<string, string>>({objectif: ''})
    //hook
    const task = useForm(defaultValue)
    const project = useForm(null)
    //useContext
    const {setGetter} = useContext(messageContext)
    const sortPositon = usePosition()
    const {state, setDispatch} = useContext(popupContext)
    const {indexes, currTaskDetails, setCreatetask, setFormTask} = useContext(connectContext)
    let {groups} = useContext(connectContext)
    //function de trie
    const {values}  = useFilter(sortList, storeTasks.current)
    //useEffect
    useEffect(() => {task.setValue(() => values)}, [values])

    useEffect(() => {
        function handleFetch () {
            fetchProjects(projectId, teamId).then((res) => {
                project.setValue(() => {
                    let newValue = {objectifs: JSON.parse(res.data.data[0].objectifs)}
                    newValue = {...res.data.data[0], ...newValue}
                    return newValue
                })
                task.setValue(res.data.tasks)
                storeTasks.current = res.data.tasks
            }).catch((error) => {
                setGetter((prev) => [...prev, error])
            })
        }
        window.addEventListener('load', handleFetch)
        return () => {
            window.removeEventListener('load', handleFetch)
        }
    })
    useEffect(() => {
        if (sortList.state === '') {
            statesRef.current = ["not started","paused",'in progress','done','canceled']
        } else {
            statesRef.current = statesRef.current.filter((item) => item === sortList.state)
        }
    }, [sortList.state])

    function patchProject () {
        if (indexes !== null) {
            task.setValue((value: Tasks[]) => {
                const newTab = [...value];
                newTab[indexes] = {...newTab[indexes], ...groups};
                return newTab
            })
            patchTeamsProjectTasks(groups, teamId, task.value[indexes].id)
            .catch((error) => {
                setGetter((prev) => [...prev, error])
            })
            if (storeTasks.current)
            storeTasks.current[indexes] = {...storeTasks.current[indexes], ...groups}
        }
    }
    useEffect(() => {
        if (indexes !== null) {
            if (Object.keys(groups).length !== 0) {
                if (Object.keys(groups).includes('start_date') || Object.keys(groups).includes('deadline')) {
                    try {
                        task.verifyTasksDate(project.value, groups)
                        task.verifyDate(task.value)
                        patchProject()
                    } catch (error) {
                        setGetter((prev) => [...prev, error])
                    }
                } else {
                    patchProject()
                }
            }
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
    // function 
    function submitTask (formTask: Tasks, group: any) {
            if (project.value) {
                try {
                    TaskSchema.parse(formTask)
                    task.verifyDate(formTask)
                    task.verifyTasksDate(project.value, group)
                    let newTask = {...formTask} as unknown
                    const newAssign = {assign: JSON.stringify(formTask.assign)}
                    newTask = {...formTask, ...newAssign}
                    createTasks(newTask, teamId, projectId)
                    .then((res) => {
                        setDispatch({task: false})
                        task.setValue((prev: Tasks[]) => {
                            let newTab = [...prev]
                            newTab = [...newTab, formTask]
                            return newTab
                        })
                        return Promise.resolve(res)
                    })
                    .catch((error) => {
                        return Promise.reject(error)
                    })
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
    return (
        <div className='w-full pb-8 bg-secondary min-h-screen isolate'>
            <HeaderProject />
            <Status position={position} />
            <Priority position={position} />
            {currTaskDetails.data !== undefined && <TaskDetails task={currTaskDetails} />}
            <SortTask 
            taskOptions={taskOptions}
            setSortList={setSortList} 
            sortList={sortList} 
            position={sortPositon.position}
            />
            {(indexes !== null && task.value) && <TaskAction value={task.value[indexes]} setValue={task.setValue} position={position} />}
            {((indexes !== null && task) && state.menberList) && 
                <Menu active={state.menberList} dispatch='menberList'>
                    <Menbers position={position} value={task.value[indexes]} />
                </Menu>
            }
            <section>
            <div className="w-full h-[180px] bg-[url('/plage3.jpeg')] bg-cover bg-center bg-no-repeat object-cover">
                <div className="w-fit flex items-center justify-center">
                    <div className="bg-primary text-sidebarText px-2 w-fit text-sm">
                        Change cover
                    </div>
                    <div className="bg-primary text-sidebarText px-2 w-fit text-sm">
                        See all comment
                    </div>
                </div>
            </div>
            {project.value !== null && 
            <div className="ml-4 mt-8" >
                <div className="group flex items-center cursor-pointer">
                    <Plus size={24} className="text-sidebarText" />
                    <p className="text-3xl text-btnColor ">Objectif</p>
                </div>
                <div className="ml-8 my-8 space-y-2">
                {Object.values(project.value?.objectifs).map((item, index) => (
                    <div key={index}>
                        {typeof item === 'string' &&
                            <div className="flex items-center text-btnColor">
                                <SquareCheck size={24}/>
                                <div><p className="text-sidebarText">{item}</p></div>
                            </div>
                        }
                    </div>
                ))}
                </div>
                {showObjectif &&
                    <input 
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const valueChanged: Record<string, string> = {
                              [target.name]: target.value,
                            };
                            setObjectif({...valueChanged})
                        }}
                        onKeyUp={(e) => {
                           if (e.key === 'Enter') {
                            if (project.value !== null) {
                                const objectifs = Object.keys(project.value?.objectifs)
                                const lastElement = objectifs[objectifs.length-1]
                                let newObjectifs = {[parseInt(lastElement)+1]: objectif.objectif}
                                newObjectifs = {...newObjectifs, ...project.value?.objectifs}
                                project.setValue((prevValue: ProjectType) => {
                                    let newTab = {...prevValue}
                                    newTab['objectifs'] = {...newTab['objectifs'], ...newObjectifs}
                                    return newTab
                                })
                                const value = {objectifs: JSON.stringify(newObjectifs)}
                                patchTeamsProject(value, projectId, teamId)
                                .catch((error) =>{
                                    setGetter((prev) => [...prev, error])
                                })
                            }
                            setObjectif({objectif: ''})
                           }
                        }}
                        value={objectif.objectif}
                        type="text" 
                        name="objectif"
                        className="popupinput text-base bg-inherit text-gray-300 ml-8 placeholder:text-sidebarText/50" 
                        placeholder="Write project's objectif then click Enter for record"
                    />
                }
                <div onClick={() => {
                    setShowObjectif(true)
                }} className="bg-primary text-sidebarText px-2 cursor-pointer rounded w-fit mt-4 ml-8 text-sm">Add Objectifs</div>
            </div>
            }
            </section>
            <section>
                <div className="flex items-center text-3xl text-sidebarText space-x-4 px-4 my-4">
                    <SquareCheck /><p>Tasks</p>
                </div>
                <div className="w-full flex justify-between border-b border-borderCard px-4 py-2">
                    <div className="w-fit flex flex-col items-start justify-start">
                        <div className="flex items-center justify-between">
                            <input 
                                type="text" 
                                className="w-[200px] bg-secondary text-sidebarText text-xl outline-none placeholder:text-gray-500 placeholder:text-xs"
                                value={project.value ? project.value.name : ""}
                                name='name'
                                placeholder="write name's project"
                                onChange={(e) => project.handleChange(e)}
                                onFocus={() => setShowBtnName(true)}
                                onBlur={()=>{
                                    setTimeout(() => {
                                        setShowBtnName(false)
                                    }, 1000)
                                }}
                            />
                            {showBtnName &&
                            <button onClick={() => {
                                patchTeamsProject({name: project.value?.name}, projectId,teamId)
                            }} className="text-xs py-1 px-4 ml-4 space-x-2 cursor-pointer rounded text-sidebarText duration-300 bg-sidebarText/20 hover:bg-sidebarText/50 hover:text-gray-800">
                                <p> Update name</p>
                            </button>
                            }
                        </div>
                        <p className="text-xs text-sidebarText/50">from {changeDateFormat(project.value?.start_date)} to {changeDateFormat(project.value?.deadline)}</p>
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
                                onChange={(e) => task.handleFilter(e, storeTasks.current)}
                            />
                        </div>
                        <Select 
                        name="Daily" 
                        options={['All Tasks', 'Board', 'Calendar']} 
                        handler={setSelect}
                        inputClass="flex items-center cursor-pointer justify-between text-gray-300" 
                        className="w-[200px] relative rounded bg-secondary hover:bg-primary p-1 text-sm border border-borderCard"
                        seclectClass="absolute w-[200px] right-1.5 top-[40px] rounded p-5 bg-primary shadow text-sidebarText border border-borderCard"
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
            </section>
            }
            {state.tableTask &&
            <>
            <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                {pathname.split('/')[1] === 'teams' && 
                    <thead>
                        <tr>
                            {tasksRow.map((item, index) => (
                            <td key={index} className="border-l border-r border-b border-primary pl-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <item.icon size={16} className="block"/><p>{item.name}</p>
                                </div>
                            </td>
                            ))}
                        </tr>
                    </thead>
                    }
                    {pathname.split('/')[1] === 'users' && 
                    <thead>
                        <tr>
                            {userstasksRow.map((item, index) => (
                            <td key={index} className="border-l border-r border-b border-primary pl-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <item.icon size={16} className="block"/><p>{item.name}</p>
                                </div>
                            </td>
                            ))}
                        </tr>
                    </thead>
                    }
                    <tbody>
                        {task.value && task.value.map((item: Tasks , index: number) => {
                            return (
                                <TaskTableComponent 
                                    key={index} 
                                    setPosition={setPosition} 
                                    item={item} 
                                    occ={index} 
                                    value={task.value}
                                    setTasks={task.setValue}
                                    teamId={teamId}
                                />
                            )
                        })}
                </tbody>
            </table>
            <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                setCreatetask({
                    type: 'project',
                    name: project.value.name,
                    submit: submitTask
                })
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
                        {task.value && task.value.map((item: Tasks , index: number) => {
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
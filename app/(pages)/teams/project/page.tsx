"use client"

import { HeaderProject } from "@/components/global/header"
import { Menu } from "@/components/global/Menu"
import { Priority } from "@/components/Tasks/priority"
import { SortTask } from "@/components/Tasks/sortTasks"
import { Status } from "@/components/Tasks/state"
import { TaskTableComponent } from "@/components/project/tasksComponent"
import { Select } from "@/components/ui/select"
import { taskAction, taskOptions } from "@/constants/popup"
import { myprojects, projectsRow } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { useForm } from "@/hooks/useForm"
import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Filter, Plus, Search, Target } from "lucide-react"
import { useContext, useState } from "react"


const Project = () => {
    const [select, setSelect] = useState('')
    const [position, setPosition] = useState({x:0, top:0})
    const sortPositon = usePosition()
    const projects = useForm(myprojects)
    const {state, setDispatch} = useContext(popupContext)
    const { indexes} = useContext(connectContext)
    const [sortList, setSortList] = useState({assign: '', priority: '',  state: ''})
    function handleChange (e: React.ChangeEvent) {
        /*let target = e.target as HTMLInputElement;
        if (target.value === '') {
            tasks.setValue(storeTasks.current)
        } else {
            tasks.setValue(() => {
                const newtab = [...storeTasks.current]
                const tab = newtab.filter((item) => {
                    return target.value.toLowerCase() === item.name.slice(0, target.value.length).toLowerCase()
                })
                return tab
            })
        }*/
    }
    return  (
        <div className="w-[calc(100%-200px)] pb-8 bg-secondary min-h-screen">
            <HeaderProject />
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
                        {indexes !== null && <SortTask taskOptions={taskAction} setValue={projects.setValue} value={projects.value[indexes]} type="action" setSortList={setSortList} sortList={sortList} />}
                    </div>
                </Menu>
                }
            <section>
                <div className="flex items-center text-3xl text-sidebarText space-x-4 px-4 my-4">
                    <Target /><p>Projects</p>
                </div>
                <div className="w-full flex justify-between border-b border-borderCard px-4 py-2">
                    <div></div>
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
                                className="w-[90%] bg-secondary outline-none"
                                placeholder="search a task"
                                onChange={(e) => handleChange(e)}
                            />
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
                 <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                    <thead>
                        <tr>
                        {projectsRow.map((item, index) => (
                                <td key={index} className="border-l border-r border-b border-primary pl-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <item.icon size={16} className="block"/><p>{item.name}</p>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>
                        <tbody>
                            {projects.value.map((item: any , index: number) => (
                                <TaskTableComponent 
                                key={index} 
                                setPosition={setPosition} 
                                item={item} 
                                occ={index} 
                                value={projects.value}
                                setProjects={projects.setValue}
                                completion={true}
                                />
                            ))}
                        </tbody>
                </table>
                <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                    window.location.assign('/teams/project/new')
                }}>
                <Plus size={24} />
                <p>New Project</p>
            </div>
            </section>
        </div>
    )
}

export default Project
"use client"

import { HeaderProject } from "@/components/global/header"
import { Menu } from "@/components/global/Menu"
import { Priority } from "@/components/global/priority"
import { SortTask } from "@/components/global/sortTasks"
import { Status } from "@/components/global/state"
import { TaskTableComponent } from "@/components/global/tasksComponent"
import { Select } from "@/components/ui/select"
import { project, projectRow } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"
import { Plus, SquareCheck } from "lucide-react"
import { Filter } from "lucide-react"
import { useContext, useState } from "react"
import { MdClose } from "react-icons/md"

const TaskPage = () => {
    //useState
    const [select, setSelect] = useState('')
    const [sortList, setSortList] = useState({menbers: '', priority: '',  states: ''})
    const [position, setPosition] = useState({x:0, top:0})
    const [projects, setProjects] = useState<Tasks[]>(project)
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    //hook
    const sortPositon = usePosition()
    //function
    
     function handleKeyUp (occurence: number, value: string, index: number) {
           
    }
    //DOM
    return  (
        <div className='w-[calc(100%-200px)] bg-secondary min-h-screen'>
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
                    <SortTask setSortList={setSortList} sortList={sortList} />
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
                        <button className="px-2 py-1 rounded text-gray-800 bg-btnColor text-sm">Board</button>
                        <Select 
                        name="Daily" 
                        options={['all Task', 'Daily tasks', 'Weekly tasks', 'Monthly tasks']} 
                        handler={setSelect}
                        inputClass="flex items-center cursor-pointer justify-between text-gray-300" 
                        className="w-[200px] relative rounded bg-secondary hover:bg-primary p-1 text-sm border border-borderCard"
                        seclectClass="absolute w-[250px] top-[45px] rounded p-5 mb-2 bg-primary shadow text-sidebarText"
                        />
                    </div>
                </div>
            </section>
            {sortList &&
                <section className="w-full flex items-center border-b border-borderCard px-4 py-2 space-x-4">
                        <div className="flex-justify px-4 py-1 rounded-full border border-btnColor text-btnColor">
                            <p>{sortList.menbers}</p>
                            <MdClose />
                        </div>
                        <div className="flex-justify px-4 py-1 rounded-full border border-btnColor text-btnColor">
                            <p>{sortList.priority}</p>
                            <MdClose />
                        </div>
                        <div className="flex-justify px-4 py-1 rounded-full border border-btnColor text-btnColor">
                            <p>{sortList.states}</p>
                            <MdClose />
                        </div>
                </section>
            }
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
                    {projects.map((item, index) => (
                        <TaskTableComponent 
                        key={index} 
                        setPosition={setPosition} 
                        item={item} 
                        occ={index} 
                        projects={projects}
                        setProjects={setProjects}
                        />
                    ))}
             </tbody>
         </table>
         <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                
            }}>
                <Plus size={24} />
                <p>New Task</p>
            </div>
        </div>
    )
}

export default TaskPage
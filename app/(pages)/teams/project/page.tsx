"use client"

import { HeaderProject } from "@/components/global/header"
import { projectsRow } from "@/constants/task"
import { Plus, Target } from "lucide-react"

const Project = () => {
    return  (
        <div className="w-[calc(100%-200px)] pb-8 bg-secondary min-h-screen">
            <HeaderProject />
            <section>
                <div className="flex items-center text-3xl text-sidebarText space-x-4 px-4 my-4">
                    <Target /><p>Projects</p>
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
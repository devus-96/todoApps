import React from "react"
import { HeaderProject } from "@/components/global/header";
import { myprojects } from "@/constants/task"
import { SquareCheck } from "lucide-react";

const ProjectIdPage = async ({ params }: { params: { projectId: string }}) => {
    const { projectId } = await params;
    myprojects.filter((item: any) => item.id ===  projectId)
    return (
        <section className="w-[calc(100%-200px)] pb-8 bg-secondary min-h-screen">
            <HeaderProject />
            <div className="w-full h-[180px] bg-[url('/plage3.jpeg')] bg-cover bg-center bg-no-repeat object-cover">
                <div className="bg-primary text-sidebarText px-2 rounded w-fit mt-4 ml-4 text-sm">
                    Change cover
                </div>
            </div>
            <div className="">

            </div>
            <div className="text-sm px-8">
                <div className="mb-4">
                    <p className="text-3xl text-sidebarText">Objectifs</p>
                </div>
                {myprojects.filter((item: any) => item.id ===  projectId).map((item, index) => {
                    return (
                    <div key={index} className="space-y-4">
                        {Object.entries(item.objectifs).map((item, index) => {
                            return (
                                <div key={index} className="flex items-start text-btnColor ml-8 w-[90%]">
                                    <div>
                                        <SquareCheck size={24}/>
                                    </div>
                                    <p className="ml-4">{item[1]}</p>
                                </div>
                            )
                        })}
                    </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ProjectIdPage
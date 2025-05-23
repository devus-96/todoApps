import { ProjectComponent } from "@/components/project/projectComponent";
import React from "react"


const Project = async ({ params }: { params: { teamId: string, projectId: string }}) => {
    const { teamId } = await params;
    const { projectId } = await params;

    return  (
        <div className="w-full pb-8 bg-secondary min-h-screen">
            <ProjectComponent teamId={teamId} />
        </div>
    )
}

export default Project
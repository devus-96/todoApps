import React from "react"
import { ProjectDetails } from "@/components/project/projectDetails";

const ProjectIdPage = async ({ params }: { params: { projectId: string }}) => {
    const { projectId } = await params;
    
    return (
        <ProjectDetails projectId={projectId} />
    )
}

export default ProjectIdPage
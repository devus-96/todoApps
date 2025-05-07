import React from "react"
import { ProjectDetails } from "@/components/project/projectDetails";

const ProjectIdPage = async ({ params }: { params: { teamId: string, projectId: string }}) => {
    const { projectId } = await params;
    const { teamId } = await params;
    
    return (
        <ProjectDetails teamId={teamId} projectId={projectId}  />
    )
}

export default ProjectIdPage
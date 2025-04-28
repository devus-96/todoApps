import React from "react"
import { ProjectFrom } from "@/components/project/projectForm";

export default async function NewProject ({ params }: { params: { teamId: string }}) {
    const { teamId } = await params;
    //Dom
    return (
        <div className="w-[calc(100%-200px)] bg-secondary min-h-screen pb-12">
            <ProjectFrom teamid={teamId} />
        </div>
    )
}
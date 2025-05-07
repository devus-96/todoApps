import React from "react"
import { ProjectFrom } from "@/components/project/projectForm";

export default async function NewProject () {
    //Dom
    return (
        <div className="w-full bg-secondary min-h-screen pb-12">
            <ProjectFrom />
        </div>
    )
}
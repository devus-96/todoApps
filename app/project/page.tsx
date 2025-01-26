"use client"
import { Header } from "@/components/header"
import { useState } from "react"
import React from "react"

interface projectCardProps {
    title: string
    data: string
}

const ProjectCard:React.FC<projectCardProps> = ({
    title,
    data
}) => {
    return <div className="w-full h-[150px] rounded-xl p-4 bg-gray-100 font-[family-name:var(--font-jetBrains-mono)]">
        <p className="font-[family-name:var(--font-jetBrainsExtraBold-mono)] text-lg mb-4">{title}</p>
        <h1 className="text-center">{data}</h1>
    </div>
}

export default function Project () {
    const [currentDate, setCurrentDate] = useState(new Date())
    return <div className="absolute bg-bgLoging top-0 right-0 bottom-0 w-[calc(100%-200px)] h-auto space-y-4">
            <Header date={currentDate} setDate={setCurrentDate} />
            <div className="w-full grid grid-cols-3 gap-8 px-8">
                <ProjectCard title='Participants' data="Not data yet" />
                <ProjectCard title='Deadline' data="Not data yet" />
                <ProjectCard title='Activities' data="Not data yet" />
            </div>
            <div className="w-full grid grid-cols-3 gap-4 px-8">
                <ProjectCard title='' data="" />
                <ProjectCard title='' data="Not data yet" />
                <ProjectCard title='' data="Not data yet" />
            </div>
    </div>
}
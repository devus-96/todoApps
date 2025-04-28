"use client"

import React from "react"

export default async function Home ({ params }: { params: { teamId: string }}) {
    const { teamId } = await params;
    return (
        <div>
            HOME TEAM
        </div>
    )
}
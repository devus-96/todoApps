import React from "react"

export default async function Home ({ params }: { params: { teamId: string }}) {
    const { teamId } = await params;
    return (
        <div className='w-full pb-8 bg-secondary min-h-screen isolate'>
            HOME TEAM
        </div>
    )
}
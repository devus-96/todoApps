"use client"

import clsx from "clsx"
import Image from "next/image"
import React from "react"

type bubble = {
    type : "big" | "moyen" | "small" | "very-small",
    className : string
}

const Bubble:React.FC<bubble> = ({
    type, className
}) => {
    return <div className={`${clsx(`${className} rounded-full border border-gray-700`, {
            "w-10 h-10" : type === "big",
            "w-8 h-8" : type === "moyen",
            "w-4 h-4" : type === "small",
            "w-1 h-1" : type === "very-small"
    })}`}>

    </div>
}

export const AuthBackground = () => {
    return <div className="max-lg:hidden">
        <div className="w-full h-[1px] bg-gray-700 m-auto absolute bottom-16 z-0"></div>
        <Image src="/square.svg" alt="logo" className="absolute bottom-60 left-44" width={200} height={200} />
        <Image src="/square.svg" alt="logo" className="absolute top-44 right-32" width={200} height={200} />
        <Image src="/star.svg" alt="logo" className="absolute bottom-16 left-48" width={80} height={80} />
        <Image src="/star.svg" alt="logo" className="absolute top-44 left-24" width={80} height={80} />
        <Image src="/star.svg" alt="logo" className="absolute bottom-20 right-48" width={80} height={80} />
        <Image src="/star.svg" alt="logo" className="absolute bottom-60 right-80" width={80} height={80} />
        <Bubble type="big" className="absolute bottom-32 right-80" />
        <Bubble type="moyen" className="absolute bottom-32 left-80" />
        <Bubble type="big" className="absolute bottom-44 left-32" />
        <Bubble type="moyen" className="absolute top-52 left-80" />
        <Bubble type="small" className="absolute top-44 left-60" />
        <Bubble type="very-small" className="absolute top-20 left-52" />
        <Bubble type="moyen" className="absolute bottom-52 right-52" />
        <Bubble type="small" className="absolute bottom-72 right-32" />
        <Bubble type="very-small" className="absolute top-20 right-80" />
        <Bubble type="small" className="absolute top-32 right-72" />
        <Bubble type="small" className="absolute top-44 right-24" />
        <Bubble type="small" className="absolute top-52 right-96" />
    </div>
}
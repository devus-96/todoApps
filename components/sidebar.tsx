"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Select } from "./ui/select";
import { FaFileCirclePlus } from "react-icons/fa6";
import { taskContext } from "@/hooks/useTask";
import { useContext, useEffect, useState } from "react";
import PopUpTags from "./PopUpTags";
import { Calendar } from "./calendar";
import { TaskDetails } from "./calendar/taskDetails";

const SideBar = () => {
    const pathname = usePathname()
    const [select, setSelect] = useState<string>("")
    const {state, setDispatch} = useContext(taskContext)
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        setDispatch({form: select})
        if (!state.isDeadline) {
            setDispatch({date: currentDate})
        } else {
            setDispatch({deadline: currentDate})
        }
    }, [select, currentDate, state.isDeadline])

   
}

 export default SideBar
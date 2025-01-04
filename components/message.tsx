import { FC, useState } from "react"
import clsx from "clsx"
import { IoIosClose } from "react-icons/io";

interface messageProps {
    type: string
    message: any
}


export const Message:FC<messageProps> = ({
    type,
    message
}) => {
    return <div className={clsx("w-1/2 fixed top-4 left-1/2 translate-x-[-50%] max-w-[500px] m-auto rounded-lg px-4 py-4 text-white flex-justify", {
            "bg-yellow-400" : type === "alert",
            "bg-green-400" : type === "succes",
            "bg-red-400" : type === "failed",
            "opacity-0": message.massage === "" || message.message === undefined
        })}>
                {type === "failed" ? (
                    (message.status === undefined) ? `${message.message}` : 
                    (message.status === 500) ? "Something went wrong !!!" : 
                    (message.status != 400 || message.status != 404) ? message.response?.data : 
                    "Something went wrong !!! please the develloper to fix problem.(655858860)"
                ): ""}
                <IoIosClose size={30} color="#fff" className="cursor-pointer"/>
        </div>

} 
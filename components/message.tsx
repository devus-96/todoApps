import { FC } from "react"
import clsx from "clsx"
import React from "react"

interface messageProps {
    type: string
    message: any
}


export const Message:FC<messageProps> = ({
    type,
    message
}) => {
    const getErr = sessionStorage.getItem('error')
    return <div className={clsx("w-full mt-4 text-sm rounded-lg text-center", {
            "text-yellow-400" : type === "alert",
            "text-green-400" : type === "succes",
            "text-red-400" : type === "failed",
            "opacity-0 w-0": message.message === undefined && getErr === null
        })}>
                {type === "failed" ? (
                    (getErr) ? `${getErr}` :
                    (message.status === undefined) ? `${message.message}` : 
                    (message.status === 500) ? "Something went wrong !!!" : 
                    (message.status != 400 || message.status != 404) ? message.response?.data : 
                    "Something went wrong !!! please the develloper to fix problem.(655858860)"
                ): ""}
        </div>

} 
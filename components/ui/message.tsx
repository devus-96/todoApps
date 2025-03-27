import { FC, useEffect, useState } from "react"
import React from "react"
import { AxiosError } from "axios"

interface messageProps {
    type?: string
    message: unknown
}


export const Message:FC<messageProps> = ({
    type,
    message
}) => {
    const [mood, setMood] = useState<{state: string, message: any}>()

    useEffect(() => {
        if (message instanceof AxiosError) {
            switch (message.status) {
                case 400:
                    setMood({state: 'warning', message: message.response?.data.message});
                    break;
                case 401:
                    setMood({state: 'warning', message: message.response?.data.message});
                    break;
                case 500:
                    setMood({state: 'failed', message: message.message})
                    break;
            }
            if (message.status === undefined) setMood({state: 'failed', message: message.message + "check your network connection"})
        } else if (message instanceof Error) {
            setMood({state: 'failed', message: message.message})
        }
        else {
            setMood({state: 'failed', message: message})
        }
    }, [message])

    
    return <div> 
        <div className="w-full mt-4 text-sm rounded-lg text-center">
               <p style={{
                    color: mood?.state === 'warning' ? '#eab308' : '#ef4444'
               }}>{mood?.message}</p>
        </div>
    
    </div>
    
} 
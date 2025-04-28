import { FC } from "react"
import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface messageProps {
    message:  string
    mood: {bg: string, text: string} | null
    getter: unknown[]
    next?: () => void
    prev?: () => void
    accessoire?: boolean
}


export const Message:FC<messageProps> = ({
    message,
    mood,
    getter,
    next,
    prev,
    accessoire=true
}) => {
    return <div className={`w-full py-4 px-4 flex items-center justify-between`} style={{
        background: `${mood?.bg}`
   }}> 
        {accessoire && 
            <div className="flex items-center space-x-4" style={{
                        color: `${mood?.text}`
                }}>
                <div className="w-8 h-8 border-2 flex items-center justify-center text-sm cursor-pointer" style={{
                    borderColor: `${mood?.bg}`
                }}>
                    <ArrowLeft size={16} onClick={() => {prev && prev()}} />
                </div>
                <div className="w-8 h-8 border-2 flex items-center justify-center text-sm cursor-pointer" style={{
                    borderColor: `${mood?.bg}`
                }}>
                    <ArrowRight size={16} onClick={() => {next && next()}} />
                </div>
            </div>
        }
        <div className="w-fit text-sm rounded-lg">
               <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap" style={{
                    color: `${mood?.text}`
               }}>{message}</p>
        </div>
        {accessoire &&
        <div className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded-full" style={{
            background: `${mood?.bg}`,
            color: `${mood?.text}`
        }}>
            {getter.length}
        </div>
        }
    </div>
} 
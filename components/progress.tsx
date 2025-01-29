import React from "react"
import { FC } from "react"

interface ProgessProps {
    percent: number
}

const Progress:FC<ProgessProps> = ({
    percent
}) => {
    return <div>
            <div className="w-full h-[8px] rounded-2xl bg-white flex flex-col">
                <div className="bg-terciary h-[8px] rounded-2xl" style={{
                    width: `${100 - percent}%`
                }}>
                </div>
            </div>
            <p className="text-xs text-terciary">{Math.floor(100 - percent)}% Done !!!</p>
        </div>
}

export default Progress
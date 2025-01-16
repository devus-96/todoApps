"use client"
import clsx from "clsx"
import { Dispatch, SetStateAction, useState } from "react"

export function SelectTime ({time, setInsert}: {time: string[], setInsert: Dispatch<SetStateAction<string>>}) {
    const [isActive, setIsActive] = useState('12')
    return <div 
             className="bg-gray-700 w-[250px] h-[250px] rounded-full bottom-12 absolute"
            >
            {time.map((item, index) => (
                <span key={index} style={{
                    transform:  `rotate(${30 * index}deg)`
                }} className='absolute z-0 inset-[5px] left-[48%] cursor-pointer text-center w-[10px] font-semibold text-white flex justify-center'><span 
                   onClick={() => {
                        setIsActive(item)
                        setInsert(item)
                    }} 
                   className={clsx("absolute z-50 w-10 h-10 hover:bg-gray-600 rounded-full flex items-center justify-center",{
                    'bg-btnColor text-gray-800' : isActive === item
                })}>{item}</span></span>
            ))}
    </div>
}
"use client"

import { useForm } from "@/hooks/useForm"
import { Tasks } from "@/types/global"
import { emailSchema } from "@/types/schema"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { z } from "zod"

export function EmailList ({
    index,
    handle,
    value,
    error,
    handleChange,
    handlerEmail,
    numberEmailRef,
    setNumberEmail,
    setEmails,
}:{
    index: number,
    value: Record<string, any>,
    error: string,
    handle: (occurence: number, value: string, index: number) => void,
    handleChange: (e: React.FormEvent) => void,
    handlerEmail: (e: React.KeyboardEvent) => void,
    numberEmailRef: React.RefObject<number>,
    setNumberEmail: React.Dispatch<React.SetStateAction<number>>,
    setEmails: Dispatch<SetStateAction<Tasks[]>>
}) {
    const [errors, setError] = useState<string>('')
    //DOM
    return (
        <div className="flex flex-col items-center justify-start">
            <div className="flex items-center">
                <input 
                    type="email" 
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    name="email" 
                    className="py-2 bg-secondary text-sidebarText w-full outline-none placeholder:text-holder text-sm placeholder:text-sm" 
                    placeholder="Enter Email Adress"
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            setError('')
                            let repeat = false
                            const target = e.target as HTMLInputElement
                            for (const [_, val] of Object.entries(value)) {
                                if (val === target.value) {
                                    repeat = true
                                }
                            }
                            try {
                                if (!repeat) {
                                    emailSchema.parse(target.value)
                                    handle(numberEmailRef.current,target.value, index)
                                    // create nex input
                                    numberEmailRef.current++
                                    setNumberEmail(numberEmailRef.current)
                                } else {
                                    setError('Email are already write!');
                                    target.value = ''
                                }
                            } catch (error) {
                                if (error instanceof z.ZodError) {
                                    setError(error.errors[0].message);
                                    target.value = ''
                                }
                              }
                        }
                    }}
                />
                <div>
                    <IoMdClose size={14} className="cursor-pointer" onClick={() => {
                        setEmails((prev) => {
                            let newvalue = [...prev]
                            for (const [key, _] of Object.entries(value)) {
                                delete newvalue[index].assign[key]
                            }
                           return newvalue
                        })
                    }}/>
                </div>
            </div>
            {errors !== '' && <p className="text-xs text-red-400">{errors}</p>}
        </div>
    )
}

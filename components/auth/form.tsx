"use client"
import { InputPasswrld } from "./input"
import { Message } from "../message"
import { Spinner } from "../spinner"
import Link from "next/link"
import React, { ChangeEvent, useState } from "react"
import { post } from "@/api/user"

export const Form = () => { 
    const [verify, setVerify] = useState<any>()
    const [error, setError] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)
    
    function handleChange (e: ChangeEvent) {
        let target = e.target as HTMLInputElement
        const valueChanged: Record<string, string> = {
            [target.name]: target.value
        }
        setVerify((verify: any) => ({ ...verify, ...valueChanged }));
    }

    return <form action={(formData) => {
        setLoading(true)
        try {
            if (verify.password === verify.passwordVerify) {
                post('/register/user', formData).catch((error) => {
                    setError(error)
                }).finally(() => {
                    setLoading(false)
                })
            } else {
                throw new Error("passworld is different of passworld verify")
            }
        } catch (err: any) {
            setError(err)
            setLoading(false)
        }
    }} className="bg-white w-[380px] absolute left-1/2 translate-x-[-50%] px-8 pt-2 pb-2 space-y-8 mt-4 rounded-2xl">
                    <Message type="failed" message={error} />
                    <div className="w-full text-center">
                        <h1 className="font-bold m-auto text-3xl text-black">Sign up</h1>
                        <p className="text-gray-400 text-xs mt-4">Enter your informations to connect to your account</p>
                    </div>

                    <input 
                        type="name" 
                        name="firstname" 
                        className="input text-sm" 
                        placeholder="enter your firstName" 
                        required/>
                    <input 
                        type="name" 
                        name="lastname" 
                        className="input text-sm" 
                        placeholder="enter your lastName" 
                        required/>
                    <input 
                        type="email" 
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
                        name="email" 
                        className="input text-sm" 
                        placeholder="enter your email" 
                        required/>
                    <InputPasswrld 
                        placeholder="password must have least 8 characteres)" 
                        name="password" 
                        handle={handleChange}/>
                    <InputPasswrld 
                        placeholder="Re-enter your password" 
                        name="passwordVerify" 
                        handle={handleChange} />
                    <div>
                        <button 
                            type="submit" 
                            className="btn1 flex-center gap-4">
                                {isLoading && <Spinner className="w-[30px] p-0" fill="#9eabe4" bg="#fff"/>}Sign up
                            </button>
                        <p className="text-sm text-gray-500 mt-4">Already have an account ? <Link href='/auth/login' className="text-blue-400 underline ">login</Link></p>
                    </div>
            </form>
}
"use client"
import React, { ChangeEvent, useContext, useState } from 'react';
import Link from "next/link";
import { post } from '@/api/user';
import { Message } from '@/components/ui/message';
import { InputPasswrld } from '@/components/auth/input';
import { Spinner } from '@/components/ui/spinner';
import { AxiosError } from 'axios';
import { messageContext } from '@/hooks/useMessage';

const Register = () => {
    const [verify, setVerify] = useState<any>()
   const {setGetter, message, mood, getter, next, prev} = useContext(messageContext)
    const [isLoading, setLoading] = useState<boolean>(false)

    function handleChange (e: ChangeEvent) {
        let target = e.target as HTMLInputElement
        const valueChanged: Record<string, string> = {
            [target.name]: target.value
        }
        setVerify((verify: any) => ({ ...verify, ...valueChanged }));
    }

    return (
        <section className="relative bg-bgLoging h-screen w-full">
            <form action={(formData) => {
        setLoading(true)
        setGetter(() => [])
        try {
            if (verify.password === verify.passwordVerify) {
                post('user/register', formData).catch((error) => {
                    console.log(error)
                    setGetter(error)
                }).finally(() => {
                    setLoading(false)
                })
            } else {
                throw new Error("passworld is different of passworld verify")
            }
        } catch (error: any) {
            setGetter(error)
            setLoading(false)
        }
    }} className="bg-white w-[380px] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] px-8 pt-2 pb-2 space-y-4 mt-4 rounded-2xl">
                    {message && <Message
                        message={message}
                        mood={mood}
                        getter={getter}
                        next={next}
                        prev={prev}
                        accessoire={false}
                    />}
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
        </section>
    )
}

export default Register
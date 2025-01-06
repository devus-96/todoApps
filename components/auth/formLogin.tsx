"use client"
import { useAuth } from "@/hooks/useAuth"
import { Message } from "../message"
import { Spinner } from "../spinner"
import { InputPasswrld } from "./input"
import Link from "next/link"
import { FaGoogle } from "react-icons/fa6"
import { useState, useEffect } from "react"
import { resolve } from "node:path"

export const FormLogin = () => { 
    const { 
        loading, 
        error, 
        postDatas,
        fetchAuthUrl 
        } = useAuth()
    
        const [authUrl, setAuthUrl] = useState<string | null>(null)

        useEffect(() => {
            fetchAuthUrl().then(res => {
                setAuthUrl(res)
            })
        }, [])

        const handleGoogleLogin = () => {
            if (authUrl) {
                window.location.href = authUrl
            }
        }
        
    return <form action={(formData) => {
        postDatas('/login/user', formData)
    }} className="bg-white w-[370px] absolute left-1/2 translate-x-[-50%] px-8 pb-8 mt-4 space-y-10 rounded-2xl">
                    <div className="w-full text-center">
                        <h1 className="font-bold m-auto text-3xl">Log in</h1>
                        <p className="text-gray-500 text-xs mt-4">Enter your informations to connect to your account</p>
                    </div>
                    <Message type="failed" message={error} />
                    <input type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" name="email" className="input text-sm" placeholder="enter your email" required/>
                    <InputPasswrld placeholder="password must have least 8 characteres)" name="password"/>
                    <Link href=''className="hover:underline text-sm text-gray-500"> Password forgot ? </Link>
                    <button type="submit" className="btn1 flex-center gap-4">{loading && <Spinner className="w-[30px] p-0"/>}Log in</button>
                    <div className="w-full mt-6 mb-6 flex items-center justify-between">
                        <div className="w-[47%] h-[1px] bg-black"></div>
                        <p className="text-textSpan">or</p>
                        <div className="w-[47%] h-[1px] bg-black"></div>
                    </div>
                    <div>
                        <div onClick={handleGoogleLogin} className="w-full py-[11px] rounded-full text-sm bg-white border border-black cursor-pointer hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-gray-300 active:bg-gray-600 transition-colors duration-300 flex-center gap-4 hover:border-gray-400">{loading ? <Spinner className="w-[30px] p-0"/> : <FaGoogle size={20} /> }Sign in with Google</div>
                        <p className="text-sm text-gray-500 mt-4">Don't have an account ? <Link href='/auth/register' className="text-[#9eabe4] underline ">sign up</Link></p>
                    </div>
            </form>
}
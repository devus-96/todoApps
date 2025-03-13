"use client"
import React, { useEffect, useState } from 'react';
import { getGithubAuthUrl, getGoogleAuthUrl, post } from '@/api/user';
import { InputPasswrld } from '@/components/auth/input';
import Link from 'next/link';
import { Message } from '@/components/message';
import { Spinner } from '@/components/spinner';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState()
    const [provider, setProvider] = useState<string | null>(null)

    useEffect(() => {
        if (provider === 'google') {
            getGoogleAuthUrl().then((response) => {
                sessionStorage.setItem('provider', provider)
                sessionStorage.setItem('state', response.state)
                window.location.href = response.authUrl
            })
        } else if (provider === 'github') {
            getGithubAuthUrl().then((response) => {
                sessionStorage.setItem('provider', provider)
                sessionStorage.setItem('state', response.state)
                window.location.href = response.authUrl
            })
        }
    }, [provider])

    return <section className="relative bg-bgLoging h-screen w-full">
                    <form action={(formData) => {
                            setLoading(true);
                            post('/login/user', formData).catch((error) => {
                                setError(error)
                            }).finally(() => {
                                setLoading(false);
                            })
            }} className="bg-white w-[370px] absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] px-8 pb-8 mt-4 space-y-4 rounded-2xl">
                        <Message type="failed" message={error} />
                        <div className="w-full text-center">
                            <h1 className="font-bold m-auto text-3xl">Log in</h1>
                            <p className="text-gray-500 text-xs mt-4">Enter your informations to connect to your account</p>
                        </div>
                        <input 
                            type="email" 
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            name="email" 
                            className="input text-sm" 
                            placeholder="enter your email" 
                            required/>
                        <InputPasswrld 
                            placeholder="password must have least 8 characteres)" 
                            name="password"/>
                        <Link href=''className="hover:underline text-sm text-gray-500"> Password forgot ? </Link>
                        <button type="submit" className="btn1 flex-center gap-4">
                            {isLoading && <Spinner className="w-[30px] p-0" fill="#9eabe4" bg="#fff"/>}Register
                        </button>
                        <div className="w-full mt-6 mb-6 flex items-center justify-between">
                            <div className="w-[47%] h-[1px] bg-black"></div>
                            <p className="text-textSpan">or</p>
                            <div className="w-[47%] h-[1px] bg-black"></div>
                        </div>
                        <div 
                            onClick={() => setProvider('google')} 
                            className="w-full py-[11px] rounded-full text-sm bg-red-500 border border-red-500 cursor-pointer hover:bg-red-500 text-white focus:ring-2 focus:ring-red-500 active:bg-red-500 transition-colors duration-300 flex-center gap-4 hover:border-red-500">
                                {isLoading ? <Spinner className="w-[30px] p-0" fill="#ef4444" bg="#fff"/> : <FaGoogle size={20} />}Sign in with Google 
                        </div>
                        <div 
                            onClick={() => setProvider('github')} 
                            className="w-full py-[11px] rounded-full text-sm bg-[#171515] border border-[#171515] cursor-pointer hover:bg-[#171515] text-white focus:ring-2 focus:ring-[#171515] active:bg-[#171515] transition-colors duration-300 flex-center gap-4 hover:border-[#171515]">
                                {isLoading ? <Spinner className="w-[30px] p-0" bg="#fff" fill="#171515" /> : <FaGithub size={20} /> }Sign in with Github
                        </div>
                        <p className="text-sm text-gray-500">Don`&apos;`t have an account ? <Link href='/auth/register' className="text-[#9eabe4] underline ">sign up</Link></p>
                    </form>
            </section>
}

export default Login
"use client"
import Image from "next/image"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { AuthBackground } from "@/components/auth/background";
import { FormLogin } from "@/components/auth/formLogin";
import { useEffect, useState } from "react";

const Login = () => {
    
    return <section className="relative bg-bgLoging h-screen w-full">
                    <div className="absolute z-0 left-0 right-0 top-0 bottom-0 max-h-[800px]">
                        <div className="header flex-justify">
                            <Image src="/logo.svg" alt="logo" width={80} height={80} />
                            <Link href="/auth/register"><button type="button" className="btn">sign up</button></Link>
                        </div>
                        <AuthBackground />
                    </div>
                    <FormLogin />
            </section>
}

export default Login
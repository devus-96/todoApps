import Image from "next/image"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { Form } from "@/components/auth/form";
import { AuthBackground } from "@/components/auth/background";



const Register = () => {

    return <main className="relative bg-bgLoging h-screen w-full">
    <div className="absolute z-0 left-0 right-0 top-0 bottom-0 max-h-[800px] max-w-[1300px] mx-auto">
        <div className="header flex-justify">
            <Image src="/logo.svg" alt="logo" width={80} height={80} />
            <Link href="/login"><button type="button" className="btn">Login</button></Link>
        </div>
        <AuthBackground />
    </div>
    <Form />
</main>
}

export default Register
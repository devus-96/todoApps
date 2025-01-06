"use client"
import { ChangeEvent, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

export const InputPasswrld = ({placeholder, name, handle}: {placeholder: string, name: string, handle?: (e: ChangeEvent<HTMLInputElement>) => any}) => {
    const [open, setOpen] = useState(true)
    return <div className="w-full input flex-justify">
                <input 
                    type={open ? "password" : "text"} 
                    name={name} pattern="^.{8,}$" 
                    title="le mot de passe doit contenir au moin 8 caracteres"
                    className="outline-none w-[90%] text-sm placeholder:text-gray-500" 
                    placeholder={placeholder} 
                    onChange={(e) => handle && handle(e)}
                    required
                />
                {open ? (
                    <FaRegEyeSlash size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
                ):  <FaRegEye size={20} className="cursor-pointer" onClick={() => setOpen(true)} />}
            </div>
}
"use client"
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"
import { IconType } from "react-icons";

type SelectProps = {
    label?: string;
    labelClass?: string;
    inputClass?: string;
    className?: string;
    seclectClass?: string,
    name: string,
    handler:Dispatch<SetStateAction<string>> | ((choose : string) => void);
    onclick?: () => void
    options: any[];
    Icons?: IconType
  };


export const Select: FC<SelectProps> = ({
    label = "",
    labelClass,
    inputClass = "flex h-12 bg-gradient-to-r from-[#7b91f1] to-[#ff2779] p-5 text-base sm:text-sm 2xl:text-lg font-normal rounded items-center cursor-pointer justify-between",
    options,
    seclectClass = "absolute w-full top-[-120px] rounded p-5 mb-2 bg-white shadow",
    className = "w-full mt-32 relative border border-secondary rounded",
    name,
    handler,
    Icons,
    onclick
}) => {
        const [show, setShow] = useState(false)
        const [ index, setIndex ] = useState<number | null>(null)
        let menuRef = useRef<any>(null)

        useEffect(() => {
            let handlerClick = (e: any) => {
              if (!menuRef?.current?.contains(e.target)) {
                setShow(false)
              }
            }
            document.addEventListener("mousedown", handlerClick)
            return () => {
              document.removeEventListener("mousedown", handlerClick)
            }
          })
        return <div className={className}>
                {label !== "" && <label className={labelClass}> {label}</label>}
                <div ref={menuRef} className={`${!show ? "hidden" : seclectClass}`}>
                    {options.map((items, index) => (
                            <li key={index} onClick={(e) => {
                              e.stopPropagation()
                              handler(options[index])
                              setShow(false)
                              setIndex(index)
                              onclick && onclick()
                      }} className="flex cursor-pointer p-2  items-center text-base md:text-sm sm:text-sm  2xl:text-lg space-x-2 hover:bg-gray-600 hover:text-white">
                              <p className="whitespace-nowrap">{items}</p>
                          </li>
                    ))}
                </div>
                <div onClick={() => {
                    setShow(true)
                }} className={inputClass}>
                    {Icons && <Icons size={16} />}
                    <span>{index ===  null ? name : options[index]}</span>
                    <IoMdArrowDropdown size={24} />
                </div>
        </div>
}


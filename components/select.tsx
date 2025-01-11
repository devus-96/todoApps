"use client"
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"
import { FaFileCirclePlus } from "react-icons/fa6";
import { IconType } from "react-icons";

interface CustomLiProps {
    type: string,
    name: string,
    onClick:(e: React.MouseEvent<HTMLLIElement>) => void,
    setShow: Dispatch<SetStateAction<boolean>>
}

type SelectProps = {
    label?: string;
    labelClass?: string;
    inputClass?: string;
    className?: string;
    seclectClass?: string,
    name: string,
    handler: (e: React.MouseEvent<HTMLLIElement>) => void;
    value: string;
    options: any[];
    Icons?: IconType
  };

const CustomLi:FC<CustomLiProps> = ({
    type,
    name,
    onClick,
    setShow
}) => {
    return <li id={type} onClick={(e) => {
                e.stopPropagation()
                onClick(e)
                setShow(false)
        }} className="flex cursor-pointer p-2  items-center text-base md:text-sm sm:text-sm  2xl:text-lg space-x-2 hover:bg-primary hover:text-white">
                <p id={type} className="whitespace-nowrap">{name}</p>
            </li>
}

export const Select: FC<SelectProps> = ({
    label = "",
    labelClass,
    inputClass = "flex h-12 bg-gradient-to-r from-[#7b91f1] to-[#ff2779] p-5 text-base sm:text-sm 2xl:text-lg font-normal rounded items-center cursor-pointer justify-between",
    options,
    seclectClass = "absolute w-full top-[-120px] rounded p-5 mb-2 bg-white shadow",
    className = "w-full mt-32 relative border border-secondary rounded",
    name,
    handler,
    value,
    Icons
}) => {
        const [show, setShow] = useState(false)
        let menuRef = useRef<any>(null)

        useEffect(() => {
            let handler = (e: any) => {
              if (!menuRef?.current?.contains(e.target)) {
                setShow(false)
              }
            }
            document.addEventListener("mousedown", handler)
            return () => {
              document.removeEventListener("mousedown", handler)
            }
          })

        return <div className={className}>
                {label !== "" && <label className={labelClass}> {label}</label>}
                <ul ref={menuRef} className={`${!show ? "hidden" : seclectClass}`}>
                    {options.map((items, index) => (
                        <div key={index}>
                            <CustomLi name={items} onClick={handler} setShow={setShow} type={name}/>
                        </div>
                    ))}
                </ul>
                <div onClick={() => {
                    setShow(true)
                }} className={inputClass}>
                    {Icons && <Icons size={16} />}
                    <span className="">{value !==  "" ? value : "New"}</span>
                    <IoMdArrowDropdown size={24} />
                </div>
        </div>
}


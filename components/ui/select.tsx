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
    options: string[];
    Icons?: IconType
  };


export const Select: FC<SelectProps> = ({
    label = "",
    labelClass,
    inputClass,
    options,
    seclectClass,
    className,
    name,
    handler,
    Icons,
    onclick
}) => {
        const [show, setShow] = useState(false)
        const [ index, setIndex ] = useState<number | null>(null)
        const menuRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            const handlerClick = (e: MouseEvent) => {
              const target = e.target as Document
              if (!menuRef?.current?.contains(target)) {
                setShow(false)
              }
            }
            document.addEventListener("mousedown", handlerClick)
            return () => {
              document.removeEventListener("mousedown", handlerClick)
            }
          }, [show])
        return <div className={className}>
                {label !== "" && <label className={labelClass}> {label}</label>}
                <div ref={menuRef} className={`${!show ? "hidden" : seclectClass}`}>
                    {options.map((items, index) => (
                            <li key={index} onClick={(e) => {
                              e.stopPropagation()
                              handler(options[index])
                              setShow(false)
                              setIndex(index)
                              onclick !== undefined && onclick()
                      }} className="flex cursor-pointer p-2  items-center text-base md:text-sm sm:text-sm  2xl:text-lg space-x-2 hover:bg-gray-700 hover:text-white">
                              <p className="">{items}</p>
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


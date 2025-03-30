"use client"

import { connectContext } from "@/hooks/useConnect"
import { useForm } from "@/hooks/useForm"
import { emailSchema } from "@/types/schema"
import { tabTask } from "@/types/task"
import { useContext, useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io"

export function EmailList ({
    index,
    numberEmailRef,
    emailsRef,
    setNumberEmail
}:{
    index: number,
    numberEmailRef: React.RefObject<number>,
    emailsRef: React.RefObject<string[]>,
    setNumberEmail: React.Dispatch<React.SetStateAction<number>>
}) {
    // constante
    const defaultCalue = {
        email: ''
    }
    //useRef
    const closeRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    //useContext
    const {setGroupFormTask} = useContext(connectContext)
    //hook
    const {handleChange, error, value, valueRef} = useForm(defaultCalue, emailSchema)
    //useEffect
    useEffect(() => {
        function handleClose () {
            if (childRef.current) {
                if (childRef.current?.children.length > 1) {
                    menuRef.current?.remove();
                }
            }
        }
        closeRef.current?.addEventListener('click', handleClose)
        return () => {
            closeRef.current?.removeEventListener('click', handleClose)
        }
    })
    function cleanTable(tableau: string[]) {
        // 1. Filtrer les valeurs vides
        const valeursNonVides = tableau.filter(valeur => valeur !== "");
      
        // 2. Supprimer les doublons en utilisant un Set
        const valeursUniques = [...new Set(valeursNonVides)];
      
        return valeursUniques;
      }
    //DOM
    return (
        <div ref={menuRef} className="flex flex-col items-center justify-start">
            <div ref={childRef} className="flex items-center">
                <input 
                    type="email" 
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    name="email" 
                    className="px-4 py-2 bg-secondary text-sidebarText w-full outline-none placeholder:text-gray-500 text-sm" 
                    placeholder="Enter Email Adress"
                    value={value.email} 
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            if (!error) {
                                numberEmailRef.current++
                                setNumberEmail(numberEmailRef.current)
                                setGroupFormTask((prevElements: tabTask[]) => {
                                    // Créer une copie du tableau pour éviter de modifier l'état directement
                                    const nouveauTableau = [...prevElements];
                                    // Modifier la valeur de x du premier élément
                                    const tab = cleanTable(nouveauTableau[index].assign)
                                    nouveauTableau[index].assign = [...tab, valueRef.current];
                                    return nouveauTableau;
                                });
                            }
                        }
                    }}
                />
                <div ref={closeRef}>
                    <IoMdClose size={14} className="cursor-pointer" onClick={() => {}}/>
                </div>
            </div>
            {error !== undefined && <p className="text-xs text-red-400">Email adress invalid</p>}
        </div>
    )
}

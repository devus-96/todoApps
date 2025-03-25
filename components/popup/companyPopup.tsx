"use client"
import { Dispatch, SetStateAction, useState } from "react";
import Popup from "./popup"
import { Spinner } from "../ui/spinner";

export const CompanyPopUp = ({
    active, 
    setCreateCompany
    }: {
        active: boolean,
        setCreateCompany: Dispatch<SetStateAction<boolean>>
    }) => {
    const [loadind, setLoading] = useState<boolean>(false);
    return (
        <>
            {active && (
                <Popup width="400px" height="auto" modeNight={true} setActive={setCreateCompany}>
                    <form action={(formData) => {
                        setLoading(true)
                    }} className="text-gray-800 px-8 py-4">
                        <h1 className="text-sm mb-4">create new company</h1>
                        <div>
                            <label htmlFor="" className="text-xs">name</label>
                            <input type="text" className="py-[4px] px-4 text-gray-800 text-sm w-full border border-gray-800 rounded outline-none placeholder:text-gray-500" required/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="" className="text-xs">description</label>
                            <textarea name="" className="py-[4px] w-full px-4 text-gray-800 text-sm border border-gray-800 rounded outline-none placeholder:text-gray-500"></textarea>
                        </div>
                        <button type="submit"className="px-2 py-[8px] w-full flex-center rounded-full text-sm btnEffect">
                            {loadind && <Spinner className="w-[18px] p-0 mr-4" bg="#333" fill="#9eabe4" />}create
                        </button>
                    </form>
                </Popup>
            )}
        </>
       
    )
}
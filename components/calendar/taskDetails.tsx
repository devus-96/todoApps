import React from "react";
import { tabTask } from "@/types/task";

export function TaskDetails ({item}: {item: tabTask | null}) {
    return <div className="w-[300px] h-[420px] bg-white px-4 py-4 space-y-4 rounded capitalize flex flex-col justify-between text-sm font-[family-name:var(--font-jetBrains-mono)]">
                <h1 className="text-xl font-[family-name:var(--font-jetBrainsExtraBold-mono)]">Details</h1>
                <div className="h-[250px]">
                    <h1>name: {item?.name}</h1>
                    <p>creation date: {item?.creation}</p>
                    <p>start date: {item?.start_date}</p>
                    <div>
                        <p>start: {item?.start_time}</p>
                        <p>end: {item?.end_time}</p>
                    </div>
                    <p>status: {item?.status}</p>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <button className="btnActive">Reprogrammer</button>
                    <button className="btnInactive">Annuler</button>
                </div>
            </div>
}


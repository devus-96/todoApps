"use client"

import { Select } from "../select";

export default function Routine () {
    return <div className="w-[300px] h-[420px] bg-white py-4 rounded capitalize flex flex-col font-[family-name:var(--font-jetBrains-mono)]">
            <div className="px-4">
                <h1>repeat every</h1>
                <div className="flex items-center space-x-4">
                    <input type="number" name="every" className="px-4 py-2.5 bg-gray-200 w-20 rounded cursor-pointer border"/>
                    <Select 
                        name="week" 
                        handler={() => {}} 
                        options={["day", 'week', 'month', 'year']}
                        inputClass="inputClass"
                        className = "inputclassName"
                        seclectClass = 'seclectClass'
                    />
                </div>
            </div>
            <div className="px-4">
                <h1>ends</h1>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <input type="radio" name=""/>
                        <label htmlFor="">Never</label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="radio" name=""/>
                        <button className="btnClock">{'5 janvier 2016'}</button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="radio" name=""/>
                        <div className="flex items-center">after <input type="number" name="" className="px-4 py-1 w-20 bg-gray-200 rounded cursor-pointer border"/> ocurrences</div>
                    </div>
                </div>
                
            </div>
    </div>
}
"use client"
import { Calendar } from "@/components/calendar";
import { useState } from "react";
import { FaProjectDiagram, FaSearch } from "react-icons/fa";
import { LuFolder } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { LuFileCheck } from "react-icons/lu";
import React from "react";


const DashboardCard = () => {
  return <div className="bg-gray-100 rounded-xl p-2">
  <div className="flex items-center">
      <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-bgLoging mr-4">
          <LuFolder size={16} />
      </div>
      <div>
        <p>projectName</p>
        <p className="text-xs text-gray-400">0 task</p>
      </div>
  </div>
  <div>
    <p className="text-sm">Progess</p>
    <input type="range" name="" id="" className="w-full" />
  </div>
  <div>
    <p className="text-sm">Menbers</p>
    <div className="w-full flex justify-between items-center">
      <div className="w-[30px] h-[30px] rounded-full bg-bgLoging"></div>
      <p className="text-sm">12 days</p>
    </div>
  </div>
</div>
}

const AssignmentsCard = () => {
  return <div className="w-full flex justify-between items-center bg-gray-100 rounded-2xl p-2">
            <div className="w-full flex items-center space-x-4">
              <div className="w-[30px] h-[30px] rounded-xl flex items-center justify-center bg-bgLoging mr-4">
                <LuFileCheck size={16} />
              </div>
              <div className="">
                    <p className="">make me design</p>
                    <p className="text-xs text-gray-400">make me design</p>
              </div>
            </div>
            <div className="py-2 px-4 bg-pink-400 rounded-full text-sm">Progess</div>
          </div>
}

const ScheduleCard = () => {
  return <div className="flex justify-between items-center">
            <div className="space-x-4 flex items-center">
                <div className="w-[30px] h-[30px] rounded-xl flex items-center justify-center bg-bgLoging mr-4"><GoClock size={16} /></div>
                <div>
                    <p className="text-sm">make design system</p>
                    <p className="text-xs text-gray-400">00h - 12h</p>
                </div>
            </div>
            <IoIosArrowForward size={16} />
        </div>
}

const TaskEvolution = () => {
  return <div className="w-full flex justify-between items-center bg-gray-100 rounded-2xl py-1 px-4">
          <div className="w-[250px] flex items-center space-x-4">
            <div className="w-[50px] h-[50px] rounded-xl flex items-center justify-center bg-bgLoging mr-4">
             <FaProjectDiagram size={16} />
            </div>
            <div className="">
                  <p className="">make me design</p>
                  <div className="flex items-center space-x-4">
                      <div className="w-[20px] h-[20px] rounded-full bg-bgLoging"></div>
                      <p className="text-xs text-gray-400">make me design</p>
                  </div>  
            </div>
          </div>
          <div className="w-[300px]"><input type="range" name="" id="" className="w-full" /></div>
          <div className="text-sm">15 tasks</div>
        </div>
}


export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  return <main className="absolute bg-bgLoging top-0 right-0 w-[calc(100%-200px)] h-auto space-y-4 font-[family-name:var(--font-jetBrains-mono)]">
    <div className="w-full flex justify-between px-4 py-2">
      <h1 className="font-[family-name:var(--font-jetBrainsExtraBold-mono)] text-2xl">Welcome</h1>
      <div className="flex items-center space-x-4">
        <div className="w-500px flex items-center bg-gray-100 rounded-full p-4 space-x-4">
          <FaSearch size={16} />
          <input className="bg-gray-100 w-4/5 outline-none" type="search" name="search"/>
        </div>
        <div className="w-[50px] h-[50px] rounded-full bg-gray-400"></div>
      </div>
    </div>
    <div className="grid grid-cols-12 gap-4 px-4">
      <div className="col-span-8 space-y-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-lg">Current Projects</h1>
          <p className="text-sm underline">View All</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
           <DashboardCard />
           <DashboardCard />
           <DashboardCard />
        </div>
        <div className="w-full grid grid-cols-9 gap-4">
            <div className="col-span-5 bg-gray-100 h-[200px] p-4 space-y-4 px-4 rounded-xl">
                <div className="w-full flex justify-between">
                    <div className="">
                      <p>Hours Activities</p>
                      <p className="text-sm text-gray-400">0% increase than last week</p>
                    </div>
                    <div className="py-4 px-8 bg-bgLoging rounded-full text-sm">weekly</div>
                </div>
            </div>
            <div className="col-span-4 bg-gray-100 h-[200px] p-4 space-y-4 rounded-xl">
                <p className="">Daily schedule</p>
                <ScheduleCard />
                <ScheduleCard />
                <ScheduleCard />
            </div>
        </div>
        <div className="w-full">
            <h1 className="text-base">currents task</h1>
            <div className="w-full space-y-4">
              <TaskEvolution />
              <TaskEvolution />
            </div>
        </div>
      </div>
      <div className="col-span-4 space-y-4">
            <Calendar 
              value={currentDate} 
              onChange={setCurrentDate}
              textColor = 'text-gray-800'
              divClassCells = "w-full h-full bg-gray-100 rounded p-2 cursor-pointer hover:bg-gray-100/70"
              className = 'w-full bg-gray-100 rounded-xl font-[family-name:var(--font-jetBrains-mono)]'
              cellsClass='pt-2 pb-2 text-textcolor text-left px-2 w-full h-full bg-gray-100'
            />
            <div className="w-full">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-base">Assignments</h1>
                <p className="text-sm hover:underline">View All</p>
              </div>
              <div className="w-full grid grid-rows-3 gap-4">
                  <AssignmentsCard />
                  <AssignmentsCard />
              </div>
            </div>
      </div>
    </div>
  </main>
}

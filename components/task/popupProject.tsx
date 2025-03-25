import React from "react"
import { taskContext } from "@/hooks/useTask"
import clsx from "clsx"
import { format } from "date-fns"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { useForm } from "@/hooks/useForm"
import { IoMdClose } from "react-icons/io";

const roles = [
    {
        role: 'administrator',
        description: 'Can view stats, change site settings, invite people, approve tasks, Can view stats,submit tasks and create new task'
    },
    {
        role: 'Menbers',
        description: 'Can view stats,submit tasks and create new task'
    },
]

const Step = ({setStep, step}: {setStep: Dispatch<SetStateAction<'step 1' | 'step 2' | 'step 3'>>, step: string}) => {
    return <div className='w-full flex items-center justify-between'>
            <button className={clsx('btnClock', {'bg-terciary text-white': step === 'step 1', 'bg-gray-100 text-gray-800': step !== 'step 1'})} onClick={() => setStep('step 1')}>step 1 </button>
            <button className={clsx('btnClock', {'bg-terciary text-white': step === 'step 2', 'bg-gray-100 text-gray-800': step !== 'step 2'})} onClick={() => setStep('step 2')}>step 2 </button>
            <button className={clsx('btnClock', {'bg-terciary text-white': step === 'step 3', 'bg-gray-100 text-gray-800': step !== 'step 2'})} onClick={() => setStep('step 3')}>step 3 </button>
        </div>
}

const PopupProject = () => {
    const [step, setStep] = useState<'step 1' | 'step 2' | 'step 3'>('step 1')
    const {state, setDispatch} = useContext(taskContext)
    const { 
        handleEmail, 
        emails, 
        handleOption, 
        handleChange, 
        value, 
        startDateRef,
        handleClick, 
        dedlineRef} = useForm(state.deadline, state.date, state.clockStart, state.clockEnd)

    return <div className={clsx({
                'hidden' : state.form === '',
                'popupTask' : state.form === 'Project'
            })}>

                {step === "step 1" &&
                <>
                    <input 
                        type="text" 
                        name='name'
                        className="inputnameTask" 
                        placeholder='add project'
                        onChange={handleChange}
                    /> 
                    <Step setStep={setStep} step={step} />
                    <div className="w-full flex items-center justify-between">
                        <div className="">
                            <p className="text-sm text-gray-800">start date</p>
                            <input 
                                ref={startDateRef}
                                onClick={(e) => {
                                    handleChange(e)
                                    setDispatch({calendar: 'calendar'})
                                }} 
                                name="start_date"
                                type="button" value={`${format(state.date, "ccc dd LLLL yyyy")}`} 
                                className="btnClock bg-gray-100 text-sm"
                            />
                        </div>
                        <div className="">
                            <p className="text-sm text-gray-800">end date</p>
                            <input 
                                ref={dedlineRef}
                                onClick={(e) => {
                                    setDispatch({calendar: 'calendar'})
                                    setDispatch({isDeadline: true})
                                    handleChange(e)
                                }} 
                                name="deadline"
                                type="button" value={`${format(state.deadline, "ccc dd LLLL yyyy")}`} 
                                className="btnClock bg-gray-100 text-sm"
                            />
                        </div>
                    </div>
                    <textarea 
                        placeholder='add description'
                        onChange={handleChange}
                        name='description'
                        className="textarea"
                    ></textarea>
                    <button type="submit" onClick={() => setStep('step 2')} className="btn1 flex-center gap-4">Invite friend</button>
                </>
                }

                {step === 'step 2' &&
                    <>
                        <Step setStep={setStep} step={step} /> 
                        <p className="">Invite your  coworkers</p>
                        <input type="email" name="email" className="input text-sm" onKeyUp={handleEmail} />
                        <div className="grid grid-cols-1 gap-4 border p-4">
                                {emails.current.map((item: string, index) => (
                                    <div key={index} className="text-sm flex items-center justify-between bg-blue-200 p-4">
                                        <p>{item}</p>
                                        <IoMdClose size={16} className="cursor-pointer" onClick={() => handleClick(item)}/>
                                    </div>
                                ))}
                        </div>
                        {roles.map((item, index) => (
                            <div key={index} className={clsx("relative flex flex-col p-4 border", {'bg-blue-200': value.role === item.role})}>
                                <input type="radio" name="role" value={item.role} onChange={handleOption} className="absolute z-2 right-0 w-full h-24 2xl:h-32 cursor-pointer m-auto opacity-0" />
                                <h1 className="font-bold">{item.role}</h1>
                                <h1 className="text-xs text-gray-600">{item.description}</h1>
                            </div>
                        ))}
                         <button type="submit" onClick={() => setStep('step 2')} className="btn1 flex-center gap-4">send invitation</button>
                    </>
                }
    </div>
}

export default PopupProject
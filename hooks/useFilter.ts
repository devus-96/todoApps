"use client"
import { sortListProps } from "@/components/Tasks/sortTasks";
import { format, isDate } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";


export function useFilter(defaultValue: sortListProps, store: any) {
    const [values, setValue] = useState<any>(store)

    useEffect(() => {
        const tab = Object.values(defaultValue).filter((item) => item !== '')
        console.log(tab)
        if (tab.length === 0) {
            setValue(() => store)
        } else {
            sort()
        }
    }, [defaultValue])

    function sort () {
        setValue(() => {
            const newtab = [...store]
            const tab = newtab.filter((item) => {
                let condition = true;
                let condition2 = true;
                let condition3 = true;
                let condition4 = true;
                let condition5 = true;
                let condition6 = true;
                for(const [key, value] of Object.entries(defaultValue)) {
                    if (value !== '' && key === 'state') {
                        condition = item[key].toLowerCase() === value.toLowerCase()
                    } else if (value !== '' && key === 'priority') {
                        condition2 = item[key].toLowerCase() === value.toLowerCase()
                    } else if (value !== '' && key === 'assign') {
                        const menber = sortByMenbers(item.assign, value)
                        condition3 = menber === value
                    } else if (value !== '' && key === 'daily') {
                        condition4 = format(item.start_date, 'dd/MM/yyyy')  === format(item.deadline, 'dd/MM/yyyy')
                    } else if (value !== '' && key === 'weekly') {
                        const start = item.start_date as Date
                        const end = item.deadline as Date
                        condition6 = (end.getTime() - start.getTime()) > 86400000 && (end.getTime() - start.getTime()) < 604800000
                    } else if (value !== '' && key === 'monthly') {
                        const start = item.start_date as Date
                        const end = item.deadline as Date
                        const result = end.getTime() - start.getTime()
                        condition5 = result > 604800000
                    }
                }
                return condition && condition2 && condition3 && condition4 && condition5 && condition6
            })
            return tab;
        })
    }

    function sortByMenbers (menbers: {[key: string]: string}, value: any) {
        for (const [_, menber] of Object.entries(menbers)) {
            if (menber.toLowerCase() === value.toLowerCase()) {
                return menber.toLowerCase()
            }
        }
        return undefined
    }

        return {
            values
        }
}

/*
/*useEffect(() => {
        if (sortList.priority !== '' || sortList.state !== '' || sortList.assign !== '') {
            tasks.setValue(() => {
                const newtab = [...storeTasks.current]
                const tab = newtab.filter((item: Tasks) => {
                    let condition = true;
                    let condition2 = true;
                    let condition3 = true;
                    for(const [key, value] of Object.entries(sortList)) {
                        if (value !== '' && key === 'state') {
                            condition = item[key].toLowerCase() === value.toLowerCase()
                        } else if (value !== '' && key === 'priority') {
                            condition2 = item[key].toLowerCase() === value.toLowerCase()
                        } else if (value !== '' && key === 'assign') {
                            const menber = sortByMenbers(item.assign, value)
                            condition3 = menber === value
                        }
                    }
                    return condition && condition2 && condition3
                })
                return tab;
            })
        } else {
            tasks.setValue(storeTasks.current)
        }
    }, [sortList])*/


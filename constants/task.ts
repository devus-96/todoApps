import {CalendarClock, CalendarX, CheckCheck, CircleDashed, Flag, Users } from "lucide-react";

export const weeks = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  export const weeksMin = [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ];

export const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  export const currentDate = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const completeDate = `${day}, ${Month[month]} ${year}`
    return completeDate
  }

  export const optionsRepetition= [
        "Does not repeat", 
        'Daily', 
        'weekly on monday', 
        'monthly on first monday', 
        'annually on january 1',
        'every weekend', 
        'custom' 
    ]
  
export const projectRow = [
  {
      name: 'Name',
      icon: CheckCheck
  },
  {
      name: 'Assign',
      icon: Users
  },
  {
      name: 'status',
      icon: CircleDashed
  },
  {
      name: 'priority',
      icon: Flag
  },
  {
      name: 'start date',
      icon: CalendarX
  },
  {
      name: 'deadline',
      icon: CalendarClock
  },
]
import { format } from "date-fns";
import {CalendarClock, CalendarX, CheckCheck, CircleDashed, Flag, Users, AlarmClockPlus, AlarmClockOff, Target, CalendarArrowUp } from "lucide-react";

export const weeks = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

export const sortTask = {assign: '', priority: '',  state: '', daily: '', weekly: '', monthly: ''}

export const defaultValue = [{
    name: '',
    assign: '',
    priority: 'Empty',
    state: 'not started',
    start_date: format(new Date().toLocaleDateString(), "yyyy-MM-dd") ,
    deadline: format(new Date().toLocaleDateString(), "yyyy-MM-dd"),
    start_time: null,
    end_time: null,
    description: '',
}]
export const projectDefaultValue = {
    name: '',
    objectifs: null,
    start_date: format(new Date().toLocaleDateString(), "yyyy-MM-dd"),
    deadline: format(new Date().toLocaleDateString(), "yyyy-MM-dd"),
    repeat: null,
    description: '',
    priority: 'Empty',
    state: 'not started'
}

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

export const priority = [
    'high',
    'low',
    'medium'
]
export let states = [
    "not started",
    "paused",
    'in progress',
    'done',
    'canceled',
]


export const statusState = [
    {name: 'Canceled', color: '#f87171'},
    {name: 'Done', color: '#34d399'},
    {name: 'Paused', color:'#d782ff'},
    {name: 'In Progress', color: '#fbbf24'},
    {name: 'not started', color: '#a1a1aa '}
]

export const emails = [
    'marcdeus@gmail.com',
    "austinndjom@gmail.com",
    "fsadfdsafdf@gmail.com",
    "dsfdsfsdfsd@gmail.com",
    "irorororor@gmail",
    "sdsaooorje@gmail.com",
    "qwjjejejrrr@gmail.com",
    "eriowerjewoijr@gmail.com"
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
  
export const tasksRow = [
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
  {
    name: 'start time',
    icon: AlarmClockPlus
},
{
    name: 'end time',
    icon: AlarmClockOff
},
]

export const userstasksRow = [
  {
      name: 'Name',
      icon: CheckCheck
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
  {
    name: 'start time',
    icon: AlarmClockPlus
},
{
    name: 'end time',
    icon: AlarmClockOff
}
]

export const usersTaskRow = [
  {
    name: 'Name',
    icon: CheckCheck
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
{
  name: 'start time',
  icon: AlarmClockPlus
},
{
  name: 'end time',
  icon: AlarmClockOff
},
]

export const projectsRow = [
  {
    name: 'Name',
    icon: Target
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
{
  name: 'completion',
  icon: CalendarArrowUp
}
]
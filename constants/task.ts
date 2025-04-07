import {CalendarClock, CalendarX, CheckCheck, CircleDashed, Flag, Users, AlarmClockPlus, AlarmClockOff } from "lucide-react";

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

export const priority = [
    'high',
    'low',
    'medim'
]
export const states = [
    'Cancel',
    'Completed',
    'In Progress',
    'Done',
    "Plan",
    "Propose"
]

export const project = [
    {
      "id": '0',
      "name": "create that react components",
      "assign": {
        "0": "marcdeus@gmail.com",
        "1": "austinndjom@gmail.com",
        "2": "dsfdsfsdfsd@gmail.com"
      },
      "priority": "High",
      "state": "In Progress",
      "start_date": "20/11/2022",
      "deadline": "07/01/2023",
      "start_time": "",
      "end_time": ""
    },
    {
        "id": '1',
        "name": "write a redaction",
        "assign": {
          "0": "marcdeus@gmail.com"
        },
        "priority": "Low",
        "state": "Plan",
        "start_date": "20/11/2022",
        "deadline": "20/11/2022",
        "start_time": "01:00PM",
        "end_time": "06:00PM"
      }
  ]


export const statusState = [
    {name: 'Cancel', color: '#a1a1aa'},
    {name: 'Done', color: '#34d399'},
    {name: 'In Progress', color: '#fbbf24'},
    {name: 'Plan', color: '#60a5fa '}
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
  {
    name: 'start time',
    icon: AlarmClockPlus
},
{
    name: 'end time',
    icon: AlarmClockOff
},
]
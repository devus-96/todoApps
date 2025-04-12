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
    "Planning",
    "Paused",
    'In Progress',
    'Done',
    'Canceled',
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
      "start_date": new Date(),
      "deadline": new Date(),
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
        "state": "Planning",
        "start_date": new Date(),
        "deadline": new Date(),
        "start_time": "01:00PM",
        "end_time": "06:00PM",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '1',
        "name": "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
        "assign": {
          "0": "marcdeus@gmail.com",
          "1": "marcdeus@gmail.com",
          "2": "marcdeus@gmail.com",
          "3": "marcdeus@gmail.com"
        },
        "priority": "High",
        "state": "Planning",
        "start_date": new Date(),
        "deadline": new Date(),
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '1',
        "name": "Lorem, ipsum dolor",
        "assign": {
          "0": "jessicaYik@gmail.com",
          "1": "marcdeus@gmail.com",
          "2": "danielsKalvin@gmail.com",
          "3": "samiraMarchal@gmail.com"
        },
        "priority": "Medium",
        "state": "Done",
        "start_date": new Date(),
        "deadline": new Date(),
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '1',
        "name": "Lorem, ipsum",
        "assign": {
          "0": "jessicaYik@gmail.com"
        },
        "priority": "Low",
        "state": "Done",
        "start_date": new Date(),
        "deadline": new Date(),
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '1',
        "name": "sit amet consectetur adipisicing elit",
        "assign": {
          "0": "samiraMarchal@gmail.com"
        },
        "priority": "High",
        "state": "Canceled",
        "start_date": new Date(),
        "deadline": new Date(),
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '1',
        "name": "sit amet consectetur adipisicing elit",
        "assign": {
          "0": "samiraMarchal@gmail.com"
        },
        "priority": "High",
        "state": "Paused",
        "start_date": new Date(),
        "deadline": new Date(),
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      }
  ]

export const myprojects = [
  {
    "id": '0',
    "name": "symphony social",
    "priority": "High",
    "state": "In Progress",
    "start_date": new Date(),
    "deadline": new Date(),
  },
]


export const statusState = [
    {name: 'Canceled', color: '#a1a1aa'},
    {name: 'Done', color: '#34d399'},
    {name: 'Paused', color:'#d782ff'},
    {name: 'In Progress', color: '#fbbf24'},
    {name: 'Planning', color: '#60a5fa '}
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
    name: 'priority',
    icon: Flag
},
{
  name: 'completion',
  icon: CalendarArrowUp
}
]
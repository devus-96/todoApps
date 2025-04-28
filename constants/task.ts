import { getMonth, getYear, set, setDate } from "date-fns";
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
    assign: {},
    priority: 'Empty',
    state: 'not started',
    start_date: new Date(),
    deadline: new Date(),
    start_time: null,
    end_time: null,
    description: '',
}]
export const projectDefaultValue = {
    name: '',
    objectifs: null,
    start_date: new Date(),
    deadline: new Date(),
    repeat: null,
    description: '',
    priority: '',
    state: ''
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
    'medim'
]
export let states = [
    "not started",
    "paused",
    'in Progress',
    'done',
    'canceled',
]

export const project = [
    
      {
        "id": '0',
        "name": "symphony social",
        "priority": "High",
        "assign": {},
        "state": "In Progress",
        "start_date": setDate(new Date(), 2),
        "deadline": setDate(new Date(), 20),
        "start_time": "",
        "end_time": ""
      },
      {
          "id": '1',
          "name": "create that react components",
          "assign": {
            "0": "marcdeus@gmail.com",
            "1": "austinndjom@gmail.com",
            "2": "dsfdsfsdfsd@gmail.com"
          },
          "priority": "High",
          "state": "In Progress",
          "start_date": setDate(new Date(), 6),
          "deadline": setDate(new Date(), 8),
          "start_time": "",
          "end_time": ""
      },
      {
          "id": '2',
          "name": "write a redaction",
          "assign": {
            "0": "marcdeus@gmail.com"
          },
          "priority": "Low",
          "state": "Planning",
          "start_date": setDate(new Date(), 2),
          "deadline": setDate(new Date(), 9),
          "start_time": "01:00PM",
          "end_time": "06:00PM",
          "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
      "id": '3',
      "name": "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
      "assign": {
          "0": "marcdeus@gmail.com",
          "1": "marcdeus@gmail.com",
          "2": "marcdeus@gmail.com",
          "3": "marcdeus@gmail.com"
      },
      "priority": "High",
      "state": "Planning",
      "start_date": setDate(new Date(), 22),
      "start_time": "",
      "end_time": "",
      "deadline": set(new Date(), {year: getYear(setDate(new Date(), 9)), month: getMonth(setDate(new Date(), 9)) +1, date: 9}),
      "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
      "id": '4',
      "name": "Lorem, ipsum dolor",
      "assign": {
          "0": "jessicaYik@gmail.com",
          "1": "marcdeus@gmail.com",
          "2": "danielsKalvin@gmail.com",
          "3": "samiraMarchal@gmail.com"
      },
      "priority": "Medium",
      "state": "Done",
      "start_date": setDate(new Date(), 5),
      "deadline": setDate(new Date(), 12),
      "start_time": "",
      "end_time": "",
      "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
          "id": '5',
          "name": "Lorem, ipsum",
          "assign": {
            "0": "jessicaYik@gmail.com"
          },
          "priority": "Low",
          "state": "Done",
          "start_date": setDate(new Date(), 1),
          "deadline":setDate(new Date(), 11),
          "start_time": "",
          "end_time": "",
          "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
          "id": '6',
          "name": "sit amet consectetur adipisicing elit",
          "assign": {
            "0": "samiraMarchal@gmail.com"
          },
          "priority": "High",
          "state": "Done",
          "start_date": new Date(),
          "deadline": new Date(),
           "start_time": "08:10AM",
          "end_time": "18:00AM",
          "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '7',
        "name": "sit amet consectetur adipisicing elit",
        "assign": {
          "0": "samiraMarchal@gmail.com"
        },
        "priority": "High",
        "state": "In Progress",
        "start_date": setDate(new Date(), 4),
        "deadline": setDate(new Date(), 4),
          "start_time": "",
        "end_time": "",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '8',
        "name": "Tenetur quos ad laboriosam assumenda hic",
        "assign": {
          "0": "samiraMarchal@gmail.com"
        },
        "priority": "High",
        "state": "In Progress",
        "start_date": setDate(new Date(), 4),
        "deadline": setDate(new Date(), 4),
          "start_time": "08:10AM",
        "end_time": "18:00AM",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '9',
        "name": "sit amet consectetur adipisicing elit",
        "assign": {
          "0": "samiraMarchal@gmail.com"
        },
        "priority": "High",
        "state": "Done",
        "start_date": setDate(new Date(), 4),
        "deadline": setDate(new Date(), 4),
          "start_time": "08:10AM",
        "end_time": "18:00AM",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '10',
        "name": "consectetur adipisicing",
        "assign": {
          "0": "samiraMarchal@gmail.com"
        },
        "priority": "High",
        "state": "Canceled",
        "start_date": setDate(new Date(), 4),
        "deadline": set(new Date(), {year: getYear(setDate(new Date(), 9)), month: getMonth(setDate(new Date(), 9)) +1, date: 4}),
          "start_time": "",
        "end_time": "",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '11',
        "name": "consectetur adipisicing",
        "assign": {
          "0": "samiraMarchal@gmail.com",
          "1": "marcdevus@gmail.com"
        },
        "priority": "High",
        "state": "Canceled",
        "start_date": setDate(new Date(), 4),
        "deadline": set(new Date(), {year: getYear(setDate(new Date(), 9)), month: getMonth(setDate(new Date(), 9)) +1, date: 4}),
          "start_time": "",
        "end_time": "",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
      {
        "id": '12',
        "name": "consectetur adipisicing",
        "assign": {
          "0": "samiraMarchal@gmail.com",
          "1": "marcdevus@gmail.com",
          "2": "danielsKalvin@gmail.com"
        },
        "priority": "High",
        "state": "Done",
        "start_date": setDate(new Date(), 4),
        "deadline": set(new Date(), {year: getYear(setDate(new Date(), 9)), month: getMonth(setDate(new Date(), 9)) +1, date: 4}),
          "start_time": "08:10AM",
        "end_time": "18:00AM",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos ad laboriosam assumenda hic, cumque optio veritatis architecto, molestiae, earum blanditiis illum minima. Facere vel perspiciatis debitis suscipit dolore iste."
      },
  ]

export const myprojects = [
  {
    "id": '0',
    "name": "symphony social",
    "priority": "High",
    "state": "In Progress",
    "start_date": setDate(new Date(), 3),
    "deadline": setDate(new Date(), 18),
    "objectifs": {
      "0": "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      "1:": "amet consectetur adipisicing elit. Odio enim dolorem ipsum atque aperiam, minima veniam harum impedit ut ipsam beatae? Beatae, esse! Eaque rem eius fugiat tempore quia porro",
      "2": "Lorem ipsum dolor sit, amet consectetur adipisicing elit,Odio enim dolorem ipsum atque aperiam. ",
      "3": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, numquam! Exercitationem explicabo quae necessitatibus distinctio architecto, aspernatur saepe provident consequatur eos sint doloribus minus accusamus, modi error impedit dolor sunt?"
    }
  },
  {
    "id": '1',
    "name": "frontend dev",
    "priority": "High",
    "state": "In Progress",
    "start_date": new Date(),
    "deadline": setDate(new Date(), 20),
    "objectifs": {}
  },
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
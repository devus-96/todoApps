export const weeks = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
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
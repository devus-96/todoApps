import { DoorOpen, MessageCircleDashed, Trash2 } from "lucide-react"
import { GoDuplicate } from "react-icons/go"

export const taskOptions = [
    'Menbers',
    'States',
    'Priority',
    'Daily tasks',
    'weeklyTasks',
    'Monthly tasks'
]

export const taskAction = [
    {name: 'Duplicate', icon: GoDuplicate},
    {name: 'Add comment', icon: MessageCircleDashed},
    {name: 'Open', icon: DoorOpen},
    {name: 'Delete task', icon: Trash2}
]
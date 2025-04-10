import { MessageCircleDashed, Trash2 } from "lucide-react"
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
    {name: 'duplicate', icon: GoDuplicate},
    {name: 'add comment', icon: MessageCircleDashed},
    {name: 'delete task', icon: Trash2}
]
import { LuLayoutDashboard } from "react-icons/lu";
import { House } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { FileCheck2 } from 'lucide-react';
import { Target } from 'lucide-react';
import { History } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Cog } from 'lucide-react';
import { Users } from 'lucide-react';
import { Projector } from 'lucide-react';

const teamId = localStorage.getItem('teamId')

export const userRoute = [
    {
        name: 'Teams',
        icons: LuLayoutDashboard,
        route: '/teams'
    },
    {
        name: 'Company',
        route: '/company',
        icons: LuLayoutDashboard,
    },
    {
        name: 'Home',
        icons: House,
        route: '/users'
    },
    {
        name: 'Inbox',
        icons: Inbox,
        route: '/inbox'
    },
    {
        name: 'Tasks',
        icons: FileCheck2,
        route: '/users/tasks'
    },
    {
        name: 'Projects',
        icons: Target,
        route: '/users/project'
    },
    {
        name: 'History',
        icons: History,
        route: '/users/history'
    },
    {
        name: 'Trash',
        icons: Trash2,
        route: '/users/trash'
    },
    {
        name: "Settings",
        icons: Cog,
        route: '/users/setting'
    },
]

export const companiesRoute = [
    {
        name: 'Home',
        icons: LuLayoutDashboard,
        route: '/'
    },
    {
        name: 'Teams',
        icons: '',
        route: '/teams'
    },
    {
        name: 'Menbers',
        icons: '',
        route: '/menbers'
    },
    {
        name: 'Meetings',
        icons: '',
        route: '/meetings'
    },
    {
        name: 'History',
        icons: '',
        route: '/history'
    },
    {
        name: 'Trash',
        icons: '',
        route: '/trash'
    },
    {
        name: "Settings",
        icons: "",
        route: '/setting'
    }
]

export const teamsRoutes = [
    {
        name: 'Home',
        icons: House,
        route: `/teams/${teamId}`
    },
    {
        name: 'Menbers',
        icons: Users,
        route: `/teams/${teamId}/menber`
    },
    {
        name: 'Meetings',
        icons: Projector,
        route: `/teams/${teamId}/meetings`
    },
    {
        name: 'Tasks',
        icons: FileCheck2,
        route: `/teams/${teamId}/tasks`
    },
    {
        name: 'Projects',
        icons: Target,
        route: `/teams/${teamId}/project`
    },
    {
        name: 'History',
        icons: History,
        route: `/teams/${teamId}/history`
    },
    {
        name: 'Trash',
        icons: Trash2,
        route: `/teams/${teamId}/trash`
    },
    {
        name: "Settings",
        icons: Cog,
        route: `/teams/${teamId}/setting`
    },
]
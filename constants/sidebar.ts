import { LuLayoutDashboard } from "react-icons/lu";
import { House } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { FileCheck2 } from 'lucide-react';
import { Target } from 'lucide-react';
import { History } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Cog } from 'lucide-react';

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
        route: '/'
    },
    {
        name: 'Inbox',
        icons: Inbox,
        route: '/inbox'
    },
    {
        name: 'Tasks',
        icons: FileCheck2,
        route: '/tasks'
    },
    {
        name: 'projects',
        icons: Target,
        route: '/project'
    },
    {
        name: 'History',
        icons: History,
        route: '/history'
    },
    {
        name: 'Trash',
        icons: Trash2,
        route: '/trash'
    },
    {
        name: "Settings",
        icons: Cog,
        route: '/setting'
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
        icons: LuLayoutDashboard,
        route: '/'
    },
    {
        name: 'Tasks',
        icons: LuLayoutDashboard,
        route: '/tasks'
    },
    {
        name: 'projects',
        icons: LuLayoutDashboard,
        route: '/project'
    },
    {
        name: 'Menbers',
        icons: '',
        route: '/menbers'
    },
    {
        name: 'History',
        icons: LuLayoutDashboard,
        route: '/history'
    },
    {
        name: 'Trash',
        icons: LuLayoutDashboard,
        route: '/trash'
    },
    {
        name: "Settings",
        icons: LuLayoutDashboard,
        route: '/setting'
    }
]


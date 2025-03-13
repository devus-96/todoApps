import { FaTasks } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { LuCalendarDays, LuLayoutDashboard } from "react-icons/lu";
import { VscGitPullRequestDraft } from "react-icons/vsc";

export const route = [
    {
        name: 'Dashboard',
        icons: LuLayoutDashboard,
        route: "/"
    },
    {
        name: 'Calendar',
        icons: LuCalendarDays,
        route: "/calendar"
    },
    {
        name: 'Project',
        icons: FaTasks,
        route: "/project"
    },
    {
        name: 'Settings',
        icons: GoGear,
        route: "/settings"
    },
    {
        name: 'Draft',
        icons: VscGitPullRequestDraft,
        route: "draft"
    }
]
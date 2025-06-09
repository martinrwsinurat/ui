import * as React from "react";
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    Settings2,
    Plus,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavProjects } from "@/Components/nav-projects";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "",
        email: "",
        avatar: "",
    },
    navMain: [
        {
            title: "History",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "projek",
            url: "/projects",
            icon: FolderKanban,
            items: [
                {
                    title: "semua projek",
                    url: "/projects",
                },
                {
                    title: "mulai projek",
                    url: "/projects/create",
                },
            ],
        },
        {
            title: "Pekerjaan",
            url: "/tasks",
            icon: CheckSquare,
            items: [
                {
                    title: "Semua Pekerjaan",
                    url: "/tasks",
                },
                {
                    title: "Membuat pekerjaan",
                    url: "/tasks/create",
                },
            ],
        },
        {
            title: "Tim",
            url: "/team",
            icon: Users,
        },
        {
            title: "Pengaturan",
            url: "/settings",
            icon: Settings2,
            items: [
                {
                    title: "Profil",
                    url: "/profile",
                },
                {
                    title: "Pengaturan Tim",
                    url: "/team/settings",
                },
                {
                    title: "pengaturan projek",
                    url: "/projects/settings",
                },
            ],
        },
    ],
    projects: [
        {
            name: "projek aktif",
            url: "/projects?status=active",
            icon: FolderKanban,
        },
        {
            name: "Projek Selesai",
            url: "/projects?status=completed",
            icon: CheckSquare,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // Fungsi logout yang benar: POST ke /logout lalu redirect ke /login
    const handleLogout = async () => {
        await fetch('/logout', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
        });
        window.location.href = "/login";
    };

    return (
        <Sidebar
            collapsible="icon"
            className="bg-orange-500 text-white"
            {...props}
        >
            <SidebarHeader>
                {/* Tampilkan user di atas kiri */}
                <div className="flex items-center gap-3 py-4 px-2">
                    <img
                        src={data.user.avatar}
                        alt={data.user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                        <div className="font-semibold text-white">{data.user.name}</div>
                        <div className="text-xs text-white/80">{data.user.email}</div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            {/* Tombol Logout di bawah sidebar */}
            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 rounded bg-white text-orange-500 font-semibold hover:bg-orange-100 transition"
                >
                    Keluar
                </button>
            </div>
            <SidebarRail />
        </Sidebar>
    );
}
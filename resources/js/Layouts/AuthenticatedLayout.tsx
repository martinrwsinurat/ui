import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
    header?: React.ReactNode;
}

export default function AuthenticatedLayout({
    children,
    header,
}: AuthenticatedLayoutProps) {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Projects", href: "/projects", icon: FolderKanban },
        { name: "Team", href: "/team", icon: Users },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar */}
            <div
                className={`fixed inset-0 z-40 lg:hidden ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            >
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    onClick={() => setSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-xl font-bold">Project Manager</h1>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                <item.icon className="mr-3 h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                    <div className="flex h-16 items-center px-4">
                        <h1 className="text-xl font-bold">Project Manager</h1>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                <item.icon className="mr-3 h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden px-4"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                    <div className="flex flex-1 justify-end px-4">
                        <div className="ml-4 flex items-center md:ml-6">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={`https://ui-avatars.com/api/?name=${user?.name}`}
                                                alt={user?.name}
                                            />
                                            <AvatarFallback>
                                                {user?.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {header && <div className="mb-6">{header}</div>}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

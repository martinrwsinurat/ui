import { PropsWithChildren } from "react";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toaster } from "sonner";
import { Head } from "@inertiajs/react";

interface Props {
    user: User;
    header?: React.ReactNode;
}

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <meta
                    name="cloudinary-cloud-name"
                    content={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
                />
            </Head>
            <Toaster position="top-right" />
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <h1 className="text-xl font-bold">
                                        Project Manager
                                    </h1>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link
                                    href={route("dashboard")}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route("projects.index")}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Projects
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-500 mr-4">
                                        {user.name}
                                    </span>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <Button variant="outline">
                                            Logout
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="p-6">{children}</Card>
                </div>
            </main>
        </div>
    );
}

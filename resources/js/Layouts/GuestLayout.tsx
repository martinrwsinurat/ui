import { ReactNode } from "react";
import { Link } from "@inertiajs/react";

interface Props {
    children: ReactNode;
}

export default function GuestLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Soft Manage UI
                    </h1>
                </Link>
            </div>

            <div className="w-full sm:max-w-3xl mt-10 px-10 py-9 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

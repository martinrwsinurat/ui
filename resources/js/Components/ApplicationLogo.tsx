import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    className?: string;
}

export default function ApplicationLogo({ className = "", ...props }: Props) {
    return (
        <svg
            {...props}
            className={`text-gray-700 ${className}`}
            viewBox="0 0 24 24"
            fill="none"
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15"/>
                </filter>
            </defs>
            <polygon
                points="12,2 2,7 12,12 22,7"
                fill="url(#logo-gradient)"
                filter="url(#shadow)"
            />
            <polygon
                points="2,12 12,17 22,12 12,7"
                fill="url(#logo-gradient)"
                opacity="0.7"
            />
            <polygon
                points="2,17 12,22 22,17 12,12"
                fill="url(#logo-gradient)"
                opacity="0.5"
            />
        </svg>
    );
}
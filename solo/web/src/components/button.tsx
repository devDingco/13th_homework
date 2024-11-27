"use client"

import { buttonMap } from "@/types/button.type";
import { usePathname } from "next/navigation";

export default function Button() {
    const path = usePathname()
    const buttonName = buttonMap[path]
    
    
    return <button className="w-full bg-[#2974e5] text-white flex justify-center items-center px-4 py-3 rounded-lg prose-sb_18_24">
        {buttonName}
    </button>
};

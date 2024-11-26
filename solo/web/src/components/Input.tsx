"use client"

import { IInputProps } from "@/types/input.type";

export default function Input({ placeholder } : IInputProps) {
    return (
        <input
            placeholder={placeholder}
            className="w-full text-[#ababab] px-4 py-3 border-[1px] border-gray-200 rounded-lg outline-none prose-me_14_20"
        />
    );
}

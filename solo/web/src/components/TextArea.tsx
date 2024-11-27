"use client"

import { IInputProps } from "@/types/input.type";
import { useState } from "react";

export default function TextArea({ placeholder }: IInputProps) {
    const [length, setLength] = useState<number>(0);
    return (
        <div className="relative">
            <textarea
                placeholder={placeholder}
                className="w-full  px-4 py-3 border-[1px] border-gray-200 rounded-lg outline-none prose-me_14_20 h-40 placeholder-[#ababab]"
                onChange={(event) => setLength(event.target.value.length)}
            />
            <div className="absolute bottom-4 right-4 text-[#ababab]">{length} / 100</div>
        </div>
    );
};

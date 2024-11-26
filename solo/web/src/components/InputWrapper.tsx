import { IInputWrapperProps } from "@/types/input.type";
import Input from "./Input";
import TextArea from "./TextArea";

export default function InputWrapper({ name, placeholder, textarea } : IInputWrapperProps) {
    return (
        <div className="w-full flex-col flex gap-2">
            <div className="flex items-center gap-1">
                <div className="prose-sb_14_20">{name}</div>
                <div className="text-[#f66a6a]">*</div>
            </div>
            {textarea ? <TextArea placeholder={placeholder}/> : <Input placeholder={placeholder} /> } 
        </div>
    )
};

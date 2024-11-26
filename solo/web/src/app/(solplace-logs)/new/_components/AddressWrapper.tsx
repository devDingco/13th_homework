import AddressInput from "./AddressInput";
import { EInputTitle } from "@/types/input.type";

export default function AddressWrapper() {
    return (
        <div className="w-full flex-col flex gap-2">
            <div className="prose-sb_14_20">{EInputTitle.ADDRESS}</div>
            <AddressInput />
        </div>
    )
};

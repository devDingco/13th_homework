/** @format */

import {
    ENewInputPlaceHolder,
    ENewTitleProps,
    ITitle,
} from '@/models/newTitle';

export default function NewTextarea({ title, error, onChangeValue }: ITitle) {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <div className="flex gap-1">
                <div className=" text-gray-800">{ENewTitleProps[title]}</div>
                <div className="text-red-400">*</div>
            </div>
            <textarea
                id={title}
                name={title}
                className="w-full h-[336px] border-[1px] border-gray-200 px-3 py-4 rounded-lg outline-none placeholder:text-gray-400 placeholder:prose-r_16_24"
                placeholder={ENewInputPlaceHolder[title]}
                onChange={(event) =>
                    onChangeValue?.({ name: title, value: event.target.value })
                }
            ></textarea>
            <div className="text-red-400 prose-me_16_24">{error}</div>
        </div>
    );
}

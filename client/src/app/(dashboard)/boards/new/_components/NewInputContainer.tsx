/** @format */

import { ENewTitleProps, ITitle } from '@/models/newTitle';
import NewInput from './NewInput';

export default function NewInputContainer({
    title,
    error,
    onChangeValue,
}: ITitle) {
    return (
        <div className="flex flex-col gap-2 flex-1 prose-me_16_24">
            <div className=" flex gap-1">
                <div className=" text-gray-800">{ENewTitleProps[title]}</div>
                {title !== 'YoutubeUrl' && (
                    <div className="text-red-400">*</div>
                )}
            </div>
            <NewInput title={title} onChangeValue={onChangeValue} />

            <div className="text-red-400 ">{error}</div>

            {title !== 'Author' && title !== 'Password' && (
                <div className="border-b-[1px] border-gray-200 mt-10"></div>
            )}
        </div>
    );
}

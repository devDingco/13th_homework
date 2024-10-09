"use client";

import useSubmitInput from "@/commons/hooks/useSubmitInput";
import { InputPlaceholder } from "@/commons/types/types";

export const Input = function CompInput({ ...props }) {
    const { id, textarea } = props;
    const { handleChange } = useSubmitInput;

    return (
        <>
            {!textarea ? (
                <input
                    id={id}
                    placeholder={InputPlaceholder[id]}
                    onChange={handleChange}
                />
            ) : (
                <textarea
                    id={id}
                    placeholder={InputPlaceholder[id]}
                    onChange={handleChange}
                ></textarea>
            )}
        </>
    );
};

// export const Input = function CompInput(props) {
//     return (
//         <input
//             id={props.id}
//             defaultValue={props.title}
//             onChange={props.onChange}
//             placeholder="input"
//         />
//     );
// };

// export const Textarea = function CompTextarea(props) {
//     return (
//         <textarea
//             id={props.id}
//             defaultValue={props.contents}
//             onChange={props.onChange}
//             placeholder="area"
//         ></textarea>
//     );
// };

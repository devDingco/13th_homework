"use client";

import { InputStyle, TextStyle } from "@/commons/types/styles";
import { InputPlaceholder } from "@/commons/types/types";

export default function Input({ ...props }) {
    const { id, textarea, onChange, value, disabled } = props;

    return (
        <>
            {!textarea ? (
                <input
                    style={InputStyle}
                    id={id}
                    type={id === "password_ID" ? "password" : "text"}
                    placeholder={InputPlaceholder[id]}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                />
            ) : (
                <textarea
                    style={{ ...InputStyle, ...TextStyle }}
                    id={id}
                    placeholder={InputPlaceholder[id]}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                ></textarea>
            )}
        </>
    );
}

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

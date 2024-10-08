"use client";

export const Input = function CompInput({ ...props }) {
    const { id, placeholder, onChange, textarea } = props;

    return (
        <>
            {!textarea ? (
                <input id={id} placeholder={placeholder} onChange={onChange} />
            ) : (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
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

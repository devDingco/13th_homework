"use client";

import { Input } from "@/components/Atoms/_Input";
import styles from "../../Organisms/BoardsNew/styles.module.css";

export default function InputField({ ...props }) {
    const { id, label, placeholder, value, onChange, required, textarea } =
        props;

    return (
        <label style={{ display: "flex", flexDirection: "column" }}>
            {label}
            <b style={{ color: "#F55" }}>{required && " * "}</b>
            <Input
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                textarea={textarea}
            />
            <b style={{ color: "#F55" }}>
                {value || !required ? <br /> : "필수 입력 사항입니다."}
            </b>
        </label>
    );
}

// interface InputProps {
//     fieldClass?: string;
//     labelID?: string;
//     innerText?: string;
//     required?: boolean;
//     textArea?: string;
//     type?: string;
//     placeHolder?: string;
//     onChange?: React.ChangeEventHandler;
//     value?: string;
// }
// // 인풋 컴포넌트 공용, 필수입력 검증
// export default function InputField({
//     fieldClass,
//     labelID,
//     innerText,
//     required,
//     textArea,
//     type,
//     placeHolder,
//     onChange,
//     value,
// }: InputProps) {
//     return (
//         <fieldset className={fieldClass}>
//             <label htmlFor={labelID}>{innerText}</label>
//             <b>{required ? "*" : ""}</b>
//             {!textArea ? (
//                 <input
//                     id={labelID}
//                     type={type}
//                     placeholder={placeHolder}
//                     onChange={onChange}
//                 />
//             ) : (
//                 <textarea
//                     id={labelID}
//                     placeholder={placeHolder}
//                     onChange={onChange}
//                 />
//             )}
//             <b>{value || !required ? <br /> : "필수입력 사항 입니다."}</b>
//         </fieldset>
//     );
// }

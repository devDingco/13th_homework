interface InputProps {
    fieldClass: string;
    labelID: string;
    innerText: string;
    required?: boolean;
    textArea?: string;
    type: string;
    placeHolder: string;
    onChange?: React.ChangeEventHandler;
    value?: string;
}
// 인풋 컴포넌트 공용, 필수입력 검증
export default function InputField({
    fieldClass,
    labelID,
    innerText,
    required,
    textArea,
    type,
    placeHolder,
    onChange,
    value,
}: InputProps) {
    return (
        <fieldset className={fieldClass}>
            <label htmlFor={labelID}>{innerText}</label>
            <b>{required ? "*" : ""}</b>
            {!textArea ? (
                <input
                    id={labelID}
                    type={type}
                    placeholder={placeHolder}
                    onChange={onChange}
                />
            ) : (
                <textarea
                    id={labelID}
                    placeholder={placeHolder}
                    onChange={onChange}
                />
            )}
            <b>{value || !required ? <br /> : "필수입력 사항 입니다."}</b>
        </fieldset>
    );
};

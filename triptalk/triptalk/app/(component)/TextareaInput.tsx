export interface TextAreaInputProps
{
    label : string;
    required: boolean;
    placeholder: string;
}

const TextAreaInput = ( props : TextAreaInputProps ) => {
    return (
        <>
            <label> {props.label} {props.required && <code>*</code>}
                <textarea placeholder={props.placeholder}></textarea>
            </label>
        </>
    );
};

export default TextAreaInput;
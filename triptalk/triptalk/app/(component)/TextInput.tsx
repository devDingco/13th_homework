export interface TextInputProps
{
    label : string;
    required: boolean;
    placeholder: string;
    value: string;
}

const TextInput = ( props : TextInputProps ) => {
    return (
        <>
            <label> {props.label} {props.required && <code>*</code>}
                <input type="text" placeholder={props.placeholder}/>
            </label>
        </>
    );
};

export default TextInput;
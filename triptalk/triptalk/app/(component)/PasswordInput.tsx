export interface PasswordInputProps
{
    label : string;
    required: boolean;
    placeholder: string;
}

const PasswordInput = ( props : PasswordInputProps ) => {
    return (
        <>
            <label> {props.label} {props.required && <code>*</code>}
                <input type="password" placeholder={props.placeholder}/>
            </label>
        </>
    );
};

export default PasswordInput;
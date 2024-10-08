import React, { ChangeEvent } from 'react';
import s from './Textarea.module.css';

interface InputPropsType<RequiredType = undefined> {
  id: RequiredType extends undefined ? string : keyof RequiredType;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  required?: RequiredType;
  onChangeFnc: (name: string, e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = <
  RequiredType extends Record<string, any> | undefined = undefined,
>({
  ...props
}: InputPropsType<RequiredType>) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {props.required && <b className="text-[#f00]">*</b>}
      <textarea
        id={props.id}
        className={s.textareaS}
        placeholder={props.placeholder}
        onChange={(e) => props.onChangeFnc(props.id, e)}
        value={props.value}
      />
      <p className="text-[#f00]">
        {props.required && props.required[props.id]}
      </p>
    </div>
  );
};

export default Textarea;

import React, { ChangeEvent } from 'react';
import s from './Textarea.module.css';

interface InputPropsType {
  id: 'username' | 'userTitle' | 'userpw' | 'usercontent';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  required?: RequiredType;
  onChangeFnc: (name: string, e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ ...props }: InputPropsType) => {
  return (
    <p>
      <label htmlFor={props.id}>{props.label}</label>
      {props.required && <b className="text-[#f00]">*</b>}
      <textarea
        id={props.id}
        className={s.textareaS}
        placeholder={props.placeholder}
        onChange={(e) => props.onChangeFnc(props.id, e)}
      />
      <p className="text-[#f00]">
        {props.required && props.required[props.id]}
      </p>
    </p>
  );
};

export default Textarea;

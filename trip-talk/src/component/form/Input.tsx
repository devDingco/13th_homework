import React, { ChangeEvent } from 'react';
import s from './Input.module.css';

interface InputPropsType {
  type: React.HTMLInputTypeAttribute;
  id: string;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChangeFnc: (name: string, e: ChangeEvent<HTMLInputElement>) => void;
}

const inputConfig = {
  small: 'px-4 py-3 w-[50px] box-content',
  medium: 'px-4 py-3',
  large: 'px-4 py-3',
};

const Input = ({ ...props }: InputPropsType) => {
  return (
    <p className={`s.inputWrap ${props.size === 'small' ? 'w-fit' : 'w-full'}`}>
      <span>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        {props.required && <b className={`text-[#f00]`}>*</b>}
      </span>
      <input
        className={`${s.inputS} ${props.size && inputConfig[props.size]}`}
        type={props.type}
        id={props.id}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        onChange={(e) => props.onChangeFnc(props.id, e)}
      />
    </p>
  );
};

export default Input;

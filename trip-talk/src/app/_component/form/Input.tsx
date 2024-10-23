import React, { ChangeEvent } from 'react';
import s from './Input.module.css';

interface InputPropsType<RequiredType = undefined> {
  type: React.HTMLInputTypeAttribute;
  id: RequiredType extends undefined ? string : keyof RequiredType;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  required?: RequiredType;
  size?: 'small' | 'medium' | 'large';
  dispaly?: string;
  target?: HTMLInputElement;
  onChangeFnc: (name: string, e: ChangeEvent<HTMLInputElement>) => void;
}

const inputConfig = {
  small: 'w-[90px]',
  medium: 'px-4 py-3',
  large: 'px-4 py-3',
  disabled: 'bg-gray/100 text-white',
};

const Input = <
  RequiredType extends Record<string, any> | undefined = undefined,
>({
  ...props
}: InputPropsType<RequiredType>) => {
  return (
    <div
      className={`${s.inputWrap} ${
        props.size === 'small' ? inputConfig[props.size] : 'w-full'
      }`}>
      <span>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        {props.required && <b className={`text-[#f00]`}>*</b>}
      </span>
      <input
        className={`${s.inputS} ${props.size && inputConfig[props.size]} ${
          props.disabled && inputConfig['disabled']
        }`}
        type={props.type}
        id={props.id}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        onChange={(e) => props.onChangeFnc(props.id, e)}
        value={props.value}
        disabled={props.disabled}
      />
      <p className="text-[#f00]">
        {props.required && props.required[props.id]}
      </p>
    </div>
  );
};

export default Input;

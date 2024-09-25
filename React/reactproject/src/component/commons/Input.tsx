import { ChangeEvent } from "react";

interface Props {
  label ?: string, 
  type: string, 
  id: string, 
  placeholder: string, 
  name: string, 
  onChange ?:(event: ChangeEvent<HTMLInputElement>) => void; 
}

export default function Input ({label, type, id, placeholder, name, onChange} : Props) {
    return (
    <div>
      <label htmlFor={name} className={`css_${name}tag`}>{label}</label>
      <input type={type} id={id} name={name} placeholder={placeholder} className={`css_${name}input`} onChange={onChange}/>
    </div>
    );
  };    

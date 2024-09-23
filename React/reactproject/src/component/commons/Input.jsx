export default function Input ({ label, type, id, placeholder, name, onChange}) {
    return (
    <div>
      <label htmlFor={id} className={`css_${name}tag`}>{label}</label>
      <input type={type} id={id} name={id} placeholder={placeholder} className={`css_${name}input`} onChange={onChange}/>
    </div>
    );
  };    

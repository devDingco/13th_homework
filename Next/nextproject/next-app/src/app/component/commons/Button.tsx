interface ButtonProps {
  type: string,
  value: string,
  name: string
}

export default function Button  ({type, value, name}: ButtonProps) {
    return (
      <div>
        <input type={type} name={name} value={value} className={`css_${name}`} />
      </div>
    )
  }

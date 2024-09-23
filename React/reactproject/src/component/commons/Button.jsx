export default function Button  ({type, value, name}) {
    return (
      <div>
        <input type={type} name={name} value={value} className={`css_${name}`} />
      </div>
    )
  }

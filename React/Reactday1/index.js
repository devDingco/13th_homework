const HtmlInput = ({ label, type, id, placeholder, name }) => {
    return (
        <div>
            <label htmlFor={id} className={`css_${name}tag`}>{label}</label>
            <input type={type} id={id} name={id} placeholder={placeholder} className={`css_${name}input`} />
        </div>
    );
};



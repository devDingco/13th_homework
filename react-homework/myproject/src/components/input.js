import React, { createElement } from "react"
import ErrorMsg from "./error"

const InputField = ({ label, tag, type, name, placeholder, onChangeInput, value, error, isRequired }) => {
  const inputElement = createElement(
    tag,
    {
      className: 'input-box',
      type: type,
      name: name,
      placeholder: placeholder,
      onChange: onChangeInput,
      value: value,
    }
  )

  return (
    <div className="input-group">
      <label className="input-label">{label}{isRequired && <span className="require"> *</span>}</label>
      {inputElement}
      {error && <ErrorMsg errorMessage={error} />}
    </div>
  )
}

export default InputField
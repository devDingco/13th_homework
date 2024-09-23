export const EditorHeader = (props) => {
  return <div className="editor-header">{props.title}</div>;
};

export const InputForm = (props) => {
  const InputFormTitle = () => {
    return (
      <div className="input-form-title">
        <div className="input-form-title-text">{props.title}</div>
        {props.required && <div className="required-star">*</div>}
      </div>
    );
  };
  const InputFormContent = () => {
    switch (props.as) {
      case "text":
        return (
          <input
            className="input-text"
            type="text"
            placeholder={props.placeholder}
            onChange={props.실행할함수}
          />
        );
      case "textarea":
        return <textarea className="input-textarea"></textarea>;
      case "photo":
        return (
          <div className="photo-area">
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
    }
  };

  return (
    <div className="content-area">
      <InputFormTitle />
      <InputFormContent />
    </div>
  );
};

export const EditButton = (props) => {
  return props.reg ? (
    <button className="normal-button">{props.value}</button>
  ) : (
    <button className="edit-button">{props.value}</button>
  );
};

export const Divider = (props) => {
  return <hr className="divider" />;
};

const EditorHeader = (props) => {
  return <div className="editor-header">{props.title}</div>;
};

const InputForm = (props) => {
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
          />
        );
      case "textarea":
        return <textarea className="input-textarea"></textarea>;
      case "photo":
        return <div></div>;
    }
  };

  return (
    <div>
      <InputFormTitle />
      <InputFormContent />
    </div>
  );
};

const EditButton = (props) => {
  return props.reg ? (
    <button className="normal-button">{props.value}</button>
  ) : (
    <button className="edit-button">{props.value}</button>
  );
};

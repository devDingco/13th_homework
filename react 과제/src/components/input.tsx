import Icon from "../components/iconFactory";

const Input = (props: any) => {
  let { title, ...rest } = props;

  if (props.type === "file" && props.accept === "image/*") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          {title}
          {props.required && <span className="text-red-500">*</span>}
        </div>
        <div className="flex gap-4">
          {props.uploadcount &&
            Array.from({ length: props.uploadcount }).map((_, index) => (
              <label key={index} className="imgUploadBox">
                <input className="blind" {...rest} />
                <Icon icon="add" className="fill-gray-500 w-10" />
                클릭해서 사진 업로드
              </label>
            ))}
        </div>
        {props.required && <div className="toolTip">필수입력 사항 입니다.</div>}
      </div>
    );
  }

  return (
    <label className="w-2/4 flex flex-col gap-2" htmlFor={props.id}>
      <div className="flex gap-1">
        {title}
        {props.required && <span className="text-red-500">*</span>}
      </div>
      <input
        className={`border border-gray-300 rounded-lg w-full py-3 px-4 
          ${props.required ? "validStyle" : ""}`}
        {...rest}
      />
      {props.required && <div className="toolTip">필수입력 사항 입니다.</div>}
    </label>
  );
};

export default Input;

const TextArea = (props: any) => {
  const { title, ...rest } = props;
  return (
    <label className="flex flex-col gap-2" htmlFor={props.id}>
      <div>
        {title}
        {props.required && <span className="text-red-500">*</span>}
      </div>
      <textarea
        className={`border border-gray-300 rounded-lg w-full py-3 px-4 h-80 
          ${props.required ? "validStyle" : ""}`}
        {...rest}
      ></textarea>
      {props.required && <div className="toolTip">필수입력 사항 입니다.</div>}
    </label>
  );
};

export default TextArea;

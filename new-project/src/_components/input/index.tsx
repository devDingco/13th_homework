"use client";

// TODO: InputComponent type error
const InputComponent = ({ className, placeholder, ...props }) => {
  return (
    <input
      className={`w-full h-15 p-2 text-black border-solid border-2 border-black rounded-xl ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default InputComponent;

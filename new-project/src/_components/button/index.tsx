"use client";

const ButtonComponent = ({ value, className, ...props }) => {
  return (
    <button
      className={`w-24 h-15 p-2 border-solid border-2 border-black rounded-xl hover:bg-sky-500 hover:text-white ${className}`}
      {...props}
    >
      {value}
    </button>
  );
};

export default ButtonComponent;

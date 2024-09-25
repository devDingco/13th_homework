import React from "react";

interface IErrorMessage {
  errorMessage?: string;
}

const ErrorMsg: React.FC<IErrorMessage> = ({ errorMessage }) => {
  return (
    errorMessage && <span className='error-msg'>{errorMessage}</span>
  )
}

export default ErrorMsg
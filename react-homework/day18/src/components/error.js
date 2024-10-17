const ErrorMsg = ({ errorMessage }) => {
  return (
    errorMessage && <span className='error-msg'>{errorMessage}</span>
  )
}

export default ErrorMsg
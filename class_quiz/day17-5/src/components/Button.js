const Button = ({ onClick }) => {

    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) {
            onClick();
        }
    }

    return (
        <>
            <div className="logginBtn">
                <button type="button" className="logginBtn" onClick={handleClick}>로그인</button>
            </div>
        </>
    )
    
};

export default Button;
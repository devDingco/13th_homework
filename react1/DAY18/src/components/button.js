

const Button = ({ onSubmit, onReset, style }) => {
    
    

   
    const submitBtn = (e) => {
        e.stopPropagation();
        if (onSubmit) {
            onSubmit();
}
     
    }
    const resetBtn = (e) => {
        e.stopPropagation();
        if (onReset) {
            onReset();
}
    }

    return (
        <>
            <div className="form-button">
                <button type="submit" className="submitBtn" onClick={submitBtn} style={style}>등록하기</button>
                <button type="reset" className="resetBtn" onClick={resetBtn}>취소</button>
            </div>
            <div>
           
            </div>
        </>
    )
};

export default Button;
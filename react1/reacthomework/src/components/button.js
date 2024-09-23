const Button = ({ onSubmit,onReset}) => {


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
            <div class="form-button">
                <button type="submit" class="submitBtn" onClick={submitBtn}>등록하기</button>
                <button type="reset" class="resetBtn" onClick={resetBtn}>취소</button>
            </div>
            <div>
           
            </div>
        </>
    )
};

export default Button;
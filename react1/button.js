const Button = (props) => {


    const submitBtn = (e) => {
     e.preventDefault();
     
    }
    const resetBtn = (e) => {
        e.preventDefault();
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
}
import { MouseEvent } from "react";

interface IButton {
    onSubmit: () => void;
    onReset: () => void;
    style: React.CSSProperties;
    isDisabled: boolean;

}

const Button = ({ onSubmit, onReset, style, isDisabled }: IButton): JSX.Element => {
    
    

   
    const submitBtn = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
            onSubmit();
}
     
    
    const resetBtn = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
            onReset();

    }

    return (
        <>
            <div className="form-button">
                <button type="submit" className="submitBtn" onClick={submitBtn} style={style} disabled={isDisabled}>등록하기</button>
                <button type="reset" className="resetBtn" onClick={resetBtn}>취소</button>
            </div>
            <div>
           
            </div>
        </>
    )
};

export default Button;
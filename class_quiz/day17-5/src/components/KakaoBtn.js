const KakaoBtn = ({ onClick }) => {

    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <div>
                <button type="button" className="kakaoBtn" onClick={handleClick}>
                    <img src="/images/kakaoIcon.png" alt="kakao" />
                    카카오톡으로 로그인
                </button>
            </div>
        </>
    )
};

export default KakaoBtn;
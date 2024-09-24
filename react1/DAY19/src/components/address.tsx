const Address = ():JSX.Element => {
    
    return (
        <>
            <div className="form_content">
                <div className="title">주소</div>
                <div className="addressSearch">
                    <input type="number" id="number" placeholder="01234" />
                    <button id="postCode">우편번호 검색</button>
                </div>
                <div className="inputBox">
                    <input id="addressInput" type="text" placeholder="주소를 입력해주세요" />
                    <input id="detailAddressInput" type="text" placeholder="상세주소" />
                </div>
            </div>
        </>
    )
};

export default Address;
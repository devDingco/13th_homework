const 게시글등록 = () => {

    return (
        <div>
            <h1>게시글등록</h1>
            <div class="name_pw_bg flex-bw">
                <div>
                    <span>작성자</span><span class="red">*</span>
                    <input type="text" placeholder="작성자 명을 입력하세요."></input>
                </div>
                <div>
                    <span>비밀번호</span><span class="red">*</span>
                    <input type="password" placeholder="비밀번호를 입력해 주세요."></input>
                </div>
            </div>
            <div class="title">
                <span>제목</span><span class="red">*</span>
                <input class="d-block" type="text" placeholder="제목을 입력해 주세요."></input>
            </div>
            <div class="subject">
                <span>내용</span><span class="red">*</span>
                <textarea class="d-block" placeholder="내용을 입력해 주세요."></textarea>
            </div>
            <div class="address">
                <p>주소</p>
                <div class="address_top">
                    <input type="text" placeholder="01234"></input>
                    <button>우편번호 검색</button>
                </div>
                <input class="d-block" type="text" placeholder="주소를 입력해 주세요."></input>
                <input type="text" placeholder="상세주소"></input>
            </div>
            <div class="link">
                <p>유튜브 링크</p>
                <input type="text" placeholder="링크를 입력해 주세요."></input>
            </div>
            <div class="picture">
                <p>사진 첨부</p>
                <div>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
            </div>
            <div class="bt_button">
                <button>취소</button>
                <button>등록하기</button>
            </div>
        </div>
    )
}
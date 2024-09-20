const App = () => {
    return (
        <div className="css_input">

            {/* 작성란 헤더 */}
            <div className="css_inputtop">
                {/* 작성자 */}
                <div className="css_writer">
                    <HtmlInput label="작성자" type="text" id="name_id" placeholder="작성자 명을 입력해 주세요." name="name"/>
                </div>
                {/* 비밀번호 */}
                <div className="css_password">
                    <HtmlInput label="비밀번호" type="password" id="pwd_id" placeholder="비밀번호를 입력해 주세요." name="pwd" />
                </div>
            </div>
            <hr></hr>
          

            {/* 제목 */}
            <div className="css_titletop">
                <div className="css_title">
                    <label htmlFor="title_id" className="css_titletag">제목</label>
                    <HtmlInput type="text" id="title_id" placeholder="제목을 입력해 주세요." name="title"/>
                </div>
            </div>
            <hr></hr>
           
            {/* 내용 */}
            <div className="css_contenttop">
                <div className="css_content">
                    <label htmlFor="content_id" className="css_contenttag">내용</label>
                    <HtmlInput type="text" id="content_id" placeholder="내용을 입력해 주세요." name="content"/>
                </div>
            </div>

            {/* 주소 */}
            <div className="css_address">
                <label htmlFor="addressnum_id" className="css_addressnumtag">주소</label>
                <div className="css_addressnum">
                    <HtmlInput type="text" id="addressnum_id" placeholder="01234" name="addressnum"/>
                    <button id="html_search" class="css_search">우편번호 검색</button>
                    {/* <HtmlInput type="button" id="search_id" placeholder="우편번호 검색" name="search"/> */}
                </div>
                
                <HtmlInput type="text" id="address_id" placeholder="주소를 입력해 주세요." name="address"/>
                <HtmlInput type="text" id="addressdetail_id" placeholder="상세주소" name="addressdetail"/>
            </div>

            <hr></hr>

            {/* 링크 */}
            <div className="css_link">
                <label htmlFor="link_id" className="css_linktag">링크</label>
                <HtmlInput type="text" id="link_id" placeholder="링크를 입력해 주세요." name="link"/>
            </div>
            <hr></hr>


            {/* 사진 첨부 */}
            <div class="enroll-row-section">
                <div>사진 첨부</div>
                <div class="picture-enroll-row">
                    <img src="./assets/add_image.png" />
                    <img src="./assets/add_image.png" />
                    <img src="./assets/add_image.png" />
                </div>
            </div>


            {/* 하단 버튼 */}
            <div class="enroll-button-container">
                <button class="enroll-cancel-button">취소</button>
                <button class="enroll-submit-button">등록하기</button>
            </div>
        </div>
    );
};

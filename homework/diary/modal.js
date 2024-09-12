const JS_일기쓰기모달보여주기기능 = () => {
    document.getElementById('HTML모달그룹').style = 'display: block';

    document.getElementById('HTML_모달').innerHTML = `
        <div class="CSS_일기쓰기등록상자">
            <img src="./image/writing.png" alt="writing" />
            <div class="CSS_메인오른쪽_중간">
            <div class="CSS_오늘기분">오늘기분은 어땠나요</div>

            <div class="CSS_라디오모음">
                <input
                    id="id_행복"
                    type="radio"
                    value="행복"
                    name="감정"
                />
                <label for="행복">행복해요</label>

                <input
                    id="id_슬픔"
                    type="radio"
                    value="슬픔"
                    name="감정"
                />
                <label for="슬픔">슬퍼요</label>

                <input
                    id="id_놀람"
                    type="radio"
                    value="놀람"
                    name="감정"
                />
                <label for="놀람">놀랐어요</label>

                <input
                    id="id_화남"
                    type="radio"
                    value="화남"
                    name="감정"
                />
                <label for="화남">화나요</label>

                <input
                    id="id_기타"
                    type="radio"
                    value="기타"
                    name="감정"
                />
                <label for="기타">기타</label>
            </div>

            <div class="CSS_제목">제목</div>
            <input
                id="id_제목"
                class="CSS_제목인풋"
                type="text"
                placeholder="제목을 입력하세요"
            />
            <div class="CSS_내용">내용</div>
            <textarea
                id="id_내용"
                class="CSS_내용인풋"
                placeholder="내용을 입력하세요"
            ></textarea>
        </div>

        <div class="CSS_버튼상자">
        <button class="CSS_닫기" onclick="JS_닫기('HTML모달그룹');">
            닫기
        </button>

        <button class="CSS_등록" onclick="JS_글쓰기기능(); onclick=JS_일기등록완료중첩모달()">
            등록하기
        </button>
        </div>
        </div>
    `;
};

const JS_닫기 = (모달종류) => {
    window.document.getElementById(모달종류).style = 'display:none';
};

const JS_일기등록완료중첩모달 = () => {
    window.document.getElementById('HTML_등록완료모달그룹').style =
        'display: block';
};

const JS_일기등록완료중첩모달확인 = () => {
    window.document.getElementById('HTML_등록완료모달그룹').style =
        'display: none';
    window.document.getElementById('HTML모달그룹').style = 'display:none';
};

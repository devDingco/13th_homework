export default function Submitpage() {
    return (
        <>
            <header>게시물 등록</header>
            <InputField
                fieldClass="field__author"
                labelID="author__ID"
                type="text"
                innerText="작성자"
                placeHolder="작성자 명을 입력해 주세요."
                onChange={handleChange}
                value={author}
                required
            />
            <InputField
                fieldClass="field__password"
                labelID="password__ID"
                type="password"
                innerText="비밀번호"
                placeHolder="비밀번호를 입력해 주세요."
                onChange={handleChange}
                value={password}
                required
            />
            <hr />
            <InputField
                fieldClass="field__title"
                labelID="title__ID"
                type="text"
                innerText="제목"
                placeHolder="제목을 입력해 주세요."
                onChange={handleChange}
                value={title}
                required
            />
            <hr />
            <InputField
                fieldClass="field__content"
                labelID="content__ID"
                type="text"
                innerText="내용"
                placeHolder="내용을 입력해 주세요."
                textArea="textArea"
                onChange={handleChange}
                value={content}
                required
            />
            <hr />
            <AddressField />
            <hr />
            <InputField
                fieldClass="field__link"
                labelID="link__ID"
                type="text"
                innerText="소셜 링크"
                placeHolder="링크를 입력해 주세요."
            />
            <hr />
            <ImgField />

            <div className="field__btn">
                <Btn
                    className="btn__cancel"
                    value="취소"
                    onClick={(e) => {
                        e.preventDefault();
                        Router.push(`/boards`);
                    }}
                />
                <Btn
                    className="btn__submit"
                    value="등록하기"
                    disabled={!valid}
                    onClick={onClickCreate}
                />
            </div>
        </>
    );
}

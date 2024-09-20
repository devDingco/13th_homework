const CreatePostPage = () => {
    const writerDescription = "작성자명을 입력해 주세요."
    const passwordDescription = "비밀번호를 입력해 주세요."
    const titleDescription = "제목을 입력해 주세요."
    const contentsDescription = "내용을 입력해 주세요."
    const youtubeLinkDescription = "링크를 입력해 주세요."

    return (
        <div className="rootContainer">
            <header>게시물 등록</header>
            <main>
                <div className="UserInputForm">
                    <BasicInputForm isRequired={true} title="작성자" placeholder={writerDescription}/>
                    <BasicInputForm isRequired={true} title="비밀번호" placeholder={passwordDescription}/>
                </div>
                <Divider />
                <BasicInputForm isRequired={true} title="제목" placeholder={titleDescription}/>
                <Divider />
                <ContentsInputForm title="내용" placeholder={contentsDescription}/>
                <AddressInputForm />
                <Divider />
                <BasicInputForm isRequired={false} title="유튜브 링크" placeholder={youtubeLinkDescription}/>
                <Divider />
                <PhotoUploadForm />
            </main>
            <footer>
                <RegisterForm />
            </footer>
        </div>
    );
}

const BasicInputForm = (props) => {
    if (props.isRequired) {
        return (
            <div id="PostInputForm" className="inputForm">
                <div className="inputTitle">{props.title}<span class="requiredMark">*</span></div>
                <TextInput placeholder={props.placeholder}/>
            </div>
            
        );        
    } else {
        return (
            <div id="PostInputForm" className="inputForm">
                <div className="inputTitle">{props.title}</div>
                <TextInput placeholder={props.placeholder}/>
            </div>
        );
    }
}

const ContentsInputForm = (props) => {
    return (
        <div className="inputForm">
            <div className="inputTitle">{props.title}<span class="requiredMark">*</span></div>
            <textarea className="inputTextArea" placeholder={props.placeholder}></textarea>
        </div>
    );
}

const AddressInputForm = () => {
    const zipCodeDescription = "01234"
    const addressDescription = "주소를 입력해주세요."
    const detailAddressDescription = "상세 주소"

    return (
        <div className="inputForm">
            주소
            <div class="ZipCodeContainer">
                <TextInput placeholder={zipCodeDescription} />
                <ZipCodeSearchButton />
            </div>
            <TextInput placeholder={addressDescription} />
            <TextInput placeholder={detailAddressDescription} />
        </div>
    );
}

const PhotoUploadForm = () => {
    return (
        <div className="inputForm">
            사진 첨부
            <div class="uploadButtonContainer">
                <UploadButton />
                <UploadButton />
                <UploadButton />
            </div>
        </div>
        
    );
}

const TextInput = (props) => {
    return <input className="inputText" type="text" placeholder={props.placeholder} />;
}

const Divider = () => {
    return <div class="divider"></div>;
}

const ZipCodeSearchButton = () => {
    return (
        <button class="zipCodeSearchButton">
            우편번호 검색
        </button>
    );
}

const UploadButton = () => {
    return (
        <div class="uploadImageContainer">
            <input type="file" id="uploadImage" />
            <div class="uploadDescription">
                <label for="uploadImage" id="uploadLabel">
                    <img src="./assets/add.png" />
                    클릭해서 사진 업로드
                </label>
            </div>
            
        </div>
    );
}

const RegisterForm = () => {
    return (
        <>
            <button class="cancelButton">취소</button>
            <button class="submitButton">등록하기</button>
        </>
    );
}


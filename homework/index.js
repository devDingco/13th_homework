const 게시글등록페이지 = () => {
    return (
        <div className="container">
            <div className="titleContainer">
                <div className="title">게시글 등록</div>
            </div>
            <div className="formContainer">
                <form>
                    <div className="box">
                        <div className="labelContainer">
                            <label>작성자  <span className="emphasize">*</span> </label>
                            <input className="input1" type="text"/>
                        </div>
                        <div className="labelContainer">
                            <label>비밀번호 <span className="emphasize">*</span> </label>
                            <input className="input1" type="password"/>
                        </div>
                    </div>

                    <div className="box">
                        <div className="labelContainer2">
                            <label>제목 <span className="emphasize">*</span> </label>
                            <input className="input2" type="text"/>
                        </div>
                    </div>

                    <div className="box">
                        <div className="labelContainer2">
                            <label>내용 <span className="emphasize">*</span> </label>
                            <textarea type="text"/>
                        </div>
                    </div>

                    <div className="columnBox">
                        <label>주소</label>
                        <div className="zipAndButtonContainer">
                            <input className="zipNum" type="text"/> <button className="searchZipNum">우편번호 검색</button>
                        </div>
                        <input className="input2" type="text"/>
                        <input className="input2" type="text"/>
                    </div>

                    <div className="box">
                        <div className="labelContainer2">
                            <label>유튜브 링크</label>
                            <input className="input2" type="text"/>
                        </div>
                    </div>
                    <div className='box3'>
                        <div className="labelContainer2">
                            <label>사진 첨부</label>
                            <div className="photoBoxContainer">
                                <div className='flexbox2'>
                                    <div className="photoBox">
                                        <img src='./img/add.png'/>
                                        <div className="photoBoxText">클릭해서 사진 업로드</div>
                                    </div>    
                                </div>
                                <div className='flexbox2'>
                                    <div className="photoBox">
                                        <img src='./img/add.png'/>
                                        <div className="photoBoxText">클릭해서 사진 업로드</div>
                                    </div>    
                                </div>
                                <div className='flexbox2'>
                                    <div className="photoBox">
                                        <img src='./img/add.png'/>
                                        <div className="photoBoxText">클릭해서 사진 업로드</div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>








                    <div className="buttonContainer">
                        <button className="cancelButton">취소</button>
                        <button className="submitButton" type="submit">등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ReactDOM을 사용해 게시글등록페이지를 렌더링
// ReactDOM.render(<게시글등록페이지 />, document.getElementById('root'));

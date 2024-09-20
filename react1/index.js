

const MainPage = () => {
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');


    const handelName = (e) => {
        setName(e.target.value);
    }

    const handelPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };


    return (
        <>
            <div className="container">
            <form style={{ border:'none'}}>
    <fieldset style={{ border:'none'}}>
        <legend>게시물 등록</legend>
                        <div className="form_control">
                            <div className="first_line">
                    <label htmlFor="name">작성자</label>
                                <input type="name" id="name" value={name} onChange={handelName} placeholder="작성자명을 입력해주세요" />
                                </div>
                            <div className="first_line">
                    <label htmlFor="password">비밀번호</label>
                                <input type="password" id="password" value={password} onChange={handelPassword} placeholder="비밀번호를 입력해주세요" />
                                </div>
                        </div>
                        <HrLine />
                <div className="form-content">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" value={title} onChange={handleTitle} placeholder="제목을 입력해주세요" />
                        </div>
                        <HrLine />
            
                <div className="form-content">
                    <label htmlFor="content">내용</label>
                    <textarea id="content" value={content} onChange={handleContent} placeholder="내용을 입력해주세요"></textarea>
                </div>
                
             </fieldset>
            </form>
                <Address />
                <HrLine />
                <YoutubeLink />
                <HrLine />
            <ImgUpload />
                <Button />
                </div>
            </>
    )
};
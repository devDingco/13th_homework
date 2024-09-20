const InputField = (props) => {
    return (
        <fieldset className={props.fieldClass}>
            <label htmlFor={props.labelID}>{props.innerText}</label> <b>{props.required ? "*" : ""}</b>
            {!props.textArea ?
            <input id={props.labelID} type="text" placeholder={props.placeHolder} onChange={props.onChange}/> :
            <textarea id={props.labelID} type="text" placeholder={props.placeHolder} onChange={props.onChange}></textarea> }
            <b value={props.labelID}>{props.bool ? "필수입력 사항 입니다." : ""}</b>
        </fieldset>
    )
}

const AddressField = () => {
    return (
        <fieldset className="field__address">
            <label>주소</label>

            <div className="address__zipcode">
                <input className="zipcode__input" type="tel" placeholder="01234" maxLength="5"/>
                <button className="zipcode__btn">우편번호<br />검색</button>
            </div>

            <input type="text" placeholder="주소를 입력해 주세요." />
            <input type="text" placeholder="상세주소" />
        </fieldset>
    )
}

const Main = () => {
    const [bool, setBool] = React.useState(true);
    const onChange = (event) => {
        const input = event.target.value
        console.log(input)
        console.log(event.target)
        input ? setBool(false) : setBool(true)
    }

    return <>
        <form>
            <InputField
                fieldClass="field__author"
                labelID="author__ID"
                innerText="작성자"
                placeHolder="작성자 명을 입력해 주세요."
                onChange={onChange}
                bool={bool}
                required
            />
            <InputField
                fieldClass="field__password"
                labelID="password__ID"
                innerText="비밀번호"
                placeHolder="비밀번호를 입력해 주세요."
                onChange={onChange}
                bool={bool}
                required
            />
            <hr />
            <InputField
                fieldClass="field__title"
                labelID="title__ID"
                innerText="제목"
                placeHolder="제목을 입력해 주세요."
                onChange={onChange}
                bool={bool}
                required
            />
            <hr />
            <InputField
                fieldClass="field__content"
                labelID="content__ID"
                innerText="내용"
                placeHolder="내용을 입력해 주세요."
                textArea="textArea"
                onChange={onChange}
                bool={bool}
                required
            />
            <hr />
            <AddressField />
            <hr />
            <InputField
                fieldClass="field__link"
                labelID="link__ID"
                innerText="소셜 링크"
                placeHolder="링크를 입력해 주세요."
            />
            <hr />
        </form>
    </>
}

ReactDOM.render(<Main />, document.querySelector("main"))
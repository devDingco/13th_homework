import Image from "next/image";
import Input from "../commons/Input";
import Button from "../commons/Button";
import styles from "./style.module.css";
import { IProps } from "./types";
import { UseBoardsWrite } from "./hook";

export default function BoardsWrite(props: IProps) {
  const {
    onChangeContent,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onClickSignup,
    onClickUpdate,
    isButtonDisabled,
    nameblank,
    titleblank,
    contentblank,
    passwordblank,
    name,
    contents,
    title,
    password,
    data,
  } = UseBoardsWrite(props);
  console.log(data?.fetchBoard.contents);

  return (
    <div className={styles.css_layout}>
      <div className={styles.css_header}>
        {props.isEdit ? "게시물 수정" : "게시물 등록"}
      </div>
      <div className={styles.css_input}>
        {/* 작성란 헤더 */}
        <div className={styles.css_inputtop}>
          {/* 작성자 */}
          <div className={styles.css_writer}>
            <label htmlFor="title_id" className={styles.css_nametag}>
              작성자
            </label>
            <Input
              type="text"
              id="name_id"
              placeholder="작성자 명을 입력해 주세요."
              name="name"
              value={props.isEdit ? data?.fetchBoard.writer : name}
              onChange={onChangeName}
              disabled={props.isEdit}
              className={
                props.isEdit
                  ? styles.disabled_input
                  : styles[`css_${name}input`]
              }
            />
            <div className={styles.css_blankerror}>{nameblank}</div>
          </div>
          {/* 비밀번호 */}
          <div className={styles.css_password}>
            <label htmlFor="title_id" className={styles.css_pwdtag}>
              비밀번호
            </label>
            <Input
              type="password"
              id="pwd_id"
              placeholder="비밀번호를 입력해 주세요."
              name="pwd"
              value={props.isEdit ? "******" : password}
              onChange={onChangePassword}
              disabled={props.isEdit}
              className={
                props.isEdit
                  ? styles.disabled_input
                  : styles[`css_${name}input`]
              }
            />
            <div className={styles.css_blankerror}>{passwordblank}</div>
          </div>
        </div>
        <div className={styles.css_line}></div>

        {/* 제목 */}
        <div className={styles.css_titletop}>
          <div className={styles.css_title}>
            제목
            <input
              type="text"
              id="title_id"
              placeholder="제목을 입력해 주세요."
              name="title"
              defaultValue={props.isEdit ? data?.fetchBoard.title : title}
              onChange={onChangeTitle}
              className={styles.css_titleinput}
            />
            <div className={styles.css_blankerror}>{titleblank}</div>
          </div>
        </div>
        <div className={styles.css_line}></div>

        {/* 내용 */}
        <div className={styles.css_contenttop}>
          <div className={styles.css_content}>
            내용
            <input
              type="text"
              id="title_content"
              placeholder="내용을 입력해 주세요."
              name="content"
              defaultValue={data?.fetchBoard.contents}
              onChange={onChangeContent}
              className={styles.css_contentinput}
            />
            <div className={styles.css_blankerror}>{contentblank}</div>
          </div>
        </div>

        {/* 주소 */}
        <div className={styles.css_address}>
          <label htmlFor="addressnum_id" className={styles.css_addressnumtag}>
            주소
          </label>
          <div className={styles.css_addressnum}>
            <Input
              type="text"
              id="addressnum_id"
              placeholder="01234"
              name="addressnum"
            />
            {/* value={addressnumber}onChange={onChangeAddressNumber} */}
            <Button type="button" value="우편번호 검색" name="search" />
          </div>
          <Input
            type="text"
            id="address_id"
            placeholder="주소를 입력해 주세요."
            name="address"
          />
          <Input
            type="text"
            id="addressdetail_id"
            placeholder="상세주소"
            name="addressdetail"
          />
        </div>

        <div className={styles.css_line}></div>

        {/* 링크 */}
        <div className={styles.css_link}>
          <label htmlFor="link_id" className={styles.css_linktag}>
            링크
          </label>
          <Input
            type="text"
            id="link_id"
            placeholder="링크를 입력해 주세요."
            name="link"
          />
        </div>
        <div className={styles.css_line}></div>

        {/* 사진 첨부 */}
        <div className={styles.css_picturepart}>
          <div>사진 첨부</div>
          <div className={styles.css_picture}>
            <Image
              src="/assets/AddImage.png"
              alt="addimage"
              width={0}
              height={0}
              className={styles.css_image}
              sizes="100vw"
            />
            <Image
              src="/assets/AddImage.png"
              alt="addimage"
              width={0}
              height={0}
              className={styles.css_image}
              sizes="100vw"
            />
            <Image
              src="/assets/AddImage.png"
              alt="addimage"
              width={0}
              height={0}
              className={styles.css_image}
              sizes="100vw"
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className={styles.css_button}>
          <button className={styles.css_cancelbutton}>취소</button>
          <button
            className={
              !props.isEdit && isButtonDisabled
                ? `${styles.css_submitbutton} ${styles.disabled}`
                : styles.css_submitbutton
            }
            onClick={props.isEdit ? onClickUpdate : onClickSignup}
            disabled={!props.isEdit && isButtonDisabled}
          >
            {props.isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </div>
    </div>
  );
}

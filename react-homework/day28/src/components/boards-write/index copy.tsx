import styles from "../styles.module.css";
import InputGroup from "@/components/inputGroup";
import UploadFile from "@/components/upload";
import AddressGroup from "@/components/address";
import ContentsGroup from "@/components/content";
import Button from "../button";
import { useBoardsWrite } from "./hook";
import { BoardsWriteProps } from "./types";

// 컴포넌트화 방식 다르게 했던 거

export default function BoardsWrite(props: BoardsWriteProps) {
  const {
    onChangeInput,
    onClickRegister,
    onClickEdit,
    isDisabled,
    errors,
    onClickEditCancel,
    onClickRegisterCancel,
  } = useBoardsWrite();

  return (
    <div className={styles.post_page}>
      <div className={styles.header}>
        게시물 {props.isEdit ? "수정" : "등록"}
      </div>
      <div className={styles.post_main}>
        <div className={styles.writer_box}>
          {/* 작성자 입력 필드 */}
          <InputGroup
            label={"작성자"}
            name="writer"
            onChange={onChangeInput}
            placeholder={"작성자 명을 입력하세요"}
            defaultValue={props?.data?.fetchBoard?.writer ?? ""}
            isDisabled={props.isEdit}
            error={errors?.writer}
          />

          {/* 비밀번호 입력 필드 */}
          <InputGroup
            label={"비밀번호"}
            type="password"
            name={"password"}
            onChange={onChangeInput}
            placeholder={"비밀번호를 입력하세요"}
            defaultValue={props.isEdit ? "******" : ""}
            isDisabled={props.isEdit}
            error={errors?.password}
          />
        </div>
        <hr />
        {/* 제목 입력 필드 */}
        <InputGroup
          label={"제목"}
          name="title"
          onChange={onChangeInput}
          placeholder={"제목을 입력하세요"}
          defaultValue={props?.data?.fetchBoard?.title ?? ""}
          error={errors?.title}
        />
        <hr />
        {/* 내용 입력 필드 */}
        <ContentsGroup
          onChange={onChangeInput}
          defaultValue={props?.data?.fetchBoard?.contents ?? ""}
          error={errors?.contents}
        />
        {/* 주소 입력 필드 */}
        <AddressGroup />
        <hr />
        {/* 유튜브링크 입력 필드 */}
        <InputGroup
          label={"유튜브 링크"}
          placeholder={"링크를 입력해 주세요."}
          isRequired={false}
        />
        <hr />

        <div className={styles.input_group}>
          <div className={styles.input_label}>사진 첨부</div>
          <div className={styles.upload_group}>
            <UploadFile />
            <UploadFile />
            <UploadFile />
          </div>
        </div>

        <div className={styles.btn_group}>
          <Button
            onClick={props.isEdit ? onClickEditCancel : onClickRegisterCancel}
            variant="cancel"
          >
            취소
          </Button>
          <Button
            onClick={props.isEdit ? onClickEdit : onClickRegister}
            // 수정하기일 땐 blue_active, 등록하기일 땐 blue_active or disabled
            variant={
              props.isEdit || (!props.isEdit && !isDisabled)
                ? "blue_active"
                : "disabled"
            }
            disabled={!props.isEdit && isDisabled}
          >
            {props.isEdit ? "수정" : "등록"}하기
          </Button>
        </div>
      </div>
    </div>
  );
}

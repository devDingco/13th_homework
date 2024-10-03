import InputGroup from "@/commons/components/inputGroup";
import UploadFile from "@/commons/components/upload";
import { CREATE_BOARD, UPDATE_BOARD } from "@/graphql/mutation";
import { IErrors, IInputs } from "@/types/states";
import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Button from "../button";
import styles from "../styles.module.css";
import ContentsGroup from "../contents";
import AddressGroup from "../address";

export default function BoardWrite({ isEdit, data }) {
  console.log("data:", data);
  // console.log("data: ", data?.fetchBoard);
  // input state
  const [inputs, setInputs] = useState<IInputs>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });
  // error state
  const [errors, setErrors] = useState<IErrors>({});
  // 등록하기버튼 비활성화 or 활성화
  const [isDisabled, setIsDisabled] = useState(true);
  // graphql
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const router = useRouter();
  const params = useParams();

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newInputs = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInputs);

    // input state들의 값이 모두 빈 문자열이 아니면
    const allInputFilled = Object.values(newInputs).every(
      (input) => input !== ""
    );
    setIsDisabled(!allInputFilled);
  };

  // 등록하기 - graphql state 전달
  const boardSubmit = async () => {
    try {
      // graphql 요청
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: inputs.writer,
            password: inputs.password,
            title: inputs.title,
            contents: inputs.contents,
          },
        },
      });
      console.log(result);
      console.log(result.data.createBoard.boardId);
      alert("게시글을 등록하였습니다😊");

      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      console.error(error);
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  // 등록하기
  const onClickSubmit = () => {
    // 에러 담을 객체
    const newErrors: IErrors = {};

    Object.keys(inputs).forEach((key) => {
      const inputKey = key as keyof IInputs;
      // 각 input state가 빈 문자열이면 newErrors에 넣어주기
      if (!inputs[inputKey]) {
        newErrors[inputKey] = "필수입력 사항 입니다.";
      }
    });

    // input중에 하나라도 입력 안되어있으면 error state에 newErrors 넣어주기
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      boardSubmit();

      setInputs({ writer: "", password: "", title: "", contents: "" });
    }
  };

  // 수정하기
  const onClickEdit = async () => {
    try {
      const password = prompt(
        "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
      );

      // prompt로 입력 받은 password, boardId는 미리 넣고, 변경이 필요한 부분은 일단 비워두기
      const variables = {
        updateBoardInput: {},
        password: password,
        boardId: params.boardId,
      };

      // state에 값이 있으면 variables에 넣기
      if (inputs.title) {
        variables.updateBoardInput.title = inputs.title;
      }
      if (inputs.contents) {
        variables.updateBoardInput.contents = inputs.contents;
      }

      const result = await updateBoard({
        variables: variables,
      });

      console.log("update: ", result);
      alert("수정 완료👍");
      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      // 비밀번호가 틀리면
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.post_page}>
      <div className={styles.header}>게시물 {isEdit ? "수정" : "등록"}</div>
      <div className={styles.post_main}>
        <div className={styles.writer_box}>
          {/* 작성자 입력 필드 */}
          <InputGroup
            label={"작성자"}
            name="writer"
            onChange={onChangeInput}
            placeholder={"작성자 명을 입력하세요"}
            defaultValue={data?.fetchBoard.writer}
            isDisabled={isEdit}
          />

          {/* 비밀번호 입력 필드 */}
          <InputGroup
            label={"비밀번호"}
            type="password"
            name={"password"}
            onChange={onChangeInput}
            placeholder={"비밀번호를 입력하세요"}
            defaultValue={isEdit && "******"}
            isDisabled={isEdit}
          />
        </div>
        <hr />
        {/* 제목 입력 필드 */}
        <InputGroup
          label={"제목"}
          name="title"
          onChange={onChangeInput}
          placeholder={"제목을 입력하세요"}
          defaultValue={data?.fetchBoard.title}
        />
        <hr />
        {/* 내용 입력 필드 */}
        <ContentsGroup
          onChange={onChangeInput}
          defaultValue={data?.fetchBoard.contents}
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
          <label className={styles.input_label}>사진 첨부</label>
          <div className={styles.upload_group}>
            <UploadFile />
            <UploadFile />
            <UploadFile />
          </div>
        </div>

        <div className={styles.btn_group}>
          <Button variant="cancel">취소</Button>
          {isEdit ? (
            <Button onClick={onClickEdit} variant={"blue_active"}>
              수정하기
            </Button>
          ) : (
            <Button
              onClick={onClickSubmit}
              variant={isDisabled ? "disabled" : "blue_active"}
              disabled={isDisabled}
            >
              등록하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

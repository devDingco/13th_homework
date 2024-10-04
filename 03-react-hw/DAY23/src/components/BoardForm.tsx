import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, ApolloError } from "@apollo/client";
import styles from "../app/boards/new/boardNew.module.css";
import InputField from "@/components/Input";
import TextareaField from "@/app/boards/new/_components/TextareaField";
import AddressInput from "@/app/boards/new/_components/AddressInput";
import ImgUploadBtn from "@/app/boards/new/_components/ImgUploadBtn";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "@/graphql/board";
import {
  BoardFormProps,
  FormData,
  CreateBoardInput,
  UpdateBoardInput,
  FormErrors,
} from "@/types/board";

const BoardForm: React.FC<BoardFormProps> = ({ mode, boardId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    zipCode: "",
    address: "",
    detailAddress: "",
    youtubeLink: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [createBoard] = useMutation<
    { createBoard: { _id: string } },
    { createBoardInput: CreateBoardInput }
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    { updateBoard: { _id: string } },
    { updateBoardInput: UpdateBoardInput; password: string; boardId: string }
  >(UPDATE_BOARD);
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { boardId },
    skip: mode === "create" || !boardId,
  });

  useEffect(() => {
    if (mode === "edit" && data?.fetchBoard) {
      const { writer, title, contents, youtubeUrl, boardAddress } =
        data.fetchBoard;
      setFormData({
        writer,
        password: "",
        title,
        contents,
        zipCode: boardAddress?.zipcode || "",
        address: boardAddress?.address || "",
        detailAddress: boardAddress?.addressDetail || "",
        youtubeLink: youtubeUrl || "",
      });
    }
  }, [data, mode]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data: FormData) => {
    const requiredFields = ["writer", "password", "title", "contents"];
    const allFieldsFilled = requiredFields.every(
      (field) => data[field as keyof FormData].trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
    return allFieldsFilled;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm(formData)) {
      setErrors({
        writer: formData.writer ? "" : "필수입력 사항입니다.",
        password: formData.password ? "" : "필수입력 사항입니다.",
        title: formData.title ? "" : "필수입력 사항입니다.",
        contents: formData.contents ? "" : "필수입력 사항입니다.",
      });
      return;
    }

    try {
      if (mode === "create") {
        const createBoardInput: CreateBoardInput = {
          writer: formData.writer,
          password: formData.password,
          title: formData.title,
          contents: formData.contents,
          youtubeUrl: formData.youtubeLink,
          boardAddress: {
            zipcode: formData.zipCode,
            address: formData.address,
            addressDetail: formData.detailAddress,
          },
        };
        const result = await createBoard({ variables: { createBoardInput } });
        alert("게시글이 성공적으로 등록되었습니다.");
        if (result.data) {
          router.push(`/boards/${result.data.createBoard._id}`);
        }
      } else if (boardId) {
        const password = prompt("글을 수정하기 위해 비밀번호를 입력해주세요");
        if (!password) return;

        const updateBoardInput: UpdateBoardInput = {};
        if (formData.title !== data?.fetchBoard.title)
          updateBoardInput.title = formData.title;
        if (formData.contents !== data?.fetchBoard.contents)
          updateBoardInput.contents = formData.contents;
        if (formData.youtubeLink !== data?.fetchBoard.youtubeUrl)
          updateBoardInput.youtubeUrl = formData.youtubeLink;
        if (
          formData.zipCode !== data?.fetchBoard.boardAddress?.zipcode ||
          formData.address !== data?.fetchBoard.boardAddress?.address ||
          formData.detailAddress !==
            data?.fetchBoard.boardAddress?.addressDetail
        ) {
          updateBoardInput.boardAddress = {
            zipcode: formData.zipCode,
            address: formData.address,
            addressDetail: formData.detailAddress,
          };
        }

        await updateBoard({
          variables: {
            updateBoardInput,
            password,
            boardId,
          },
        });
        alert("게시글이 성공적으로 수정되었습니다.");
        router.push(`/boards/${boardId}`);
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        error.graphQLErrors.forEach((err) => {
          if (err.extensions?.code === "UNAUTHENTICATED") {
            alert("비밀번호가 틀렸습니다.");
          } else {
            alert(
              mode === "create"
                ? "게시글 등록 중 오류가 발생했습니다."
                : "게시글 수정 중 오류가 발생했습니다."
            );
          }
        });
      } else {
        alert(
          mode === "create"
            ? "게시글 등록 중 오류가 발생했습니다."
            : "게시글 수정 중 오류가 발생했습니다."
        );
      }
    }
  };

  const handlePostcodeSearch = () => {
    console.log("우편번호 검색");
    // 우편번호 검색~~~~~...
  };

  if (mode === "edit" && loading) return <div>Loading...</div>;

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>{mode === "create" ? "게시물 등록" : "게시물 수정"}</nav>
      <form onSubmit={handleSubmit} className={styles.게시글등록전체상자}>
        <div className={styles.작성자입력상자}>
          <InputField
            label="작성자"
            name="writer"
            value={formData.writer}
            onChange={handleChange}
            placeholder="작성자 명을 입력해 주세요."
            required
            error={errors.writer}
            className={styles.중간입력창크기}
            disabled={mode === "edit"}
          />
          <InputField
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요."
            required
            error={errors.password}
            className={styles.중간입력창크기}
            disabled={mode === "edit"}
          />
        </div>
        <hr />
        {/* 게시글 등록 부분 */}
        <div className={styles.게시글등록전체상자}>
          <InputField
            label="제목"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해 주세요."
            required
            error={errors.title}
            className={styles.긴입력창크기}
          />
          <hr />
          {/* 내용 부분 */}
          <TextareaField
            label="내용"
            name="contents"
            value={formData.contents}
            onChange={handleChange}
            placeholder="내용을 입력해 주세요."
            required
            error={errors.contents}
            className={styles.내용입력창크기}
            rows={6}
          />
          <hr />
          {/* 주소 부분 */}
          <AddressInput
            zipCode={formData.zipCode}
            address={formData.address}
            detailAddress={formData.detailAddress}
            onZipCodeChange={(event) =>
              setFormData((prev) => ({ ...prev, zipCode: event.target.value }))
            }
            onAddressChange={(event) =>
              setFormData((prev) => ({ ...prev, address: event.target.value }))
            }
            onDetailAddressChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                detailAddress: event.target.value,
              }))
            }
            onSearchClick={handlePostcodeSearch}
          />
          <hr />
          {/* 유튜브 링크 부분 */}
          <InputField
            label="유튜브 링크"
            name="youtubeLink"
            value={formData.youtubeLink}
            onChange={handleChange}
            placeholder="링크를 입력해 주세요."
            className={styles.긴입력창크기}
          />
          <hr />
          {/* 사진 첨부 부분 */}
          <div className={styles.구분상자}>
            <span>사진 첨부</span>
            <form method="post" encType="multipart/form-data">
              <ImgUploadBtn />
              <ImgUploadBtn />
              <ImgUploadBtn />
            </form>
          </div>
          {/* 취소, 등록하기 버튼 부분 */}
          <div className={styles.취소등록버튼상자}>
            <button type="button" onClick={() => router.back()}>
              취소
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`${styles.등록하기버튼} ${
                isFormValid ? styles.active : styles.disabled
              }`}
            >
              {mode === "create" ? "등록하기" : "수정하기"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;

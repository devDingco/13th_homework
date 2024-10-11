import React from "react";
import { useBoardForm } from "@/hooks/useBoardForm";
import { BoardFormProps, InputProps, FormData } from "@/types/board";
import styles from "../app/boards/new/boardNew.module.css";
import InputField from "./Input";
import TextareaField from "@/app/boards/new/_components/TextareaField";
import AddressInput from "@/app/boards/new/_components/AddressInput";
import ImgUploadBtn from "@/app/boards/new/_components/ImgUploadBtn";

const BoardForm: React.FC<BoardFormProps> = ({ mode, boardId }) => {
  const {
    formData,
    errors,
    isFormValid,
    isFormChanged,
    loading,
    handleChange,
    handleSubmit,
  } = useBoardForm(mode, boardId);

  if (loading) return <div>롸딩중🎶</div>;

  const inputFields: Omit<InputProps, "value" | "onChange">[] = [
    {
      label: "작성자",
      name: "writer",
      required: true,
      disabled: mode === "edit",
      placeholder: "작성자 명을 입력해 주세요.",
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      required: true,
      disabled: mode === "edit",
      placeholder: "비밀번호를 입력해 주세요.",
    },
    {
      label: "제목",
      name: "title",
      required: true,
      placeholder: "제목을 입력해 주세요.",
    },
    {
      label: "유튜브 링크",
      name: "youtubeUrl",
      placeholder: "링크를 입력해 주세요.",
    },
  ];

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>{mode === "create" ? "게시물 등록" : "게시물 수정"}</nav>
      <form onSubmit={handleSubmit} className={styles.게시글등록전체상자}>
        <div className={styles.작성자입력상자}>
          {inputFields.slice(0, 2).map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={formData[field.name as keyof FormData] as string}
              onChange={handleChange}
              error={errors[field.name as keyof FormData]}
              className={styles.중간입력창크기}
            />
          ))}
        </div>
        <hr />
        <InputField
          {...inputFields[2]}
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          className={styles.긴입력창크기}
        />
        <hr />
        <TextareaField
          label="내용"
          name="contents"
          placeholder="내용을 입력해 주세요."
          value={formData.contents}
          onChange={handleChange}
          required
          error={errors.contents}
          className={styles.내용입력창크기}
        />
        <hr />
        <AddressInput
          zipcode={formData.zipcode ?? ""}
          address={formData.address ?? ""}
          addressDetail={formData.addressDetail ?? ""}
          onZipCodeChange={(event) =>
            handleChange({
              ...event,
              target: {
                ...event.target,
                name: "zipcode",
                placeholder: "01234",
              },
            })
          }
          onAddressChange={(event) =>
            handleChange({
              ...event,
              target: {
                ...event.target,
                name: "address",
                placeholder: "주소를 입력해 주세요.",
              },
            })
          }
          onAddressDetailChange={(event) =>
            handleChange({
              ...event,
              target: {
                ...event.target,
                name: "addressDetail",
                placeholder: "상세주소",
              },
            })
          }
          onSearchClick={() => console.log("우편번호 검색")}
        />
        <hr />
        <InputField
          {...inputFields[3]}
          value={formData.youtubeUrl || ""}
          onChange={handleChange}
          error={errors.youtubeUrl}
          className={styles.긴입력창크기}
        />
        <hr />
        <div className={styles.구분상자}>
          <span>사진 첨부</span>
          <div className={styles.사진첨부상자}>
            {[1, 2, 3].map((i) => (
              <ImgUploadBtn key={i} />
            ))}
          </div>
        </div>
        <div className={styles.취소등록버튼상자}>
          <button type="button" onClick={() => window.history.back()}>
            취소
          </button>
          <button
            type="submit"
            disabled={mode === "edit" ? !isFormChanged : !isFormValid}
            className={`${styles.등록하기버튼} ${
              (mode === "edit" ? isFormChanged : isFormValid)
                ? styles.active
                : styles.disabled
            }`}
          >
            {mode === "create" ? "등록하기" : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;

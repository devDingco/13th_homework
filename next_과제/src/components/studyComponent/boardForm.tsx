"use client";

interface BoardFormProps {
  isEdit?: boolean;
  subject?: string;
  content?: string;
  readOnly?: boolean;
}
// 수업용 연습 컴포넌트
export default function BoardForm(props: BoardFormProps) {
  const {
    isEdit = false, // 수정페이지인지 여부
    subject = "", // 제목
    content = "", // 내용
    readOnly = false, // 읽기전용 여부
  } = props;
  return (
    <div className="flex flex-col gap-3 p-4">
      <h1>{isEdit ? "수정" : "등록"} 페이지</h1>
      <form className="flex flex-col gap-3 items-start">
        <label>
          제목 :{" "}
          <input
            className="border"
            type="text"
            defaultValue={subject}
            readOnly={readOnly}
          />
        </label>
        <label>
          내용 :{" "}
          <input
            className="border"
            type="text"
            defaultValue={content}
            readOnly={readOnly}
          />
        </label>
        <button className="btn btn-primary text-base-100" type="submit">
          {isEdit ? "수정" : "등록"}하기
        </button>
      </form>
    </div>
  );
}

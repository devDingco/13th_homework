"use client";

export default function BoardNewPage() {
  return (
    <>
      <h1>수정페이지</h1>
      <form className="flex flex-col gap-3 items-start">
        <label>
          제목 : <input className="border" type="text" />
        </label>
        <label>
          내용 : <input className="border" type="text" />
        </label>
        <button className="btn btn-primary text-base-100" type="submit">
          등록하기
        </button>
      </form>
    </>
  );
}

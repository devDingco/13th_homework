'use client';

import { InputRoundedLarge } from '@/commons/ui/Input';
import { FormProvider } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useBoardsManager from './hooks';

// 우선 웹 에디터만 적용
// 게시글 관련 등록 수정 모두 css 고민다시
export default function BoardsManager() {
  const { onChangeContents, methods } = useBoardsManager();
  return (
    <main className="container">
      <section>
        <h1>교사 구직</h1>
        <FormProvider {...methods}>
          <form className="flex gap-5">
            <div className="flex flex-col">
              <span className="prose-large_font">제목</span>
              {/* 작성자는 회원가입했을때 이름이 바로 뜨게? 아니면 추가 작성? */}
              <span className="prose-large_font">작성자</span>
              <span className="prose-large_font">내용</span>
            </div>
            <div>
              <InputRoundedLarge
                keyname="title"
                type="text"
                placeholder="제목을 입력해주세요"
              />
              {/* 에러메시지 */}
              <InputRoundedLarge
                keyname="writer"
                type="text"
                placeholder="작성자를 입력해주세요"
              />
              <ReactQuill onChange={onChangeContents} />
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

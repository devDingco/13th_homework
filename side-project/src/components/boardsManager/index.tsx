'use client';

import { InputPassword, InputRoundedLarge } from '@/commons/ui/Input';
import { FormProvider } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useBoardsManager from './hooks';
import { ButtonDefaultRounded } from '@/commons/ui/button';
import withLoginCheck from '@/commons/hocs/withLoginCheck';
import { useState } from 'react';
import Image from 'next/image';

function BoardsManager() {
  const {
    onChangeContents,
    methods,
    onChangeRegister,
    onChangeFile,
    imageUrls,
  } = useBoardsManager();
  const [pwVisible, setPwVisible] = useState(false);
  return (
    <main className="container">
      <section>
        <h1>교사 구직</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onChangeRegister)}>
            <div className="flex gap-5">
              <div className="flex flex-col">
                <span className="prose-large_font">제목</span>
                {/* 작성자는 회원가입했을때 이름이 바로 뜨게? 아니면 추가 작성? */}
                <span className="prose-large_font">작성자</span>
                <span className="prose-large_font">비밀번호</span>
                <span className="prose-large_font">내용</span>
              </div>
              <div>
                <InputRoundedLarge
                  keyname="title"
                  type="text"
                  placeholder="제목을 입력해주세요"
                />
                <InputRoundedLarge
                  keyname="writer"
                  type="text"
                  placeholder="작성자를 입력해주세요"
                />
                <InputPassword
                  keyname="password"
                  placeholder="최소 4자이상 최대 15자 이내로 설정해주세요."
                  size="large"
                  visibilityToggle={{
                    visible: pwVisible,
                    onVisibleChange: setPwVisible,
                  }}
                />
                <ReactQuill onChange={onChangeContents} />
              </div>
            </div>
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <input type="file" onChange={onChangeFile(index)} />
                {imageUrls[index] && (
                  <Image
                    src={imageUrls[index]}
                    width={200}
                    height={200}
                    alt={`미리보기 ${index + 1}`}
                  />
                )}
              </div>
            ))}
            <ButtonDefaultRounded>등록하기</ButtonDefaultRounded>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

export default withLoginCheck(BoardsManager);

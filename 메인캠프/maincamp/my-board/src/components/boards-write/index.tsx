// 등록하기, 수정하기 컴포넌트
'use client';

import { useParams, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useBoardWrite } from './hooks';
import { IBoardWrite } from './types';

export default function BoardWrite(props: IBoardWrite) {
  const router = useRouter();
  const params = useParams();
  const {
    handleChangeUser,
    handleChangePw,
    handleChangeTitle,
    handleChangeContent,
    openUploadImg,
    updateFunc,
    registerFunc,
    isActive,
    error,
  } = useBoardWrite(props);

  return (
    <form
      className="container"
      id="contentContainer"
      onSubmit={props.isEdit ? updateFunc : registerFunc}
    >
      <p className="font-semibold text-xl">
        {props.isEdit ? '게시글 수정' : '게시글 등록'}
      </p>

      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            작성자<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={handleChangeUser}
              defaultValue={
                props.isEdit ? props.data?.fetchBoard?.writer ?? '' : ''
              }
              disabled={props.isEdit ? true : false}
            />
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="user"
            >
              {error}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            비밀번호<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleChangePw}
              // 나중엔 못고치게
              defaultValue={props.isEdit ? '******' : ''}
              disabled={props.isEdit ? true : false}
            />
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="password"
            >
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            제목<span className="text-red-500"> *</span>
          </p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={handleChangeTitle}
              defaultValue={props.data?.fetchBoard?.title}
            />
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="title"
            >
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">
            내용<span className="text-red-500"> *</span>
          </p>
          <div>
            <textarea
              className={styles.textareaCSS}
              placeholder="내용을 입력해주세요."
              //이렇게 해야 숫자로 전달함
              rows={8}
              onChange={handleChangeContent}
              defaultValue={props.data?.fetchBoard?.contents}
            ></textarea>
            <div
              className="hidden text-red-500 text-[0.7rem] leading-6"
              data-field="content"
            >
              {error}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">주소</p>
          <div className="flex gap-2">
            <input
              className={`w-1/5 ${styles.inputCSS} `}
              type="text"
              placeholder="01234"
            />
            <button className="flex h-12 items-center gap-2 py-3 px-4 border border-solid border-black rounded">
              우편번호 검색
            </button>
          </div>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="주소를 입력해주세요."
            />
          </div>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="text"
              placeholder="상세주소"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full items-center border-b border-solid border-gray-200">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">유튜브 링크</p>
          <div>
            <input
              className={`w-full ${styles.inputCSS} `}
              type="url"
              placeholder="링크를 입력해주세요."
            />
          </div>
        </div>
      </div>
      {/* 추후 추가하기 버튼을 누르면 새 div이 생성되게 */}

      <div className="flex gap-10 w-full items-center">
        <div className="flex flex-col gap-2 mb-5 flex-1">
          <p className="prose-me_16_24">사진 첨부</p>
          <div className="flex gap-3 cursor-pointer">
            <div
              className="flex w-40 h-40 flex-col justify-center items-center gap-2 rounded-md bg-gray-50"
              onClick={() => openUploadImg('fileInput1')}
            >
              <p className={styles.pCSS}>
                <img src="/images/add.svg" alt="추가버튼" />
              </p>
              <span className="prose-r_16_24">클릭해서 사진 업로드</span>
              <input type="file" id="fileInput1" style={{ display: 'none' }} />
            </div>
            <div
              className="flex w-40 h-40 flex-col justify-center items-center gap-2 rounded-md bg-gray-50"
              onClick={() => openUploadImg('fileInput2')}
            >
              <p className={styles.pCSS}>
                <img src="/images/add.svg" alt="추가버튼" />
              </p>
              <span className="prose-r_16_24">클릭해서 사진 업로드</span>
              <input type="file" id="fileInput2" style={{ display: 'none' }} />
            </div>
            <div
              className="flex w-40 h-40 flex-col justify-center items-center gap-2 rounded-md bg-gray-50"
              onClick={() => openUploadImg('fileInput3')}
            >
              <p className={styles.pCSS}>
                <img src="/images/add.svg" alt="추가버튼" />
              </p>
              <span className="prose-r_16_24">클릭해서 사진 업로드</span>
              <input type="file" id="fileInput3" style={{ display: 'none' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end items-center self-stretch">
        <button
          type="button"
          onClick={() => router.push(`/boards/${params.boardId}`)}
          className="flex h-12 px-4 py-3 items-center gap-2 rounded-md border border-black bg-white text-black"
        >
          취소
        </button>
        <button
          className="flex h-12 px-4 py-3 items-center gap-2 rounded-md border border-black bg-gray-500 text-black"
          disabled={!isActive}
          style={{
            background: isActive ? '#2974e5' : 'gray',
            color: isActive ? 'white' : 'black',
          }}
        >
          {props.isEdit ? '수정하기' : '등록하기'}
        </button>
      </div>
    </form>
  );
}

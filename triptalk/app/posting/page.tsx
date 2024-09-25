'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import styles from './postingForm.module.css';
import FormComponent from '../FormComponent';

export default function PostingForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const [errorMessage, setErrorMessage] = useState('');


  const handleFileChange = (index: number, file: File | null) => {
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !title || !content) {
      setErrorMessage('필수 입력사항을 입력하지 않았습니다');
      return;
    }
    console.log({ username, password, title, content, address, youtubeLink, files });
    // makePost({ username, password, title, content, address, youtubeLink, files });
    // redirect(`/post/${id}`);
  };

  return (
    // <div className={styles.container}>
    //   <h1>게시물 등록</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className={styles.formRow}>
    //       <div className={styles.formGroup}>
    //         <label htmlFor="username">작성자 *</label>
    //         <input
    //           type="text"
    //           id="username"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className={styles.formGroup}>
    //         <label htmlFor="password">비밀번호 *</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label htmlFor="title">제목 *</label>
    //       <input
    //         type="text"
    //         id="title"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         required
    //       />
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label htmlFor="content">내용 *</label>
    //       <textarea
    //         id="content"
    //         value={content}
    //         onChange={(e) => setContent(e.target.value)}
    //         required
    //       />
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label htmlFor="address">주소</label>
    //       <div className={styles.addressRow}>
    //         <input type="text" id="zip" placeholder="01234" />
    //         <button type="button">우편번호 검색</button>
    //       </div>
    //       <input
    //         type="text"
    //         placeholder="주소를 입력해 주세요."
    //         value={address}
    //         onChange={(e) => setAddress(e.target.value)}
    //       />
    //       <input type="text" placeholder="상세주소" />
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label htmlFor="youtube-link">유튜브 링크</label>
    //       <input
    //         type="url"
    //         id="youtube-link"
    //         value={youtubeLink}
    //         onChange={(e) => setYoutubeLink(e.target.value)}
    //         placeholder="링크를 입력해 주세요."
    //       />
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label>사진 첨부</label>
    //       <div className={styles.imageUpload}>
    //         {files.map((file, index) => (
    //           <div key={index} className={styles.fileUploadBox}>
    //             <label htmlFor={`file-${index}`}>
    //               클릭해서 사진 업로드
    //               <input
    //                 type="file"
    //                 id={`file-${index}`}
    //                 accept="image/*"
    //                 onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
    //               />
    //             </label>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

    //     <div className={styles.formActions}>
    //       <button type="button" className={styles.cancelButton}>취소</button>
    //       <button type="submit" className={styles.submitButton}>등록하기</button>
    //     </div>
    //   </form>
    // </div>
    <FormComponent />
  );
}

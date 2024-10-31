'use client';

import React from 'react';
import PostsForm from '@/app/_component/boardForm/PostsForm';
import s from './BoardsNew.module.css';
import WithLoginPage from '@/app/_HOC/WithLoginPage';

export default WithLoginPage(function BoardsNew() {
  return (
    <>
      <div className={s.mainContainer}>
        <h2 className={s.title}>게시물 등록</h2>
        <PostsForm type="ADD" />
      </div>
    </>
  );
});

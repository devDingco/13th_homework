import React from 'react';
import PostsForm from '../../_component/boardForm/PostsForm';
import s from './BoardsNew.module.css';

const BoardsNew = () => {
  return (
    <>
      <div className={s.mainContainer}>
        <h2 className={s.title}>게시물 등록</h2>
        <PostsForm type="ADD" />
      </div>
    </>
  );
};

export default BoardsNew;

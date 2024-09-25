import React from 'react';
import AddPostsForm from '../../_component/addPost/AddPostsForm';
import s from './BoardsNew.module.css';

const BoardsNew = () => {
  return (
    <>
      <div className={s.mainContainer}>
        <h2 className={s.title}>게시물 등록</h2>
        <AddPostsForm />
      </div>
    </>
  );
};

export default BoardsNew;

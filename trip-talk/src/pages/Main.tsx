import React from 'react';
import AddPostsForm from '../component/addPost/AddPostsForm';
import s from './MainContainer.module.css';

const Main = () => {
  return (
    <>
      <div className={s.mainContainer}>
        <h2 className={s.title}>게시물 등록</h2>
        <AddPostsForm />
      </div>
    </>
  );
};

export default Main;

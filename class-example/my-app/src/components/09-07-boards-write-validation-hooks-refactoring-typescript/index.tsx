'use client'

import { useBoardsWrite } from "./hooks";
import { IBoardWriteprops } from "./types";



export default function BoardsWrite(props: IBoardWriteprops) {
  const {onChangeWiter, onChangeTitle, onChangeContent, onClickSubmit, onClickUpdate} = useBoardsWrite()


    return ( 
        <>
          작성자: <input type='text' onChange={onChangeWiter} defaultValue={props.data ?. fetchBoard?.writer ?? ""}/> <br/>
          제목: <input type='text' onChange={onChangeTitle} defaultValue={props.data ?. fetchBoard?.title ?? ""}/> <br/>
          내용: <input type='text' onChange={onChangeContent} defaultValue={props.data ?. fetchBoard?.contents ?? ""}/> <br/>
          <button onClick={props.isEdit ? onClickUpdate : onClickSubmit}>
            {props.isEdit ? "수정" : "등록"}하기
        </button> 
        </>
      );

}
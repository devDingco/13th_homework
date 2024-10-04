'use client';
import BoardsCommonPage from 'components/boards-write/page';
import { useParams } from 'next/navigation';

export interface BoardData {
  _id : string
  writer : string
  title : string 
  contents : string 
  youtubeUrl : string
  likeCount : number 
  dislikeCount : number 
  images : ImageData
  user : {
    _id : string 
    email : string 
    name : string 
    picture : ImageData 
  }
  createdAt : Date
  updatedAt : Date
  deletedAt : Date
}

export default function BoardsNewPage() {
  const params = useParams();
  console.dir(params);
  return <BoardsCommonPage mode="edit" id={Array.isArray(params.boardId) ? params.boardId[0] : params.boardId}></BoardsCommonPage>;
}

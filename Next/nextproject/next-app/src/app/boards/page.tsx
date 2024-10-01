"use client"
import React from 'react'
import styles from './style.module.css'
// import List from '../component/commons/ListInput';
import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';


const FetchBoard = gql`
  query fetchBoard($myboardId: ID!) {
    fetchBoard(boardId: $myboardId) {
      writer
      title
      contents
      createdAt
    }
  }
`;

interface Props {
    name: string,
    title: string,
}

function List({title, name} : Props) {
    return (
        <>
        <div className={styles.css_yourboard}>
            <div className={styles.css_boardnum}></div>
            <div className={styles.css_boardtitle}>{title}</div>
            <div className={styles.css_boardwriter}>{name}</div>
            <div className={styles.css_boarddate}></div>
        </div>
        </>
    )
}

export default function ListPage() {
    const params = useParams();
    const { data } = useQuery(FetchBoard, {
        variables: {
        myboardId: params.boardId,
        },
    });
    console.log(data)
    const t = data?.fetchBoard.title
    console.log(t)
    return (
        <>
        <div className={styles.css_listlayout}>
            <div className={styles.css_listmain}>
                <div className={styles.css_main}>
                    <div className={styles.css_all}>
                        <div className={styles.css_listheader}>
                            <div className={styles.css_number}>번호</div>
                            <div className={styles.css_listtitle}>제목</div>
                            <div className={styles.css_listwriter}>작성자</div>
                            <div className={styles.css_listdate}>날짜</div>
                        </div>
                        <div className={styles.css_listall}>
                            {/* <div className={styles.css_yourboard}>
                                <List title={data?.fetchBoard?.title}  name={data?.fetchBoard?.writer}/>
                                <div className={styles.css_boardnum}>1</div>
                                <div className={styles.css_boardtitle}>1</div>
                                <div className={styles.css_boardwriter}>{data?.fetchBoard?.writer}</div>
                                <div className={styles.css_boarddate}>1</div>
                            </div> */}
                            <List title={data?.fetchBoard?.title}  name={data?.fetchBoard?.writer}/>

                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </>
    )
}

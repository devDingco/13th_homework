"use client";

import React from 'react';
import styles from './style.module.css';
import Image from 'next/image'
import { gql, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';


const FetchBoard = gql`
  query fetchBoard($myboardId: ID!) {
    fetchBoard(boardId: $myboardId) {
      writer
      title
      contents
      createdAt
      _id
    }
  }
`;



export default function BoardsDetail () {
    const params = useParams();
    const router = useRouter();
    

    
    const { data } = useQuery(FetchBoard, {
        variables: {
          myboardId: params.boardId,
        },
      });

    const onModify = () => {
        router.push(`${data?.fetchBoard._id}/edit`)
        
        
    }
    return (
        <div className={styles.css_layout}>
            <div className={styles.css_header}>{data?.fetchBoard.title}</div>                   
                <div className={styles.css_info}>
                    <div className={styles.css_user}>
                        
                            <Image src='/assets/Profile.png' width={0} height={0} sizes='100vw' alt='profile' className={styles.css_profileimage} />                            
                            <div className={styles.css_name}>{data?.fetchBoard?.writer}
                        </div>
                        <div className={styles.css_date}>{data?.fetchBoard?.createdAt.split("T")[0]}</div>
                    </div>
                    <div className={styles.css_detailhr}></div>
                    <div className={styles.css_side}>
                        <div className={styles.css_sidebutton}>
                            <div className={styles.css_clip}>
                                <Image src='/assets/Clip.png' width={0} height={0} sizes='100vw' alt='clip' className={styles.css_clip} />
                            </div>
                            <div className={styles.css_location}>
                                <Image src='/assets/Location.png' width={0} height={0} sizes='100vw' alt='location' className={styles.css_location} />
                            </div>
                        </div>
                    </div>
                </div>
            <div>
                <div className={styles.css_image}>
                    <Image src='/assets/MainImage.png' width={0} height={0} sizes='100vw' alt='mainimage' className={styles.css_image} />
                </div>
            </div>
                <div className={styles.css_text}>
                    {data?.fetchBoard?.contents}                  
                </div>
                <div className={styles.css_bottomimage}>
                    <Image src='/assets/BottomImage.png' width={0} height={0} sizes='100vw' alt='bottomimage' className={styles.css_bottomimageImage} />
                </div>
            <div className={styles.css_heart}>
                <div className={styles.css_hate}>
                <Image src='/assets/Hate.png' width={0} height={0} sizes='100vw' alt='hate' className={styles.css_hate} /><span>24</span>
                </div>
                <div className={styles.css_like}>
                    <Image src='/assets/Like.png' width={0} height={0} sizes='100vw' alt='like' className={styles.css_like} /> <span>12</span>
                </div>
            </div>
                <div className={styles.css_detailbutton}>
                    <button className={styles.css_list}>
                        <Image src='/assets/List.png' width={0} height={0} sizes='100vw' alt='list' className={styles.css_listimage} />
                    </button>
                    <button className={styles.css_modify} >
                    <Image src='/assets/Modify.png' width={0} height={0} sizes='100vw' alt='modify' className={styles.css_modifyimage} onClick={onModify}/>
                    </button>
                </div>
        </div>
    )
}

'use client';

import styles from './styles.module.css';
import Image from 'next/image';
import useBoardList from './hook';
import { Board } from '@/commons/graphql/graphql';
import BoardBanner from '../banner';

const IMAGE_SRC = {
  deleteImage: {
    src: require('@/assets/delete.png'),
    alt: '삭제버튼',
  },
};

export default function BoardList() {
  const { data, hoveredId, setHoveredId, onClickDelete, onClickDetail } =
    useBoardList();

  return (
    <>
      <BoardBanner />
      <div className={styles.boardBody}>
        <div className={styles.boardFrame}>
          <div className={styles.boardInnerBody}>
            <div className={styles.boardHeader}>
              <div className={styles.headerNumber}>번호</div>
              <div className={styles.headerTitle}>제목</div>
              <div className={styles.headerWriter}>작성자</div>
              <div className={styles.headerDate}>날짜</div>
              <button className={styles.hidden}>
                <Image
                  src={IMAGE_SRC.deleteImage.src}
                  alt={IMAGE_SRC.deleteImage.alt}
                />
              </button>
            </div>
            <div className={styles.contentBody}>
              {data?.fetchBoards.map((el: Board, index: number) => (
                <button
                  onMouseEnter={() => setHoveredId(el._id)}
                  onMouseLeave={() => setHoveredId('')}
                  onClick={(event) => onClickDetail(event, el?._id)}
                  key={el._id}
                  className={styles.contentContainer}
                >
                  <div className={styles.contentNumber}>{index + 1}</div>
                  <div className={styles.contentTitle}>{el.title}</div>
                  <div className={styles.contentWriter}>{el.writer}</div>
                  <div className={styles.contentDate}>
                    {el.createdAt.split('T')[0].replace(/-/g, '.')}
                  </div>
                  <div>
                    <span
                      onClick={onClickDelete}
                      className={
                        hoveredId === el._id ? styles.showButton : styles.hidden
                      }
                    >
                      <Image
                        src={IMAGE_SRC.deleteImage.src}
                        alt={IMAGE_SRC.deleteImage.alt}
                      />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

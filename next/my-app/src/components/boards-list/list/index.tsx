'use client';

import Image from 'next/image';
import useBoardList from './hooks';
import styles from './styles.module.css';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_BOARDS_COUNT } from './queries';
import useSearch from '../search/hooks';
import _ from 'lodash';

export default function BoardsComponentList() {
    const { data, refetch, onClickMoveToDetailPage, onClickDelete } =
        useBoardList();

    const [keyWord, setkeyWord] = useState('');
    const [startPage, setStartPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

    const onClickPage = (event) => {
        const selectedPage = Number(event?.currentTarget.id);
        refetch({ mypage: Number(event?.currentTarget.id) });
        setCurrentPage(selectedPage);
        console.log(event.currentTarget.id);
    };

    const onClickPrevPage = () => {
        if (startPage === 1) return; // 1페이지가 아니면 중지해줘

        setStartPage(startPage - 10);
        refetch({ mypage: startPage - 10 }); // 넘어간 그 페치로 리패치해줘
    };

    const onClickNextPage = () => {
        // 1. 마지막페이지 구하기 (백엔드에 요청해봐야지~ 프론트가 어떻게 알어 count API따로 있음)
        // 2. 마지막페이지에 의존해서 다음페이지 구현하기

        if (startPage + 10 <= lastPage) {
            setStartPage(startPage + 10);
            refetch({ mypage: startPage + 10 }); // 넘어간 그 페치로 리패치해줘
        }
    };

    const getDebounce = _.debounce((매개변수) => {
        refetch({ mysearch: 매개변수, mypage: 1 });
        setkeyWord(매개변수);
    }, 500);

    const onChangeSearch = (event) => {
        getDebounce(event.target.value);
        console.log(event.target.value);
    };

    return (
        <>
            <div className={styles.layout_list_searchBox}>
                <h1 className={styles.trip_talk_title}>트립토크 게시판</h1>
                <div className={styles.searchBox}>
                    <input
                        className={styles.dateInput}
                        type="text"
                        placeholder="YYYY.MM.DD - YYYY.MM.DD"
                    />
                    <input
                        className={styles.titleSearch}
                        type="text"
                        placeholder="제목을 검색해 주세요"
                        onChange={onChangeSearch}
                    />
                    <button className={styles.searchBoxSearch}>검색</button>
                    <button className={styles.searchBoxTripTalk}>
                        <Image
                            src="/images/write.png"
                            alt="write"
                            width={24}
                            height={24}
                        ></Image>
                        트립토크 등록
                    </button>
                </div>
            </div>

            <div className={styles.layout_list}>
                <div className={styles.titleBox}>
                    <div className={styles.titleBoxNumber}>번호</div>
                    <div className={styles.titleBoxTitle}>제목</div>
                    <div className={styles.titleBoxWrite}>작성자</div>
                    <div className={styles.titleBoxDate}>날짜</div>
                </div>

                {data?.fetchBoards.length > 0 ? (
                    data.fetchBoards.map((el: any, index: any) => (
                        <button
                            className={styles.boardListBox}
                            key={el._id}
                            id={el._id}
                            onClick={onClickMoveToDetailPage}
                        >
                            <div className={styles.titleBoxNumber}>
                                {index + 1}
                            </div>
                            <div className={styles.titleBoxTitle}>
                                {el.title
                                    .replaceAll(keyWord, `@#$${keyWord}@#$`)
                                    .split('@#$')
                                    .map((el, index) => (
                                        <span
                                            key={`${el}_${index}`}
                                            style={{
                                                color:
                                                    el === keyWord
                                                        ? 'orange'
                                                        : 'black',
                                            }}
                                        >
                                            {el}
                                        </span>
                                    ))}
                            </div>
                            <div className={styles.titleBoxWrite}>
                                {el.writer}
                            </div>

                            <button
                                className={styles.titleBoxDate}
                                onClick={onClickDelete}
                            >
                                <Image
                                    src="/images/delete.png"
                                    alt="deleteImage"
                                    width={24}
                                    height={24}
                                    id={el._id}
                                    onClick={onClickDelete}
                                ></Image>
                            </button>
                        </button>
                    ))
                ) : (
                    <div>!게시글이 없당!</div>
                )}

                <div className={styles.paginationBox}>
                    <span onClick={onClickPrevPage}>{`<`} 이전페이지</span>
                    {new Array(10).fill('철수').map(
                        (_, index) =>
                            index + startPage <= lastPage && (
                                <span
                                    key={index + startPage}
                                    id={String(index + startPage)}
                                    onClick={onClickPage}
                                    className={`${styles.paginationSpan} ${
                                        currentPage === index + startPage
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    {index + startPage}
                                </span>
                            )
                    )}
                    <span onClick={onClickNextPage}> 다음페이지{`>`}</span>
                </div>
            </div>
        </>
    );
}

'use client';

import styles from './style.module.css';
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import ko from 'date-fns/locale/ko'; 
import 'react-datepicker/dist/react-datepicker.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

const FETCH_BOARDS = gql`
  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String) {
    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search ) {
      _id
      writer
      title
      images
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId) 
  }
`;








const Page = () => {
  const router = useRouter();
  
  // 초기 상태를 30일 전부터 현재까지로 설정
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [dateRange, setDateRange] = useState([thirtyDaysAgo, today]); // 날짜 범위 상태 관리
  const [startDate, endDate] = dateRange;
    console.log("startdate",typeof(startDate), new Date(startDate))

  const updateDateRange = (update) => {
    setDateRange(update);
    console.log(update);
  };


  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      ref={ref}
      className={styles.customInput}
      onClick={onClick}
      value={value}
      readOnly
    />
  ));
  CustomInput.displayName = 'CustomInput';



  const { data } = useQuery(FETCH_BOARDS, {
    variables: {
      endDate: endDate ? endDate.toISOString() : null,
      startDate: startDate ? startDate.toISOString() : null,
      search: "",
      page: 1
    },
  });
  const [deleteBoard] = useMutation(DELETE_BOARD)
    console.log(deleteBoard)

    
    const onClickDelete = (event) => {
        console.log(event.target.id)

        deleteBoard({
            variables: { boardId: event.target.id },
            refetchQueries: [{
              query: FETCH_BOARDS,
              variables: {
                endDate: new Date(endDate).toISOString(),
                startDate: new Date(startDate).toISOString(),
                search: ""
              }
            }],
          });
      };



  return (
    <div>
      <div className={styles.inputContainer}>
        <input className={styles.searchBar} />

        <div className={styles.datePickerContainer}>
          <DatePicker
            showIcon
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={updateDateRange}
            locale={ko}
            customInput={<CustomInput />}
            placeholderText="날짜를 선택하세요"
          />
        </div>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.list}>
          {data?.fetchBoards.map((el, index) => (
            <div key={el._id}>
              <div className={styles.listOfWriing}>
                <div className={styles.box1}>
                  <div className={styles.dateContainer}>
                    <div className={styles.listNum}>{index +1}</div> 
                    <div className={styles.date}>{el.createdAt}</div>
                  </div>
                </div>
                <div>
                  <div className={styles.titleContainer}>
                    <div 
                      className={styles.title} 
                      onClick={() => router.push(`/boards/${el._id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {el.title} {el._id}
                    </div>
                    <Image src='/image/add.png' className={styles.trashIcon} alt='휴지통' width={24} height={24} onClick={onClickDelete} id={el._id} />
                  </div>
                  <span className={styles.authorName}><br/> - {el.writer}</span>
                </div>
                <div>
                  <div className={styles.titleContainer}>
                    <div className={styles.thumbnail}>
                      <Image src='/image/sampleimg3.jpg' width={0} height={0} sizes='100vw' alt='썸네일'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

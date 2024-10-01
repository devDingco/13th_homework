'use client';

import styles from './style.module.css';
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import Image from 'next/image'
import ko from 'date-fns/locale/ko'; 

import 'react-datepicker/dist/react-datepicker.css'




const Page = () => {


  // 커스텀 인풋 컴포넌트 정의
  const CustomInput = forwardRef(({ value, onClick }) => (
    <input
        className={styles.customInput} // CSS 모듈을 사용하여 스타일 적용
        onClick={onClick}   
        value={value}
        readOnly // 읽기 전용으로 설정
    />
    ));

CustomInput.displayName = 'CustomInput'; // 디스플레이 이름 추가

    const [dateRange, setDateRange] = useState([new Date(), new Date()]); // 날짜 범위 상태 관리
    const [startDate, endDate] = dateRange;

    // 날짜 범위를 설정하는 함수
    const updateDateRange = (update) => {
        setDateRange(update);
        console.log(update)
    };

    

  return (
    <div>

        <div className={styles.inputContainer}>
            <input className={styles.searchBar}/>

            <div className={styles.datePickerContainer}>
                 <span className={styles.inputImage}>📅</span>
            
                 <DatePicker
                 showIcon
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={updateDateRange}
                locale={ko} // 한국어 설정
                customInput={<CustomInput />} // 커스텀 인풋 전달
                placeholderText="날짜를 선택하세요" // 플레이스홀더 텍스트
            />

            </div>


            
        </div>





      
        <div className={styles.listContainer}>
            <div className={styles.list}>
                <div className={styles.listOfWriing}>
                    <div className={styles.box1}>
                        <div className={styles.dateContainer}>
                            <div className={styles.listNum}>103</div> 
                            <div className={styles.date}>24.09.20</div> 
                        </div>
                    </div>
                    <div>
                        <div className={styles.titleContainer}>
                            <div className={styles.title}>
                                블로그 게시물 제목입니다 블로그 게시물 제목입니다 블로그 게시물 제목입니다.
                                <span className={styles.authorName}><br/> - 홍길동</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.titleContainer}>
                            <div className={styles.thumbnail}>
                                <Image src='/image/sampleimg3.jpg' width={0} height={0} sizes='100vw' alt='썸네일'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.listOfWriing}>
                    <div className={styles.box1}>
                        <div className={styles.dateContainer}>
                        <div className={styles.listNum}>103</div> 
                        <div className={styles.date}>24.09.20</div> 
                        </div>
                    </div>
                    <div>
                        <div className={styles.titleContainer}>
                            <div className={styles.title}>
                                블로그 게시물 제목입니다 블로그 게시물 제목입니다 블로그 게시물 제목입니다.
                                <span className={styles.authorName}><br/> - 홍길동</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.titleContainer}>
                            <div className={styles.thumbnail}>
                                <Image src='/image/sampleimg3.jpg' width={0} height={0} sizes='100vw' alt='썸네일'/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.listOfWriing}>
                    <div className={styles.box1}>
                        <div className={styles.dateContainer}>
                        <div className={styles.listNum}>103</div> 
                        <div className={styles.date}>24.09.20</div> 
                        </div>
                    </div>
                    <div className='Box2'>
                        <div className={styles.titleContainer}>
                            <div className={styles.title}>
                                블로그 게시물 제목입니다 블로그 게시물 제목입니다 블로그 게시물 제목입니다.
                                <span className={styles.authorName}><br/> - 홍길동</span>
                            </div>
                        </div>
                    </div>
                    <div className='Box3'>
                        <div className={styles.titleContainer}>
                            <div className={styles.thumbnail}>
                                <Image src='/image/sampleimg3.jpg' width={0} height={0} sizes='100vw' alt='썸네일'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.listOfWriing}>
                    <div className={styles.box1}>
                        <div className={styles.dateContainer}>
                        <div className={styles.listNum}>103</div> 
                        <div className={styles.date}>24.09.20</div> 
                        </div>
                    </div>
                    <div className='Box2'>
                        <div className={styles.titleContainer}>
                            <div className={styles.title}>
                                블로그 게시물 제목입니다 블로그 게시물 제목입니다 블로그 게시물 제목입니다.
                                <span className={styles.authorName}><br/> - 홍길동</span>
                            </div>
                        </div>
                    </div>
                    <div className='Box3'>
                        <div className={styles.titleContainer}>
                            <div className={styles.thumbnail}>
                                <Image src='/image/sampleimg3.jpg' width={0} height={0} sizes='100vw' alt='썸네일'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>









        </div>






    </div>
  )
}

export default Page

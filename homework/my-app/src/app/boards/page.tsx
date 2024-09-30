'use client';

import styles from './style.module.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Image from 'next/image'





const Page = () => {


    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());



  return (
    <div>

        <div className={styles.inputContainer}>
            <input className={styles.searchBar}/>

            <div className={styles.datePickerContainer}>
            <span className={styles.calendarIcon}>📅</span>
            
            <DatePicker
            swapRange={true}
            dateFormat='yyyy.MM.dd' // 날짜 형태
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            />
            </div>


            
        </div>





      
        <div className={styles.listContainer}>
            <div className={styles.list}>
                <div className={styles.listOfWriing}>
                    <div className={styles.box1}>
                        <div className={styles.dateContainer}>
                            <div className={styles.month}>2024</div> 
                            <div className={styles.date}>09.20</div>
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
                            <div className={styles.month}>2024</div> 
                            <div className={styles.date}>09.20</div>
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
                            <div className={styles.month}>2024</div> 
                            <div className={styles.date}>09.20</div>
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
                            <div className={styles.month}>2024</div> 
                            <div className={styles.date}>09.20</div>
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

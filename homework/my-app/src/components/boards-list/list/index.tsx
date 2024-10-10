"use client";
import useBoardList from "./hooks";

import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { IBoardListprops } from "./types";
import { useRouter } from "next/navigation";

export default function BoardList(props: IBoardListprops) {
  const { updateDateRange, onClickDelete, startDate, endDate, data } =
    useBoardList();
  const router = useRouter();

  // CustomInput을 정의하고 displayName 설정
  const CustomInput = ({
    value,
    onClick,
  }: {
    value?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
  }) => (
    <input
      className={styles.customInput}
      onClick={onClick}
      value={value || ""}
      readOnly
    />
  );
  CustomInput.displayName = "CustomInput";

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
            customInput={<CustomInput />}
            placeholderText="날짜를 선택하세요"
          />
        </div>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.list}>
          {data?.fetchBoards?.map((el, index) => (
            <div key={el._id} onClick={() => router.push(`/boards/${el._id}`)}>
              <div className={styles.listOfWriing}>
                <div className={styles.box1}>
                  <div className={styles.dateContainer}>
                    <div className={styles.listNum}>{index + 1}</div>
                    <div className={styles.date}>{el.createdAt}</div>
                  </div>
                </div>
                <div>
                  <div className={styles.titleContainer}>
                    <div className={styles.title} style={{ cursor: "pointer" }}>
                      {el.title} {el._id}
                    </div>
                    <Image
                      src="/image/add.png"
                      className={styles.trashIcon}
                      alt="휴지통"
                      width={24}
                      height={24}
                      onClick={(e) => {
                        e.stopPropagation(); // 부모로의 이벤트 전파를 막음
                        onClickDelete(e); // onClickDelete 호출
                      }}
                      id={el._id}
                    />
                  </div>
                  <span className={styles.authorName}>
                    <br /> - {el.writer}
                  </span>
                </div>
                <div>
                  <div className={styles.titleContainer}>
                    <div className={styles.thumbnail}>
                      <Image
                        src="/image/sampleimg3.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="썸네일"
                      />
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
}

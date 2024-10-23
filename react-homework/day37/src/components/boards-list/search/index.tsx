import { DatePicker } from "antd";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useBoardsListSearch from "./hook";
import { IBoardsListSearchProps } from "./types";

dayjs.extend(customParseFormat);
const now = dayjs();
const dateFormat = "YYYY.MM.DD";
const { RangePicker } = DatePicker;

const BoardsListSearch: React.FC<IBoardsListSearchProps> = (
  props: IBoardsListSearchProps
) => {
  const { onChangeDate, onChangeSearch } = useBoardsListSearch(props);
  return (
    <div className={styles.search_group}>
      <div className={styles.search_area}>
        <RangePicker
          className={styles.date_picker}
          defaultValue={[dayjs(now, dateFormat), dayjs(now, dateFormat)]}
          disabled={[false, false]}
          onChange={onChangeDate}
        />

        <div className={styles.search_bar_box}>
          <Image
            src="/images/search.png"
            width={24}
            height={24}
            alt="돋보기"
            className={styles.search_icon}
          />
          <input
            type="text"
            className={styles.search_bar}
            placeholder="제목을 검색해 주세요."
            onChange={onChangeSearch}
          />
        </div>
        <button className={styles.search_button}>검색</button>
      </div>
      <Link href="/boards/new" className={styles.board_button}>
        <Image
          src="/images/left_icon-3.png"
          width={24}
          height={24}
          alt="등록아이콘"
        />
        트립토크 등록
      </Link>
    </div>
  );
};

export default BoardsListSearch;

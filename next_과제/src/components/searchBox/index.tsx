import Icon from "@/components/iconFactory";
import styles from "./index.module.scss";

export default function SearchBox() {
  return (
    <div className="flex gap-4 flex-wrap max-sm:w-full">
      <label className="input input-bordered flex flex-wrap items-center gap-2 w-[682px] max-sm:w-full">
        <span className="w-6 h-6 inline-block">
          <Icon icon="search" />
        </span>
        <input
          type="text"
          className="grow"
          placeholder="제목을 검색해 주세요"
        />
      </label>
      <div className="flex gap-4 flex-wrap max-sm:w-full">
        <label className="input input-bordered flex items-center gap-2 w-72 max-sm:w-full">
          <Icon icon="calendar" className="w-6 h-6 fill-accent-content" />
          <input
            className={styles.inputDate}
            type="date"
            placeholder="YYYY.MM.DD - YYYY.MM.DD"
            required
          />
        </label>
        <button className="btn btn-accent-content max-sm:w-full">검색</button>
      </div>
    </div>
  );
}

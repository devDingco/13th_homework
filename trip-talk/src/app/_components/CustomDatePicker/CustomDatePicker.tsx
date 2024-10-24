import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import styles from "./styles.module.css";
import { CalendarOutlined } from "@ant-design/icons";

export default function CustomDatePicker() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <div className={styles.calendar}>
      <CalendarOutlined className={styles.date_icon} />
      <DatePicker
        className={styles.date_picker}
        selectsRange={true}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        placeholderText="YYYY.MM.DD - YYYY.MM.DD"
        dateFormat="yyyy.MM.dd"
        onChange={(update) => {
          setDateRange(update);
        }}
      />
    </div>
  );
}

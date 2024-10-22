import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import locale from "antd/locale/ko_KR"; // antd 한국어 locale 추가
import { ConfigProvider } from "antd"; // ConfigProvider 추가

import "./UserDatePicker.css";
import Image from "next/image";

dayjs.locale("ko");

const { RangePicker } = DatePicker;
const dateFormat = "YYYY.MM.DD";

export default function UserDatePicker() {
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        components: {
          DatePicker: {
            activeBg: "#f2f2f2",
          },
        },
      }}
    >
      <div className="h-12 p-3 bg-[#f2f2f2] rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="w-6 h-6 relative">
          <Image
            src="/images/icons/calendar.svg"
            alt="calenderIcon"
            width={24}
            height={24}
          />
        </div>
        <RangePicker
          className="custom-range-picker"
          format={dateFormat}
          placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
          separator="-"
          suffixIcon={null}
        />
      </div>
    </ConfigProvider>
  );
}

import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

export default function UserDatePicker() {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        defaultValue={[
          dayjs("2015/01/01", dateFormat),
          dayjs("2015/01/01", dateFormat),
        ]}
        format={dateFormat}
      />
    </Space>
  );
}

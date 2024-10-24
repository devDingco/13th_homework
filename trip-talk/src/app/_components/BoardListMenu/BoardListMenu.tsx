import useBoardListMenu from "../../../commons/hooks/useBoardListMenu";
import Input from "../Input/Input";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function BoardListMenu() {
  // const { onChangeSearch } = useBoardListMenu();
  return (
    <div className={styles.menu_wrapper}>
      <CustomDatePicker />
      <div className={styles.search_wrapper}>
        <SearchOutlined className={styles.search_icon} />
        <Input id="text" required={false} />
      </div>
    </div>
  );
}

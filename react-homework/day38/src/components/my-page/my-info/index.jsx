import Image from "next/image";
import styles from "./styles.module.css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
export default function MyInfo() {
  return (
    <div className={styles.my_info_box}>
      <div className={styles.my_info_left_box}>
        <div className={styles.my_info_title}>내 정보</div>
        <div className={styles.my_profile_box}>
          <Image
            src="/images/basic_profile.png"
            width={40}
            height={40}
            alt="나의프로필"
          />
          <div>김민서</div>
        </div>
        <div className={styles.my_point}>
          <Image
            src="/images/point.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="포인트 이미지"
            className={styles.point_image}
          />
          <span className={styles.point_num}>23,000</span>
          <span className={styles.p}>P</span>
        </div>
      </div>
      <div className={styles.my_info_right_box}>
        <div>
          거래내역&북마크
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </div>
        <div>
          포인트 사용 내역
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </div>
        <div>
          비밀번호 변경
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

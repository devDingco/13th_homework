// 지도 보기를 클릭할 경우 나오는 식은 구현 못함
// 헤더까지 이미지가 침범해야하는데 잘 모르겠음

import {
  CaretDownOutlined,
  EditOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import Image from "next/image";
import styles from "./styles.module.css";

export default function SolplaceLogsDetail() {
  return (
    <main className={styles.main}>
      <section className={styles.topSection}>
        <Image
          className={styles.img}
          src="/detailSampleImg/img-1.png"
          alt="External image"
          width={1000}
          height={0}
        />
        <Image
          className={styles.img}
          src="/detailSampleImg/img-2.png"
          alt="External image"
          width={1000}
          height={0}
        />
        <Image
          className={styles.img}
          src="/detailSampleImg/img-3.png"
          alt="External image"
          width={1000}
          height={0}
        />
      </section>
      <section className={styles.bottomSection}>
        <header className={styles.header}>
          <div className={styles.titleAndEdit}>
            <span>Bramble & Brioche 한남점</span>
            <EditOutlined />
          </div>

          <div className={styles.adressShowMap}>
            <div className={styles.adress}>
              <EnvironmentOutlined />
              <span> 서울특별시 용산구 이태원로49길 24-14</span>
            </div>
            <div className={styles.showMap}>
              <span>지도 보기 </span>
              <CaretDownOutlined />
            </div>
          </div>
        </header>
        <div className={styles.underLine}></div>

        <div className={styles.contents}>
          Bramble & Brioche는 하루를 천천히 시작하고 싶은 사람들을 위한 아늑한
          브런치 카페예요. 바쁜 일상에서 잠깐 벗어나, 따뜻한 공간에서 여유를
          느끼고 싶다면 이곳이 제격이에요.
        </div>
      </section>
    </main>
  );
}

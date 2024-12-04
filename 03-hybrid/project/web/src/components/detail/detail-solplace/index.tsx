"use client";

import React, { useState } from "react";
import Image from "next/image";
import Divider from "@/components/divider";
import KakaoMap from "@/components/kakaoMap";
import styles from "./styles.module.css";
import LocationDescription from "@/components/locationDescription";
import TitleContainer from "@/components/titleContainer";
import useSampleDataStore from "@/app/test/test-store";
import { useParams, useRouter } from "next/navigation";

export default function DetailSolplace() {
  const { solplaceLogId } = useParams();
  const router = useRouter();
  const [shownMap, setShownMap] = useState(false);
  const { data } = useSampleDataStore();

  const onClickMap = () => {
    setShownMap((prev) => !prev);
  };

  const onClickEdit = () => {
    router.push(`/solplace-logs/${solplaceLogId}/edit`);
  };
  return (
    <div className={styles.detail}>
      <Image
        src={data.images[0]}
        alt="메인 이미지"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <div className={styles.main_area__wrapper}>
        <div className={styles.main__area}>
          <TitleContainer title={data.name} onClickEdit={onClickEdit} />
          <LocationDescription onClick={onClickMap} />
          {shownMap && <KakaoMap />}
        </div>
        <Divider />
        <div>{data.contents}</div>
      </div>
    </div>
  );
}

import React, { ChangeEvent, MouseEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PreviewImage from "@/components/previewImage";
import UploadImage from "@/components/upload-image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import styles from "./styles.module.css";

interface IFormImageUploadProps {
  images: string[];
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onClickDelete: (
    event: MouseEvent<HTMLButtonElement>,
    deleteUrl: string
  ) => void;
}

export default function FormImageUpload({
  images,
  onChangeFile,
  onClickDelete,
}: IFormImageUploadProps) {
  const { control } = useFormContext();
  return (
    <div>
      <Swiper
        slidesPerView={3.18}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
          type: "custom",
        }}
        modules={[FreeMode, Pagination]}
        className={styles.swiper}
      >
        <SwiperSlide>
          <Controller
            name="images"
            control={control}
            render={() => <UploadImage onChangeFile={onChangeFile} />}
          />
        </SwiperSlide>
        {images.map((el, index) => (
          <SwiperSlide key={index}>
            <PreviewImage src={el} onClickDelete={onClickDelete} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

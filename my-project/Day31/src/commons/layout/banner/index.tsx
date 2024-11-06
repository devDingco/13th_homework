import { Carousel } from "antd";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full h-[516px]">
      <Carousel autoplay>
        <div className="w-screen h-[516px] relative">
          <Image
            src="/img/banner1.svg"
            alt="banner1Img"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-screen h-[516px] relative">
          <Image
            src="/img/banner2.svg"
            alt="banner2Img"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-screen h-[516px] relative">
          <Image
            src="/img/banner3.svg"
            alt="banner3Img"
            fill
            objectFit="cover"
          />
        </div>
      </Carousel>
    </div>
  );
}

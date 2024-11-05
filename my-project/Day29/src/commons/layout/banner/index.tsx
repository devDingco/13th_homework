import { Carousel } from "antd";
import Image from "next/image";

export default function Banner() {
  return (
    <div>
      <Carousel autoplay>
        <div className="w-screen h-[516px]">
          <Image src="/img/banner1" alt="banner1Img" fill objectFit="cover" />
        </div>
        <div className="w-screen h-[516px]">
          <Image src="/img/banner2" alt="banner2Img" fill objectFit="cover" />
        </div>
        <div className="w-screen h-[516px]">
          <Image src="/img/banner3" alt="banner3Img" fill objectFit="cover" />
        </div>
      </Carousel>
    </div>
  );
}

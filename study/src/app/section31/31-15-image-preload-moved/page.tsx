"use client";

import Image from "next/image";

export default function ImagePreloadMovedPage() {
  return (
    <>
      <Image src="/images/dog.jpg" width={100} height={100} alt="" />
    </>
  );
}

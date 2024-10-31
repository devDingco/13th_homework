"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function OpenApisItem() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const myfunction = async () => {
      const result = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await result.json();
      setImageUrl(data.message);
    };
    myfunction();
  }, []);

  return (
    <div>
      <Image src={imageUrl} width={500} height={500} alt="강아지이미지" />
    </div>
  );
}

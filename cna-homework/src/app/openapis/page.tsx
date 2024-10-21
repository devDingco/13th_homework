"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function OpenApiPage() {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const ImageFunction = async () => {
      const result = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await result.json();
      console.log(data);
      
      setImageUrl(data.message);
    };
    ImageFunction();
  }, []);
  return <Image src={imageUrl} width={300} height={300} alt="image"></Image>;
}

"use client";
import { useEffect, useState } from "react";

export default function UseOpenAPI() {
  const [imgUrl, setImgUrl] = useState<any>();
  // const [a, setA] = useState();

  const OpenAPI = async () => {
    const result = await fetch("https://dog.ceo/api/breeds/image/random/5");
    const data = await result.json();
    console.log(data);
    setImgUrl(data.message);
    console.log(data.message);
    // return data;
  };
  console.log();
  useEffect(() => {
    // (async () => {
    //   const res = await OpenAPI();
    //   setImgUrl([res]);
    // })(); //IIFE

    OpenAPI();
  }, []);

  return {
    imgUrl,
    setImgUrl,
  };
}

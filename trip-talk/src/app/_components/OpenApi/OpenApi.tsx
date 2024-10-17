"use client";

import { useEffect, useState } from "react";

export default function OpenApi() {
  const [dog, setDog] = useState("");

  useEffect(() => {
    const onClickSync = async () => {
      const result = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await result.json();
      setDog(data.message);
    };
    onClickSync();
  }, []);

  return <img src={dog} />;
}

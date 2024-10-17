"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function OpenApiWithUseEffectPage() {
  const apiUrl = "https://dog.ceo/api/breeds/image/random/3";

  interface DogApiResponse {
    message: string[];
    status: string;
  }

  const [data, setData] = useState<DogApiResponse | null>(null);

  const dataLoad = async () => {
    const result = await fetch(apiUrl);
    const data = await result.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    dataLoad();
  }, []);

  return (
    <div>
      {data && (
        <ul>
          {data.message.map((item, index) => (
            <li key={index}>
              <Image
                src={item}
                alt="dog"
                width="200"
                height="200"
                style={{ width: "200px", height: "200px" }}
                priority
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

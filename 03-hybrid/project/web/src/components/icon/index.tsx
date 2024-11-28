import Image from "next/image";
import React from "react";

interface IIconProps {
  src: string;
  width?: number;
  height?: number;
}

export default function Icon({ src, width = 1.5, height = 1.5 }: IIconProps) {
  return (
    <Image
      src={`/assets/${src}`}
      alt={`${src} 아이콘`}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    />
  );
}

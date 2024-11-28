import { IIcon } from "@/commons/types/components.type";
import Image from "next/image";

export default function Icon({
  src,
  alt,
  isXTurnaround,
  isYTurnaround,
}: IIcon) {
  return (
    <div
      className={`relative w-6 h-6 ${isXTurnaround && "-scale-x-100"} ${
        isYTurnaround && "-scale-y-100"
      }`}
    >
      <Image src={src} alt={alt} fill />
    </div>
  );
}

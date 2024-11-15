import Image from "next/image";
import { ICustomImage } from "../../../types/components.type";
import styles from "./styles.module.css";

export default function CustomImage({
  image,
  width,
  height,
  objectFit,
}: ICustomImage) {
  return (
    <div className={styles.image}>
      <Image
        src={`/pngs/${image}.png`}
        alt={image}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width,
          height,
          objectFit,
        }}
      />
    </div>
  );
}

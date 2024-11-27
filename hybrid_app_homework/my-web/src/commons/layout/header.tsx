"use client";

import { HEADER_OPTION } from "@/commons/layout/contants";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./styles.module.css";

export default function HeaderGlobal() {
  const pathname = usePathname();
  const option = HEADER_OPTION.GLOBAL[pathname] ?? null;
  const router = useRouter();
  console.log(option);
  return (
    <header
      className={styles.header + (!option ? " " + styles.fixedHeader : "")}
      style={{ padding: "0 1.25rem" }}
    >
      {(option?.hasBack || !option) && (
        <button onClick={() => router.back()}>
          <IoIosArrowBack size={24} />
        </button>
      )}
      {option?.title && <h3 className="font-bold text-lg">{option.title}</h3>}
    </header>
  );
}

import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Footer from "@/commons/layout/footer";
import Image from "next/image";

export default function SolPlaceListPage() {
  return (
    <>
      {/* <div className="flex items-center justify-center text-sm min-h-[80vh] text-center text-[#f5f5f5">
        등록된 플레이스가
        <br /> 없습니다.
      </div> */}

      <div className="grid p-[1.25rem_1.5rem] gap-4 grid-cols-2 w-full">
        {new Array(4).fill(0).map((_, i) => (
          <div className="flex flex-col gap-2">
            <div className="rounded-lg w-full overflow-hidden">
              <Image
                className="object-cover"
                src="/images/sample_01.jpg"
                width={375}
                height={200}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-base leading-[1.5rem] font-bold truncate">
                  Bramble & Brioche 한남점
                </h3>
                <p className="truncate text-[#5f5f5f] text-sm">
                  한국에서 느낄 수 없었던 그런 맛의 맛집
                </p>
              </div>

              <div className="flex gap-2">
                <div className="text-[0.8125rem] leading-5 font-semibold text-[#777] flex items-center gap-1 truncate">
                  <FiMapPin size={14} color="#777" />
                  서울특별시 용산구
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer className="border-t border-[#f2f2f2] p-[0.75rem_0_1.5rem]">
        <Link
          href="/solplace-logs/new"
          className="fixed right-5 bottom-[6.25rem] w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center"
        >
          <IoIosAdd size={40} color="#fff" />
          <div className="blind">새글작성</div>
        </Link>
        <ul className="flex justify-around text-[0.6875rem] items-center">
          <li>
            <Link className="flex flex-col items-center gap-1" href="#">
              <FiMapPin size={20} color="#777" />
              플레이스
            </Link>
          </li>
          <li className="opacity-50">
            <Link className="flex flex-col items-center gap-1" href="#">
              <FaUserAlt size={15} color="#777" />내 설정
            </Link>
          </li>
        </ul>
      </Footer>
    </>
  );
}

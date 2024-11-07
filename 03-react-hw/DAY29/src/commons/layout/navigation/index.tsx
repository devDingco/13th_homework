import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FETCH_USER_LOGGEDIN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      name
    }
  }
`;

export default function Navigation() {
  // const pathname = usePathname();
  const { data } = useQuery(FETCH_USER_LOGGEDIN);
  return (
    <div
      className="w-full py-5 bg-white flex justify-center items-center gap-2.5"
      style={{ padding: "20px 5px", display: "flex", justifyContent: "center" }}
    >
      <div
        className="flex gap-4 w-[1280px] justify-between"
        style={{ width: "1280px" }}
      >
        <Image src={`/images/logo.svg`} alt="logo" width={45} height={45} />
        <Link href="/boards" className="p-2">
          트립토크
        </Link>
        <Link href="/">숙박권 구매</Link>
        <Link href="/mypage">마이페이지</Link>
      </div>
      {!data?.fetchUserLoggedIn._id ? (
        <Link
          href="/login"
          style={{
            backgroundColor: "black",
            padding: "8px",
            color: "white",
            borderRadius: "10px",
          }}
        >
          로그인
        </Link>
      ) : (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            className="bg-gray-50 w-10 h-10"
            style={{
              backgroundColor: "lightgray",
              width: "40px",
              height: "40px",
              borderRadius: "100%",
            }}
          ></div>
          <div>{data?.fetchUserLoggedIn.name}</div>
        </div>
      )}
    </div>
  );
}

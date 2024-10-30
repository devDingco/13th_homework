"use client";
// 로그인 페이지

// TODO - hook.ts index.ts queries.ts type.ts 분리 / 폴더 구조 변경 (페이지컴포넌트 따로)
import Image from "next/image";
import styles from "./styles.module.css";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useAccessTokenStore } from "@/commons/stores/22-01-access-token-store";
// import { useState } from "react";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter(); //회원가입페이지로 이동 시 사용
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore(); // accessToken 여기서는 저장만 함

  // TODO - 회원가입 구현 후, 하드코딩부분 state로 변경 / 비밀번호 ref로 가져오는거 추가 / iput type password 변경
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    // TODO 1. 로그인 뮤테이션 날려서 accessToken 받아오기 (state로 변경)
    const result = await loginUser({
      variables: {
        email: "opgg@opgg.com",
        password: "123456",
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    console.log(accessToken);

    // 2. 받아온 accessToken을 globalState에 저장하기(zustand)
    if (accessToken === undefined) {
      alert("로그인에 실패했습니다! 다시 시도해 주세요!");
    }
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    // 브라우저 로컬스토리지에 객체 형태로 저장 "accessToken"앞=key, accessToken뒤-value
    // 객체를 key에 그냥 못넣어서 문자열로 바꿔서 저장해야함

    // TODO 3. 로그인 성공시 상단 헤더 변경, 어느페이지로 이동?
    // router.push("/");
  };

  const onClickSignup = () => {
    router.push("/signup");
  };

  return (
    <div className={styles["wrapper-all"]}>
      <div className={styles["wrapper-left"]}>
        <div className={styles["wrapper-except-btn"]}>
          <div className={styles["wrapper-img-logo-welcome"]}>
            <Image
              src="/images/logo.png"
              width={120}
              height={75}
              alt="로고 이미지"
            />
            <div className={styles["text-welcome"]}>
              트립트립에 오신걸 환영합니다.
            </div>
          </div>

          <div className={styles["wrapper-text-input-warn"]}>
            <div className={styles["text-dologin"]}>
              트립트립에 로그인 하세요.
            </div>
            <div className={styles["wrapper-input-input"]}>
              <input
                type="text"
                placeholder="이메일을 입력해 주세요."
                className={styles["input-login"]}
              ></input>

              <input
                type="text"
                placeholder="비밀번호를 입력해 주세요."
                className={styles["input-login"]}
              ></input>

              {/* TODO 인풋 미입력, 검증 실패일때 나오는 문구 + 테두리도 빨갛게 변해야 함*/}
              {/* <div className={["text-login-warn"]}>
                  아이디 또는 비밀번호를 확인해 주세요.
                </div> */}
            </div>
          </div>
        </div>

        <div className={styles["wrapper-btn"]}>
          <button onClick={onClickLogin} className={styles["btn-login"]}>
            로그인
          </button>
          <button onClick={onClickSignup} className={styles["btn-signup"]}>
            회원가입
          </button>
        </div>
      </div>

      {/* 이미지 =============================================== */}
      <div className={styles["wrapper-right"]}>
        <Image
          src="/images/image01.jpeg"
          alt="로그인 이미지 절벽"
          objectFit="cover"
          fill
        />
      </div>
    </div>
  );
}

/**  

TODO
<Image
  src="/images/image01.jpeg"
  alt="로그인 이미지 절벽"
  objectFit="cover"
  fill
/>

넥스트 이미지를 현재 이렇게 썼음.
width, height 값이 필수이나, fill 속성을 명시하고 
상위 div에서 position relative하고 가로 세로 길이 정해줄 수 있음.

단점) 브라우저 화면 사이즈가 변할 때 이미지가 원래 비율에 맞추어 확대되고 축소되지 않는다.

해결방법)
이미지를 임포트해서 넥스트 이미지 컴포넌트 안에 아래가져다 쓰면 원래 가로세로 길이를 유지해준다.!!!!
https://nextjs.org/docs/pages/api-reference/components/image
이미지 최적화 부분 (출처)
=> 다시 읽고 변경

*/

"use client"; // 클라이언트 컴포넌트

// export const revalidate = 10; // 몇 초 동안 임시 캐시를 사용할지 설정

export default function RscWithCachePage() {
  // 클라이언트 컴포넌트 자체에 async await를 사용할 수 없습니다.
  // await fetch("https://koreanjson.com/posts/1");
  console.log("요청이 완료되었습니다.");

  return <button>요청하기</button>;
}

// 1. 모든 컴포넌트가 클라이언트 컴포넌트(RCC)로 하면 안되는 이유
// 검색엔진이 빈 페이지로 인식할 수 있습니다.
// 불필요한 하이드레이션 발생하면서 불필요한 코드조각 다운로드로 인한 용량 증가 => 성능저하

// 2. 모든 컴포넌트를 서버 컴포넌트(RSC)로 할수 없는 이유
// - onClick과 같은 이벤트 핸들러를 사용할 수 없습니다.
// => react17 이전에는 모든 컴포넌트가 클라이언트 컴포넌트였습니다.

// 브라우저에서 react-query, apollo-client 등의 글로벌스테이트 캐시를 못함
// 브라우저에서 글로버 스테이트 캐시를 꼭 사용해야할까요?
// next 서버사이드에서 제공하는 fetch의 캐시를 사용하면 안되나요?
// 캐시 직접 수정, 옵티미스틱UI, 로그인 유저별 캐시내용 다르게 처리 등 유연한 캐시를 위해서 있어야됨
// 따라서 next 서버사이드에서 제공하는 fetch의 캐시를 전략적으로 활용해야함

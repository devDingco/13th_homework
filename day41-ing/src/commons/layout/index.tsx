// "use client";
// import { usePathname } from "next/navigation"; //리액트 17버전으로 하겠다는 뜻

// import LayoutBanner from "./banner";
// import LayoutFooter from "./footer";
// import LayoutHeader from "./header";
// import LayoutNavigation from "./navigation";

// // 어떤 페이지에서 헤더를 숨겨야하는지 모아둔 주소들
// const HIDDEN_HEADERS = [
//   "/section12/12-01-library-icon",
//   "/section12/12-03-library-star",
//   // ... ,
//   // ...
// ];
// interface ILayout {
//   children: React.ReactNode;
// }

// export default function Layout({ children }: ILayout) {
//   // 접속한 주소 가져와 주는 함수
//   const pathname = usePathname();

//   console.log("====================");
//   console.log("pathname", pathname); // /section12/12-03-librarystar 찍힘
//   console.log("====================");

//   //변수명 rule: is~~~ = ~이냐 아니냐 => boolean값
//   const isHiddenHeader = HIDDEN_HEADERS.includes(pathname);

//   return (
//     <>
//       {!isHiddenHeader && <LayoutHeader />}
//       <LayoutBanner />
//       <LayoutNavigation />
//       <div style={{ height: "500px", display: "flex" }}>
//         <div style={{ width: "30%", backgroundColor: "orange" }}>사이드바</div>
//         <div style={{ width: "70%" }}>{children}</div>
//       </div>
//       <LayoutFooter />
//     </>
//   );
// }

/*

숨겨줘야할 레이아웃이 있는 페이지는? => 접속한 페이지 주소 받아와서 조건문으로 

console.log("pathname", pathname); => 이렇게하면 문자열과 변수값이 나온당

const HIDDEN_HEADERS = [

]
=> 맵연습할때 햇음 08-01
안바뀌고 계속 가져다 쓰는아이 컴포넌트 바깥에 만들고 변수이름을 대문자로 쓴다. 

컴포넌트안에서는 스테이트가 바뀌면 안에 전체 코드가 다시 만들어진다...
=> 좋을게 없다! 그래서 바깥으로 뺌 




{isHiddenHeader && <LayoutHeader />}
=> 이즈히든 헤더가 맞으면 보여줭 (의미적으로 이상해!!!)

{!isHiddenHeader && <LayoutHeader />}
=> 숨길페이지가 아니면 헤더 보여줘
*/

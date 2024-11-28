"use client";
// import { Observable } from "@apollo/client";
import { from } from "zen-observable";

export default function ObservalbleFlatMapPage() {
  const onClickButton = () => {
    // new Promise((resolve, reject) => {});
    // new Observable((observer) => {});

    // Observable은 비동기 처리를 할 수 있는 객체이다.
    // from() 함수는 배열, Promise, ObservableLike 객체를 Observable 객체로 변환한다.
    // flatMap() 메서드는 Observable 객체를 리턴한다.
    // ObservableLike 객체는 subscribe() 메서드를 가지고 있는 객체이다.
    // subscribe() 메서드는 Observer 객체를 인자로 받아서, Subscription 객체를 리턴한다.
    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"])
      .flatMap((el) => from([`${el} 결과에 qqq 적용`, `${el} 결과에 zzz 적용`]))
      .subscribe((el) => {
        console.log(el);
      });
  };

  return (
    <div>
      <h1>Observable FlatMap 실습</h1>
      <button className="bg-gray-400 w-[200px]" onClick={() => onClickButton()}>
        클릭
      </button>
    </div>
  );
}

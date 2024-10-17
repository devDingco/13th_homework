"use client";

import Link from "next/link";
import { Component } from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  componentDidMount(): void {
    console.log("1.그려지고 나서 실행!");
    // 예) API 요청, 인풋에 포커스 처리, 스크롤 처리
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("2.변경되고 나서 실행!");
  }

  componentWillUnmount(): void {
    console.log("3.사라지기 전에 실행!");
    // 예) 리소스 해제, 불필요한 타이머 인터벌 제거, 채팅방 나가기 API 요청 등 청소 작업
  }

  onClickCountUp = () => {
    console.log("클릭했습니다.");
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <>
        <h1>클래스 컴포넌트로 만든 카운터</h1>
        <p>{this.state.count}</p>
        <button className="btn" onClick={this.onClickCountUp}>
          카운트 올리는 버튼
        </button>
        <Link href="/">나가기</Link>
      </>
    );
  }
}

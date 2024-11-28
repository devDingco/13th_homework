"use client";

import Link from "next/link";
import { Component } from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 1,
  };

  componentDidMount() {
    console.log("그려지고 나서 실행!");

    // ex) APT 요청, 인풋 포커스 깜빡깜빡 등....
  }

  componentDidUpdate() {
    console.log("변경되고 나서 실행!");
  }

  componentWillUnmount() {
    console.log("사라지기 전에 실행");

    // ex) 채팅방 나가기 API 요청,불필요한 타이머 삭제 등 청소하기.....
  }

  onClickCountUp = () => {
    //해결방법 1 화살표함수
    this.setState({
      //setState기능은 상속받은 Component에 내장되어있었음
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <>
        <div>{this.state.count}</div>
        {/* 해결방법2 로직상의 this를 연결 */}
        <button onClick={this.onClickCountUp.bind(this)}>
          카운트 올리는 버튼
        </button>
        <Link href={"/"}>나가기</Link>
      </>
    );
  }
}

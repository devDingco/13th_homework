"use client";

import { Component } from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 1,
  };

  // !!!!!!!!!!!!!!!!!!!!1해결방법 1과 2중이 택1!!!!!!!!!!!!!!!!!!!!!!

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
      </>
    );
  }
}

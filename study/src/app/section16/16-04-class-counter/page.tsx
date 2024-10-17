"use client";

import { Component } from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  // onClickCountUp() {
  //   console.log("클릭했습니다.");
  //   this.setState({
  //     count: this.state.count + 1,
  //   });
  // }

  // 해결방법 3
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
        {/* 해결방법 1
        <button className="btn" onClick={this.onClickCountUp.bind(this)}>
          카운트 올리는 버튼
        </button> 
        */}

        {/* 해결방법 2
        <button className="btn" onClick={() => this.onClickCountUp()}>
          카운트 올리는 버튼
        </button> 
        */}
      </>
    );
  }
}

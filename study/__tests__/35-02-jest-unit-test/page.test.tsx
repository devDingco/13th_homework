import JestUnitTestPage from "@/app/section35/35-02-jest-unit-test/page";
import { render, screen } from "@testing-library/react";

it("내가 원하는대로 그려지는지 확인한다", () => {
  render(<JestUnitTestPage />);

  // const myText1 = screen.getByText("철수는 13살 입니다.");
  // expect(myText1).toBeInTheDocument();

  // const myText2 = screen.getByText("철수의 취미 입력하기:");
  // expect(myText2).toBeInTheDocument();

  // const myText3 = screen.getByText("철수랑 놀러가기");
  // expect(myText3).toBeInTheDocument();
});

import JestUnitTestEventPage from "@/app/section35/35-04-jest-unit-test-event/page";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// 1. 가짜로 그림을 그린다.
// 2. 가짜로 만든 그림을 클릭한다.
// 3. 클릭하면 카운트가 올라간다. 카운트가 변경이 되어있는지 확인한다.

it("버튼을 눌렀을때, 제대로 작동하는지 테스트하자!", () => {
  render(<JestUnitTestEventPage />);

  fireEvent.click(screen.getByRole("count-button"));

  expect(screen.getByRole("count")).toHaveTextContent("1");
});

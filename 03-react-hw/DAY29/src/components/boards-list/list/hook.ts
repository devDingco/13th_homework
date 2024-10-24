import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useState, type ChangeEvent } from "react";
import _ from "lodash";
import dayjs from "dayjs";

export default function useBoardsList() {
  //검색어 색칠
  const [keyword, setKeyword] = useState("");

  // 선택된 날짜 저장
  const [selectedDates, setSelectedDates] = useState<string[]>([]); //배열(시작, 끝)

  // 마우스에 따른 삭제버튼 유무
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // 게시글 1페이지 불러오기
  const { data, refetch } = useQuery(FetchBoardsDocument, {
    variables: {
      page: 1,
    },
  });

  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await deleteBoard({
        variables: { boardId: event.currentTarget.id },
        //삭제 후 자동 새로고침
        refetchQueries: [
          {
            query: FetchBoardsDocument,
            variables: { page: 1 }, // 필요한 변수를 명시적으로 지정
          },
        ],
      });
      alert("게시물이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("게시물 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 날짜 변경 시 실행되는 함수
  const onDateChange = (dates: any) => {
    if (!dates) {
      setSelectedDates([]); // 날짜 선택 취소시 빈 배열로 초기화
      getDebounce("", []); // 검색어 없이 날짜만 초기화
      return;
    }

    const [startDate, endDate] = dates;
    const formattedDates = [
      dayjs(startDate).format("YYYY-MM-DD"), //시작날짜
      dayjs(endDate).format("YYYY-MM-DD"), //끝날짜
    ];
    console.log(formattedDates); // ['시작날짜', '끝날짜']
    setSelectedDates(formattedDates);
    getDebounce(keyword, formattedDates); // 현재 검색어와 함께 새로운 날짜로 검색
  };

  // debounce : 키워드, 날짜 검색
  const getDebounce = _.debounce((value: string, dates: string[]) => {
    refetch({
      search: value,
      page: 1,
      startDate: dates[0] || null, // 시작 날짜
      endDate: dates[1] || null, // 종료 날짜
    });
    setKeyword(value);
  }, 500);

  // 검색어 변경 시 실행되는 함수
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    getDebounce(newKeyword, selectedDates); // 현재 선택된 날짜와 함께 새로운 검색어로 검색
  };

  return {
    data,
    handleDelete,
    isHovered,
    setIsHovered,
    refetch,
    onChangeSearch,
    onDateChange,
    keyword,
  };
}

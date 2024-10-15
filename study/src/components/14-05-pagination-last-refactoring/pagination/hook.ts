interface IUsePaginationProps {
  startPage: number;
  setStartPage: React.Dispatch<React.SetStateAction<number>>;
  refetch: (arg0: { page: number }) => void;
}

export const usePagination = (props: IUsePaginationProps) => {
  const { startPage, setStartPage, refetch } = props;

  const onClickPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttons = document.querySelectorAll(".paginationBtn");
    buttons.forEach((el) => el.classList.remove("bg-blue-300"));
    e.currentTarget.classList.add("bg-blue-300");
    refetch({ page: Number((e.currentTarget as Element).textContent) });
    // setPage(Number((e.currentTarget as Element).textContent));
  };

  const prevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const nextPage = () => {
    // 스타트 페이지가 마지막 페이지보다 작을 때만 실행
    setStartPage(startPage + 10);
    refetch({ page: startPage + 10 });
  };

  return { onClickPage, prevPage, nextPage };
};

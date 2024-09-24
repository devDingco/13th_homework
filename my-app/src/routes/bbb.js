import { Link } from "react-router-dom";

const Bbb = () => {
  return (
    <>
      <div>Bbb 페이지 입니다.</div>

      <Link to="/aaa">Aaa 페이지로 가는 기능</Link>

      <a href="/aaa">Aaa 페이지 이동</a>
    </>
  );
};

export default Bbb;

import React from "react";
import { Link } from "react-router-dom";

const Bbb = () => {
  return (
    <div>
      <div>Bbb 페이지 입니다.</div>
      <Link to="/aaa">Aaa 페이지로 이동</Link>
    </div>
  );
};

export default Bbb;

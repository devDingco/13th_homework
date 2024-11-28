"use client";

import { Input, Button } from "antd";
import { useState } from "react";
import _ from "lodash";

export default function SearchBox() {
  const [search, setSearch] = useState("");

  const onClickSearch = async () => {
    // await refetch({ search: search, page: 1});
    // 샬로우 라우팅 (shallow routing)을 사용하여 페이지가 새로고침 되지 않도록 url을 변경합니다.
    // url과 관련된 컴포넌트(usePathname, useSearchParams 등)만 리렌더링됩니다.
    // 구버전에서는 router.push(주소, 옵션, { shallow: true })를 사용했지만 신버전에서는 window.history.pushState를 사용합니다.

    window.history.pushState(null, "", `?search=${search}`);
    window.history.replaceState(null, "", `?search=${search}`);
  };

  const onChangeSearch = (e) => {
    _.debounce(() => {
      window.history.pushState(null, "", `?search=${e.target.value}`);
      window.history.replaceState(null, "", `?search=${e.target.value}`);
      if (e.target.value === "") {
        // 서치 파마미터만 없앤다
      }
    }, 1000)();
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        style={{ width: "200px" }}
        type="search"
        onChange={(e) => onChangeSearch(e)}
      />
      <Button onClick={onClickSearch}>검색</Button>
    </div>
  );
}

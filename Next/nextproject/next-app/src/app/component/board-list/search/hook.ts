"use client";

import { useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { FetchBoards } from "../../queires/queries";
import _ from "lodash";
import { IPropsSearch } from "./types";

export default function UseSearchPage(props) {
  const [keyword, setKeyWord] = useState("");

  const { data } = useQuery(FetchBoards);

  const getDebounce = _.debounce((value) => {
    props.refetch({ search: value, mypage: 1 });
    setKeyWord(value);
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  return {
    onChangeSearch,
    keyword,
    data,
  };
}

import _ from "lodash";
import { useState } from "react";

export default function useSearch({ data, refetch }) {
  const [search, setSearch] = useState();

  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    });
    setSearch(value);
  }, 500);

  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };

  return {
    data,
    refetch,
    search,
    onChangeSearch,
  };
}

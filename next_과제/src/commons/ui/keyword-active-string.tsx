import { Fragment } from "react";
import { useSearch } from "@/commons/stores/search-store";

export const KeywordActiveString = ({ value }: { value: string }) => {
  const { search } = useSearch();
  return search !== ""
    ? value
        .replaceAll(search, `$keyword$${search}$keyword$`)
        .split("$keyword$")
        .map((text: string, idx: number) => (
          <Fragment key={text + idx}>
            {text !== search ? (
              text
            ) : (
              <span className="text-red-500">{text}</span>
            )}
          </Fragment>
        ))
    : value;
};

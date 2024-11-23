import { ChangeEvent, MouseEvent, useState } from "react";
import { useQuery } from "@apollo/client";
import _ from "lodash";
import { Dayjs } from "dayjs";
import { FetchTravelproductsDocument } from "@/commons/gql/graphql";
import {
  SearchParamsType,
  useSearchKeywordWithTravelProduct,
} from "@/app/_store/searchParamsWithTravelProduct-store";
import { convertToISO } from "@/commons/fomatter/date";
import { NavigationPaths, useNavigate } from "@/utils/navigate";

export default function useAvailableAccommodations() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [params, setParams] = useState<SearchParamsType>({
    keyword: "",
    startDate: "",
    endDate: "",
  });
  const { setSearchParams } = useSearchKeywordWithTravelProduct();

  const { data: travelProducts, fetchMore } = useQuery(
    FetchTravelproductsDocument,
    {
      variables: {
        isSoldout: selectedMenu === 1 ? true : false,
      },
    }
  );

  const fetchMoreData = async () => {
    console.log("데이터 더가져온다");
    if (!travelProducts) return;
    await fetchMore({
      variables: {
        page:
          Math.ceil((travelProducts.fetchTravelproducts.length ?? 10) / 10) + 1,
        isSoldout: selectedMenu === 1 ? true : false,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproducts.length) {
          setHasMore(false);
          return prev;
        }

        if (!fetchMoreResult || !fetchMoreResult.fetchTravelproducts) {
          return prev;
        }

        return {
          fetchTravelproducts: [
            ...prev.fetchTravelproducts,
            ...fetchMoreResult.fetchTravelproducts,
          ],
        };
      },
    });
  };

  const onClickCard = (id: string) => {
    console.log("누름");

    navigate(NavigationPaths.travelProduct, id);
  };

  const onClickNavigationItem = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget?.id;
    setSelectedMenu(Number(id));
  };

  const getDebounce = _.debounce((value) => {
    setParams((prev) => {
      return {
        ...prev,
        keyword: value,
      };
    });
  }, 300);

  const onChangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    datesString: [string, string]
  ) => {
    console.log(datesString);
    if (!datesString || (datesString[0] === "" && datesString[1] === "")) {
      setParams((prev) => {
        return {
          ...prev,
          startDate: null,
          endDate: null,
        };
      });
      return;
    }

    setParams((prev) => {
      return {
        ...prev,
        startDate: convertToISO(datesString[0]),
        endDate: convertToISO(datesString[1]),
      };
    });
  };

  const onChangeSearchKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.currentTarget.value;
    getDebounce(keyword);
  };

  const onClickSearch = (event: MouseEvent<HTMLButtonElement>) => {
    setSearchParams(params);
  };

  const onClickSubMenu = () => {
    navigate(NavigationPaths.travelProductNew);
  };

  return {
    selectedMenu,
    hasMore,
    travelProducts,
    onClickNavigationItem,
    onChangeDate,
    onChangeSearchKeyword,
    onClickSearch,
    onClickSubMenu,
    onClickCard,
    fetchMoreData,
  };
}

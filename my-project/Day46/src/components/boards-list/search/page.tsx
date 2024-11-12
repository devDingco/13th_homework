import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import useSearch from "./hook";

export default function Search({ data, refetch }) {
  const { onChangeSearch } = useSearch({ data, refetch });

  return (
    <div className="flex flex-col gap-6 w-[1280px] mx-auto mb-10">
      <div className="font-bold text-7 leading-9">트립토크 게시판</div>
      <div className="flex gap-2 min-w-[640px] w-full">
        <div className="flex gap-4 w-full">
          <div className="flex gap-2 bg-[#f2f2f2] p-3 w-full rounded-lg">
            <SearchOutlined />
            <input
              type="text"
              placeholder="제목을 검색해 주세요."
              className="w-full bg-[#f2f2f2]"
              onChange={onChangeSearch}
            />
          </div>
          <div className="h-[48px] w-[64px] py-3 px-4 bg-[#000000] rounded-lg text-[#ffffff] font-semibold text-[16px] leading-6 text-center whitespace-nowrap">
            검색
          </div>
        </div>
        <div className="flex py-3 px-4 gap-2 rounded-lg h-12 bg-[#2974e5] whitespace-nowrap">
          <FormOutlined className="text-[#ffffff]" />
          <div className="font-semibold text-[#ffffff] text-[16px] leading-6 -tracking-widest">
            트립토크 등록
          </div>
        </div>
      </div>
    </div>
  );
}

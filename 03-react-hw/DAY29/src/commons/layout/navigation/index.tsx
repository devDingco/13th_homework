export default function Navigation() {
  return (
    <div className="w-[1920px] h-20 px-5 bg-white flex-col justify-start items-center gap-2.5 inline-flex">
      <div className="self-stretch h-20 py-5 justify-between items-center inline-flex">
        <div className="self-stretch justify-start items-center gap-6 flex">
          <div className="w-14 pr-[4.48px] justify-start items-center flex">
            <div className="w-[51.52px] h-8 relative flex-col justify-start items-start flex"></div>
          </div>
          <div className="rounded-lg shadow justify-center items-center gap-4 flex">
            <div className="p-2 border-b-2 border-black justify-center items-center gap-2.5 flex">
              <div className="text-center text-black text-base font-bold font-['Pretendard Variable'] leading-normal">
                트립토크
              </div>
            </div>
            <div className="p-2 rounded-lg justify-center items-center gap-2.5 flex">
              <div className="text-center text-[#333333] text-base font-medium font-['Pretendard Variable'] leading-normal">
                숙박권 구매
              </div>
            </div>
            <div className="p-2 rounded-lg justify-center items-center gap-2.5 flex">
              <div className="text-center text-[#333333] text-base font-medium font-['Pretendard Variable'] leading-normal">
                마이 페이지
              </div>
            </div>
          </div>
        </div>
        <div className="justify-start items-center gap-2 flex">
          <div className="justify-start items-center gap-1 flex">
            <div className="w-10 h-10 relative bg-[#e4e4e4] rounded-[100px]"></div>
            <div className="w-6 h-6 relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

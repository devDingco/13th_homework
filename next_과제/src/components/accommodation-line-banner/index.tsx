export default function AccommodationLineBanner() {
  return (
    <div className="p-12 bg-[url('/images/beach.jpg')] bg-cover w-full h-60 rounded-xl flex justify-end items-center">
      <div className="flex flex-col gap-5 items-end text-right">
        <ul className="flex gap-3">
          <li className="bg-[rgba(0,0,0,0.1)] rounded-md py-1 px-2">
            솔로트립 독점 숙소
          </li>
          <li className="bg-[rgba(0,0,0,0.1)] rounded-md py-1 px-2">
            솔로트립 독점 숙소
          </li>
        </ul>
        <h5 className="font-bold text-3xl">
          천만 관객이 사랑한
          <br /> 빌 페소 르꼬 전시회 근처 숙소 특가 예약
        </h5>
      </div>
    </div>
  );
}

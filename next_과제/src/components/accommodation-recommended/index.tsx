import Icon from "@/components/iconFactory";

export default function AccommodationRecommended() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-xl">
        2024 끝여름 낭만있게 마무리 하고 싶다면?
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl text-white bg-[url('/images/beach.jpg')] bg-cover w-[624px] h-[624px] flex flex-col justify-between p-6">
          <div className="self-end flex bg-[rgba(0,0,0,0.6)] py-1 pl-1 pr-2 rounded-lg">
            <Icon icon="bookmark" className="w-6 h-6" />
            <span>
              <div className="blind">북마크 횟수</div>24
            </span>
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-2xl">포항 : 당장가고싶은숙소</h5>
            <p className="font-semibold text-xl">
              살어리 살어리랏다 청산에 살어리랏다~~~
            </p>
            <strong className="font-bold self-end text-2xl">32,400원</strong>
          </div>
        </div>
        <div className="rounded-xl text-white bg-[url('/images/beach.jpg')] bg-cover w-[624px] h-[624px] flex flex-col justify-between p-6">
          <div className="self-end flex bg-[rgba(0,0,0,0.6)] py-1 pl-1 pr-2 rounded-lg">
            <Icon icon="bookmark" className="w-6 h-6" />
            <span>
              <div className="blind">북마크 횟수</div>24
            </span>
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-2xl">포항 : 당장가고싶은숙소</h5>
            <p className="font-semibold text-xl">
              살어리 살어리랏다 청산에 살어리랏다~~~
            </p>
            <strong className="font-bold self-end text-2xl">32,400원</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import KaKaoMap from "@/components/kakao-map";
import ThumbsGallery from "@/components/thumbs-gallery";

export default function AccommodationDetail() {
  const accommodationDetail = {
    title: "포항 : 숙박권 명이 여기에 들어갑니다",
    description: "모던한 분위기의 감도높은 숙소",
    tag: ["6인 이하", "룸 서비스 가능", "불멍", "반신욕 & 스파", "플랜테리어"],
    images: [
      "/images/mainSlide1.jpg",
      "/images/mainSlide2.jpg",
      "/images/mainSlide3.jpg",
      "/images/beach.jpg",
    ],
    contents: `국무회의는 정부의 권한에 속하는 중요한 정책을 심의한다. 제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다.
공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다.
외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다.
통신·방송의 시설기준과 신문의 기능을 보장하기 위하여 필요한 사항은 법률로 정한다. 헌법에 의하여 체결·공포된 조약과 일반적으로 승인된 국제법규는 국내법과 같은 효력을 가진다.
정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.
국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인 때에는 부결된 것으로 본다.
대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다.
지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다.
국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 모든 국민은 법률이 정하는 바에 의하여 선거권을 가진다. 법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다.
대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.`,
    map: { lat: 37.5665, lng: 126.978 },
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              포항 : 숙박권 명이 여기에 들어갑니다
            </h2>
            <p className="text-gray-600">모던한 분위기의 감도높은 숙소</p>
            {accommodationDetail && (
              <ul className="flex gap-1">
                {accommodationDetail.tag.map((tag, index) => (
                  <li key={index} className="text-blue-500">
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ThumbsGallery />
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">상세설명</h3>
          <div>{accommodationDetail.contents}</div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">상세 위치</h3>
          <KaKaoMap
            lat={accommodationDetail.map.lat}
            lng={accommodationDetail.map.lng}
          />
        </div>
      </div>
    </>
  );
}

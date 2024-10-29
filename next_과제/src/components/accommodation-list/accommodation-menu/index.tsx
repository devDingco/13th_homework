import Icon, { IconType } from "@/components/icon-factory";

export default function AccommodationMenu() {
  const acommodationType = [
    {
      type: "1인 전용",
      icon: "singlePersonAccommodation",
    },
    {
      type: "아파트",
      icon: "apartment",
    },
    {
      type: "호텔",
      icon: "hotel",
    },
    {
      type: "캠핑",
      icon: "camp",
    },
    {
      type: "룸 서비스 가능",
      icon: "roomService",
    },
    {
      type: "불멍",
      icon: "fire",
    },
    {
      type: "반신욕 & 스파",
      icon: "spa",
    },
    {
      type: "바다 위 숙소",
      icon: "houseOnTheSea",
    },
    {
      type: "플랜테리어",
      icon: "planterior",
    },
  ];

  return (
    <ul className="flex gap-12 justify-between py-4">
      {acommodationType.map((type, i) => (
        <li key={i} className="flex flex-col gap-3 items-center w-24">
          <Icon icon={type.icon as IconType} className="w-10 h-10" />
          <span>{type.type}</span>
        </li>
      ))}
    </ul>
  );
}

export interface IPlaceData {
  id: number;
  image: string;
  title: string;
  contents: string;
  address: string;
}

export const PLACE_DATA: IPlaceData[] = [
  {
    id: 1,
    title: "Bramble & Brioche 한남점",
    contents: "한국에서 느낄 수 없었던 영국 감성의",
    address: "서울시 용산구",
    image: "/images/default2.jpeg",
  },
  {
    id: 2,
    title: "오브레크 경주",
    contents: "티라미수에 밤보다 더 어울리는",
    address: "경북 경주시",
    image: "/images/default1.jpeg",
  },
  {
    id: 3,
    title: "미드나잇 딤섬",
    contents: "너무 편안한 분위기의 딤섬 맛집입니다",
    address: "서울시 성동구",
    image: "/images/default4.jpeg",
  },
  {
    id: 4,
    title: "모찌 비주",
    contents: "세상에 없던 찹쌀떡 맛집",
    address: "서울시 마포구",
    image: "/images/default3.jpeg",
  },
];

import { graphql, HttpResponse } from "msw";

const solplaceLogs = [
  {
    id: 1,
    image: [
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
    ],
    title: "Bramble & Brioche 한남점",
    contents: "한국에서 느낄 수 없었던 영국 감성의",
    address: "서울시 용산구",
    lat: 37.5326,
    lng: 126.9906,
  },
  {
    id: 2,
    images: [
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
    ],
    title: "오브레크 경주",
    contents: "티라미수에 밤보다 더 어울리는",
    address: "경북 경주시",
    lat: 35.8562,
    lng: 129.2246,
  },
  {
    id: 3,
    image: [
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
    ],
    title: "미드나잇 딤섬",
    contents: "너무 편안한 분위기의 딤섬 맛집입니다",
    address: "서울시 성동구",
    lat: 37.5633,
    lng: 127.037,
  },
  {
    id: 4,
    image: [
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
    ],
    title: "모찌 비주",
    contents: "세상에 없던 찹쌀떡 맛집",
    address: "서울시 마포구",
    lat: 37.561,
    lng: 126.9084,
  },
];
const solplaceLog = [
  {
    id: 1,
    image: [
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
      "/images/default2.jpeg",
    ],
    title: "Bramble & Brioche 한남점",
    contents: "한국에서 느낄 수 없었던 영국 감성의",
    address: "서울시 용산구",
    lat: 37.5326,
    lng: 126.9906,
  },
  {
    id: 2,
    images: [
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
      "/images/default1.jpeg",
    ],
    title: "오브레크 경주",
    contents: "티라미수에 밤보다 더 어울리는",
    address: "경북 경주시",
    lat: 35.8562,
    lng: 129.2246,
  },
  {
    id: 3,
    image: [
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
      "/images/default4.jpeg",
    ],
    title: "미드나잇 딤섬",
    contents: "너무 편안한 분위기의 딤섬 맛집입니다",
    address: "서울시 성동구",
    lat: 37.5633,
    lng: 127.037,
  },
  {
    id: 4,
    image: [
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
      "/images/default3.jpeg",
    ],
    title: "모찌 비주",
    contents: "세상에 없던 찹쌀떡 맛집",
    address: "서울시 마포구",
    lat: 37.561,
    lng: 126.9084,
  },
];

export const handlers = [
  graphql.query("fetchSolplaceLogs", ({ variables }) => {
    const page = variables.page || 1;
    return HttpResponse.json({
      data: { fetchSolplaceLogs: solplaceLogs },
    });
  }),

  graphql.query("fetchSolplaceLog", ({ variables }) => {
    const id = variables.id;

    const fetchSolplaceLog = solplaceLog.find(
      (solplaceLog) => solplaceLog.id === id
    );

    return HttpResponse.json({
      data: {
        fetchSolplaceLog: fetchSolplaceLog,
      },
    });
  }),
];

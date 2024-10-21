export default async function getTourOpenapi(page: number) {
  try {
    const res = await fetch(
      `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=30&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.NEXT_PUBLIC_TOUR_SERVICE_KEY}&listYN=Y&arrange=A&contentTypeId=39&areaCode=1&cat1=A05&_type=json`,
    );
    const { response } = await res.json();
    return response;
  } catch (err) {
    console.log('error', err);
    throw err;
  }
}

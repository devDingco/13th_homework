export const convertToISO = (dateString: string) => {
  // 새로운 Date 객체 생성 (시간은 00:00:00으로 설정)
  const date = new Date(`${dateString}T00:00:00Z`);

  // ISO 8601 형식으로 반환
  return date.toISOString();
};

export const convertDateTime = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
};

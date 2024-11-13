export const toKoreanTimeString = (date?: string, isEndDate = false) => {
  if (!date) return undefined;
  const dateSet = new Date(date);
  const offset = 9 * 60; // Korea is UTC+9
  const koreanTime = new Date(dateSet.getTime() + offset * 60 * 1000);
  if (isEndDate) {
    // 종료일은 24시로 설정
    koreanTime.setHours(24, 0, 0, 0);
  }
  return koreanTime.toISOString();
};

//안쓰고 있음

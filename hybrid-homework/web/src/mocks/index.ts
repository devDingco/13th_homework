export const initMockAPI = async () => {
  // 서버 환경이 아닐 경우에만
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    // msw 브라우저 실행
    await worker.start();
  }
};

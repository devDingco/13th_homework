import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // 테스트 환경에서 next.config.js 및 .env 파일을 로드하려면 Next.js 앱의 경로를 제공하세요.
  dir: "./",
});

// Jest에 전달할 사용자 정의 구성을 추가하세요.
// 1. MSW 적용전 설정
// const config: Config = {
//   coverageProvider: "v8",
//   testEnvironment: "jsdom",
//   // 각 테스트가 실행되기 전에 더 많은 설정 옵션을 추가합니다.
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };

// 2. MSW 적용후 설정 => https://mswjs.io/docs/migrations/1.x-to-2.x 공식 문서 참고
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// createJestConfig는 next/jest가 비동기인 Next.js 구성을 로드할 수 있도록 이 방식으로 내보내집니다.
export default createJestConfig(config);

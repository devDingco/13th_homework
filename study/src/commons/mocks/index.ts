import { setupServer } from "msw/node";
import { apis } from "./apis";

// apis를 가지고 서버를 셋팅한다.
// 실행은 jest.setup.ts 에서 한다.
export const server = setupServer(...apis);

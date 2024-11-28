import { server } from "@/commons/mocks"; // 셋팅해둔 서버 가져오기
beforeAll(() => server.listen()); // 서버를 켜준다.
afterAll(() => server.close()); // 테스트가 끝나면 서버를 닫아준다.

import { CreateBoardInput } from "@/commons/graphql/graphql";
import { z } from "zod";

export const schema: z.ZodType<IMyCreateType> = z.object({
  writer: z.string().min(3, { message: "작성자는 3글자 이상입니다." }),
  title: z.string().min(3, { message: "제목은 3글자 이상입니다." }),
  contents: z.string(),
  // hobby: z.string().optional(),
  // password: z.string().min(8, { message: "비밀번호는 8글자 이상입니다." }),
  // phone: z
  //   .string()
  //   .regex(/^\d{3}-\d{3,4}-\d{4}$/, { message: "전화번호 형식이 아닙니다." }),
});

// !! 타입을 생성하는 두가지 방법
// 1. zod에서 타입을 가져와 만들어준다.
type myschema = z.infer<typeof schema>;

// 2. 작성해둔 schema 즉 z.object를 기반으로 타입을 직접 만들어준다.
// IBackEndSchema 백엔드에서 받아오는 데이터의 타입이라고 가정하고
// 이러한 지정된 타입을 위에 schema에 : z.ZodType<IBackEndSchema> 로 지정 가능하다.
// 이렇게 지정하면 값을 받아올 때 해당 타입을 지켜야 한다고 알림이 뜨게된다.
// graphql이라고 한다면 codegen을 통해서 받아온 타입을 연결해주면 되겠다.
interface IBackEndSchema {
  writer: string;
  title: string;
  contents: string;
}

// 2-1 연습해보기
// graphql 에서 codegen을 통해 받아온 타입을 연결해본 경우임
// 해당 타입에서 writer와 title만 뽑아서 사용하고 싶다면 아래와 같이 작성하면 된다.
// pick이 아닌 omit을 사용할수도 있지만 백엔드에서 받아오는 데이터에서 갑자기 의도하지 않은 다른 속성이 추가될 수 있으니 주의해야 한다.
export interface IMyCreateType // # <UpdateBoardInput, "title" | "contents">  이렇게 사용을 해도 되는데 왜 새로 만들어주는지 알림이 뜨게된다.
  extends Pick<CreateBoardInput, "writer" | "title" | "contents"> {}

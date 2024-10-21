// input state 타입정의
export interface IInputs {
  writer: string;
  password: string;
  title: string;
  content: string;
}
// error state 타입정의
export interface IErrors {
  writer?: string;
  password?: string;
  title?: string;
  content?: string;
}
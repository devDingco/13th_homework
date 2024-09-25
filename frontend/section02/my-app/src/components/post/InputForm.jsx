import InputFormTitle from "./InputFormTitle";
import InputFormText from "./InputFormText";
import InputFormAddr from "./InputFormAddr";
import InputFormPhoto from "./InputFormPhoto";
import ValidationMessage from "./ValidationMessage";

// 쓸지 안쓸지 모르겠는 컴포넌트 입니다람쥐,,,

const requiredObj = {
  author: true,
  password: true,
  address: true,
  content: true,
};

const InputForm = ({ title }) => {
  return (
    <div className="content-area">
      <InputFormTitle title={title} />
      {/* {
        title==='author'||
      } */}
      <InputFormText title={title} />
      {requiredObj[{ title }] && <ValidationMessage />}
    </div>
  );
};
export default InputForm;

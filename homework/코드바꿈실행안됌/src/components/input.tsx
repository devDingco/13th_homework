export default function InputField(props) {
  return (
    <input
      disabled={props.disabled}
      className={props.className}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    />
  );
}
//defaultValue : 수정하기 할 때, 처음으로 들어가 있는 값을 표시해주기위해 쓴다
//defaultValue : value랑은 다르고 등록하기가 아닌 수정하기 할때 사용하려고 value를 안쓰고 이걸 씀
//placeholder는 내가 input창에 작성하면 날아가는 내용임

//   <input
//     disabled={props.isEdit}
//     className={styles.css_inputStyleBox}
//     type="text"
//     placeholder=
//     onChange={handleChangPwMeg}
//     defaultValue={props.isEdit ? "******" : password} // state연결
//   />;

interface ICheckBoxProps {
  data: string;
}

export default function CheckBox(props: ICheckBoxProps) {
  const { data } = props;
  const checkBoxHandler = (e: React.MouseEvent, data: string) => {
    e.stopPropagation();
    console.log("체크박스 클릭됨", data);
  };

  return (
    <>
      <input type="checkbox" onClick={(e) => checkBoxHandler(e, data)} />
    </>
  );
}

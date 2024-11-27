import Address from "@/commons/components/Address";
import Button from "@/commons/components/Button";
import Input from "@/commons/components/Input";
import TextArea from "@/commons/components/TextArea";

export default function PlaceNew() {
  return (
    <div>
      <Input id="이름" />
      <Address />
      <TextArea id="내용" />
      <Button id="LOG" />
    </div>
  );
}

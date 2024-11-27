"use client";

import Address from "@/commons/components/Address";
import Button from "@/commons/components/Button";
import ImageUpload from "@/commons/components/ImageUpload";
import Input from "@/commons/components/Input";
import TextArea from "@/commons/components/TextArea";
import usePlaceNew from "@/commons/hooks/usePlaceNew";

export default function PlaceNew() {
  const { handleChange, disabled } = usePlaceNew();

  return (
    <div className="flex flex-col gap-5 pt-5">
      <ImageUpload id="1" />
      <Input id="이름" onChange={handleChange} />
      <Address />
      <TextArea id="내용" onChange={handleChange} />
      <Button id="LOG" disabled={disabled} />
    </div>
  );
}

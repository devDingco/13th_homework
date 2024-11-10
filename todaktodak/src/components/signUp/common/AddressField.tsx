import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import DaumPostcodeEmbed, { type Address } from "react-daum-postcode";

interface AddressFieldProps {
  required?: boolean;
}

export function AddressField({ required = false }: AddressFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    setValue,
    // formState: { errors },
  } = useFormContext();

  // 주소 검색 완료 핸들러
  const handleComplete = (address: Address) => {
    setValue("addressInput.zoneCode", address.zonecode);
    setValue("addressInput.address", address.address);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {/* 주소 라벨 */}
      <Label className="flex gap-1">
        주소
        {required && <span className="text-red-500">*</span>}
      </Label>

      {/* 우편번호 입력 */}
      <div className="flex gap-2">
        <Input
          {...register("addressInput.zoneCode")}
          placeholder="우편번호"
          disabled
          className="w-32"
        />
        <Button type="button" variant="outline" onClick={() => setIsOpen(true)}>
          우편번호 검색
        </Button>
      </div>

      {/* 기본 주소 입력 */}
      <Input
        {...register("addressInput.address")}
        placeholder="기본 주소"
        disabled
        className="w-full"
      />

      {/* 상세 주소 입력 */}
      <Input
        {...register("addressInput.detailAddress")}
        placeholder="상세 주소를 입력해주세요"
        className="w-full"
      />

      {/* 에러 메시지 표시 */}
      {/*       {(errors.addressInput?.zoneCode ||
        errors.addressInput?.address ||
        errors.addressInput?.detailAddress) && (
        <p className="text-sm text-red-500">
          {
            (
              errors.addressInput?.zoneCode ||
              errors.addressInput?.address ||
              errors.addressInput?.detailAddress
            )?.message as string
          }
        </p>
      )} */}

      {/* 우편번호 검색 모달 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>우편번호 검색</DialogTitle>
          </DialogHeader>
          <div className="h-[400px]">
            <DaumPostcodeEmbed
              onComplete={handleComplete}
              style={{ height: "100%" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

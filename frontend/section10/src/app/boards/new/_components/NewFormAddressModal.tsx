import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function NewFormAddressModal({
  open,
  onClose,
  onAddressSelect,
}) {
  const handleComplete = (data) => {
    const fullAddress = data.address;
    const zipcode = data.zonecode;
    onAddressSelect({ fullAddress, zipcode }); // 부모 컴포넌트로 주소 전달
    onClose(); // 모달 닫기
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>주소 검색</DialogTitle>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
}

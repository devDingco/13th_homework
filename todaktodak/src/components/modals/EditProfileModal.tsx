import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, MapPin } from "lucide-react";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    address: {
      zipcode: "",
      address1: "",
      address2: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 나중에 수정 가능하게
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            개인정보 수정
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            비밀번호와 주소를 안전하게 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="password" className="w-full mt-6">
          <TabsList className="w-full grid grid-cols-2 h-12 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger
              value="password"
              className="flex items-center justify-center gap-2 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <Lock className="w-4 h-4" />
              비밀번호 변경
            </TabsTrigger>
            <TabsTrigger
              value="address"
              className="flex items-center justify-center gap-2 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <MapPin className="w-4 h-4" />
              주소 변경
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="mt-6">
            <div className="bg-white p-6 rounded-xl space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-gray-700">
                  현재 비밀번호
                </Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  placeholder="현재 비밀번호를 입력하세요"
                  className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700">
                  새 비밀번호
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  placeholder="새 비밀번호를 입력하세요"
                  className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
                <p className="text-sm text-gray-500">
                  영문, 숫자, 특수문자 포함 8자 이상
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  새 비밀번호 확인
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  placeholder="새 비밀번호를 다시 입력하세요"
                  className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="address" className="mt-6">
            <div className="bg-white p-6 rounded-xl space-y-6">
              <div className="flex gap-3">
                <div className="space-y-2 w-24">
                  <Label htmlFor="zipcode" className="text-gray-700">
                    우편번호
                  </Label>
                  <Input
                    id="zipcode"
                    name="address.zipcode"
                    value={formData.address.zipcode}
                    readOnly
                    placeholder="우편번호"
                    className="border-gray-200 bg-gray-50"
                  />
                </div>
                <div className="self-end">
                  <Button
                    variant="outline"
                    type="button"
                    className="border-gray-200 hover:bg-indigo-600 hover:text-white"
                  >
                    주소 찾기
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address1" className="text-gray-700">
                  기본주소
                </Label>
                <Input
                  id="address1"
                  name="address.address1"
                  value={formData.address.address1}
                  readOnly
                  placeholder="기본주소"
                  className="border-gray-200 bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2" className="text-gray-700">
                  상세주소
                </Label>
                <Input
                  id="address2"
                  name="address.address2"
                  value={formData.address.address2}
                  placeholder="상세주소를 입력해주세요"
                  className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;

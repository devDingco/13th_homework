"use client";

import { useState } from "react";
import { AddressFields } from "@/components/signUp/AddressFields";

export default function EditProfilePage() {
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

  return (
    <div className="max-w-5xl p-8">
      <div className="bg-white rounded-xl shadow-sm ">
        <div className="p-6 space-y-8">
          {/* 비밀번호 변경 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">비밀번호 변경</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  현재 비밀번호
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  영문, 숫자, 특수문자 포함 8자 이상
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* 주소 변경 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">주소 변경</h2>
            <div className="max-w-md">
              <AddressFields
                address={formData.address}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      [name.split(".")[1]]: value,
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 rounded-b-xl flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

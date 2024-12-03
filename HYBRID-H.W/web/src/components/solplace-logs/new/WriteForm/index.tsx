'use client';
import { FormProvider } from 'react-hook-form';
import useWriteForm from './hooks';
import { FormInput, FormTextArea } from '@/components/ui/custom/FormInput';
import Image from 'next/image';
import { FormButton } from '@/components/ui/custom/Button';

export default function WriteForm() {
  const { methods } = useWriteForm();
  return (
    <main>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h5>
              플레이스 이름<span className="text-red-600 ml-1">*</span>
            </h5>
            <FormInput
              name="name"
              placeholder="플레이스 이름을 입력해 주세요.(1자 이상)"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <h5>플레이스 주소</h5>
            <div className="cursor-pointer flex justify-between py-2 px-3 w-full border rounded-md border-black">
              <p>플레이스 주소 입력</p>
              {/* 추후 input으로 수정 */}
              <Image
                src="/icons/right_icon.png"
                alt="right"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h5>
              플레이스 내용<span className="text-red-600 ml-1">*</span>
            </h5>
            <FormTextArea
              name="contents"
              placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
            />
          </div>
          <FormButton label="로그 등록" />
        </form>
      </FormProvider>
    </main>
  );
}

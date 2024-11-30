import { usePlaceForm } from "@/common/hooks/solplace-logs/new/usePlaceForm";
import InputField from "@/components/inputField";
import { useFormContext } from "react-hook-form";

export default function PlaceContents() {
  const { contentsLength, onChangeContents } = usePlaceForm();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <InputField name="플레이스 내용" required>
      <div className="relative">
        <textarea
          className="resize-none py-12 px-16 w-full h-148 rounded-lg border border-[#d4d3d3] "
          placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
          {...register("contents", {
            onChange: (event) => onChangeContents(event.target.value),
          })}
        />
        <span className="w-full absolute right-16 bottom-16 text-right text-[#ababab] text-sm font-medium leading-tight">
          {contentsLength}/100
        </span>
      </div>
      {errors.contents && (
        <p className="text-red-500 text-sm">
          {errors.contents?.message as string}
        </p>
      )}
    </InputField>
  );
}

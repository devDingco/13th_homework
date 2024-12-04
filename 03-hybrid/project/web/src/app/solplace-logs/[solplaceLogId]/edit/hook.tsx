import useSampleDataStore from "@/app/test/test-store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SAMPLE_DATA } from "../../page";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SolPlaceLogsSchema,
  SolPlaceLogsType,
} from "@/schema/schema-solplace-logs";
import { useRouter } from "next/navigation";

export default function useHook() {
  const router = useRouter();
  const methods = useForm<SolPlaceLogsType>({
    resolver: zodResolver(SolPlaceLogsSchema),
  });

  const { data } = useSampleDataStore();

  const handleUpdate = (newData: SolPlaceLogsType) => {
    try {
      const oldData = SAMPLE_DATA.filter((el) => el.id === data.id)[0];
      SAMPLE_DATA[oldData.id] = {
        id: data.id,
        name: newData.name,
        contents: newData.contents,
        images: newData.images ?? [],
      };
      router.back();
    } catch {
      alert("솔플레이스 로그 업데이트를 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!data) return;

    const defaultValues = {
      id: data.id,
      name: data.name,
      contents: data.contents,
      images: data.images,
    };

    methods.reset(defaultValues);
  }, [data]);

  return {
    methods,
    data,
    handleUpdate,
  };
}

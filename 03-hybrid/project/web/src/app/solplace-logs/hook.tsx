import { useRouter } from "next/navigation";
import useSampleDataStore from "../test/test-store";
import { ISampleData } from "./page";

export default function useSolplaceLogs() {
  const router = useRouter();

  const { setData } = useSampleDataStore();

  const onClickCard = (data: ISampleData) => {
    router.push("/solplace-logs/123");
    setData(data);
  };

  const onClickFloatingActionButton = () => {
    router.push("/solplace-logs/new");
  };
  return {
    onClickCard,
    onClickFloatingActionButton,
  };
}

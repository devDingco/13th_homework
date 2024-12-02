import { useRouter } from "next/navigation";

export default function useSolplaceLogs() {
  const router = useRouter();
  const onClickCard = () => {
    router.push("/solplace-logs/123");
  };
  return {
    onClickCard,
  };
}

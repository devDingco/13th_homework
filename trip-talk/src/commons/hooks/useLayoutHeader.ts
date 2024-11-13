import { useRouter } from "next/navigation";

export default function useLayoutHeader() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };

  return onClick;
}

import { useAccessTokenStore } from "@/commons/stores/access-token-store";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const LOGOUT = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export default function useNavigation() {
  const router = useRouter();
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const [logout] = useMutation(LOGOUT);

  const onClickLogout = () => {
    logout();

    setAccessToken("");
    router.push("/boards");
  };

  return { accessToken, onClickLogout };
}

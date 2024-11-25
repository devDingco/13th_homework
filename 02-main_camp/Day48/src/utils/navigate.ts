import { useRouter } from "next/navigation";

export enum NavigationPaths {
  login = "/login",
  signUp = "/signUp",
  boards = "/boards",
  boardsNew = "/boards/new",
  travelProduct = "/travelproduct",
  travelProductNew = "/travelproduct/new",
  openApis = "/openapis",
  myApis = "/myapis",
  myPage = "/mypage",
}

export const useNavigate = () => {
  const router = useRouter();

  return (path: NavigationPaths, id?: string) => {
    if (id) {
      return router.push(`${path}/${id}`);
    }

    router.push(path);
  };
};

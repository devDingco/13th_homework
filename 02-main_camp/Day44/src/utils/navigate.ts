import { useRouter } from "next/navigation";

export enum NavigationPaths {
  login = "/login",
  boards = "/boards",
  travelProduct = "/travelproduct",
  openApis = "/openapis",
  myApis = "/myapis",
  myPage = "mypage",
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

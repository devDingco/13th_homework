export const dateViewSet = (date: string) => {
  return date?.split("T")[0].replaceAll("-", ".");
};

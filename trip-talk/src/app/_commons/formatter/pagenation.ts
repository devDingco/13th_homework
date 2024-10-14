export default function pagenation(boardsCount: number) {
  return Math.ceil((boardsCount ?? 10) / 10);
}

import { Rate } from "antd";

export default function StarRating({ readOnly }: { readOnly: boolean }) {
  return <div>{readOnly ? <Rate disabled defaultValue={2} /> : <Rate />}</div>;
}

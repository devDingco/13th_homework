import { Rate } from "antd";
import { IStarRating } from "../../../types/components.type";

export default function StarRating({
  defaultValue = 0,
  setRating,
  rating,
}: IStarRating) {
  return (
    <div>
      {defaultValue ? (
        <Rate disabled defaultValue={defaultValue} />
      ) : (
        <Rate onChange={setRating} value={rating} />
      )}
    </div>
  );
}

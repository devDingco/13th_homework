import { MdOutlineHeartBroken } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";

export default function DetailFormLike() {
  return (
    <div className="flex justify-center gap-5">
      <div className="flex-col" style={{ color: "grey" }}>
        <MdOutlineHeartBroken />
        24
      </div>
      <div className="flex-col" style={{ color: "red" }}>
        <MdOutlineFavoriteBorder />
        12
      </div>
    </div>
  );
}

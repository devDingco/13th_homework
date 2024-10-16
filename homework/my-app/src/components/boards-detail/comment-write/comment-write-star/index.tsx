import React, { useState } from "react";
import { Rate } from "antd";

export default function LibaryStarPage() {
  const [value, setValue] = useState(3);
  return <Rate onChange={setValue} value={value} />;
}

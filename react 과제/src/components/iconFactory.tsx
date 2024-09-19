import { ReactElement } from "react";

import { ReactComponent as Add } from "../assets/icons/outline/add.svg";

const icons = {
  add: Add,
};

export type IconType = keyof typeof icons;
export const iconTypes: IconType[] = Object.keys(icons) as IconType[];

export interface IconProps {
  icon: IconType;
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
}

function Icon({
  icon,
  className,
  width,
  height,
  fill,
}: IconProps): ReactElement {
  const SVGIcon = icons[icon];
  return (
    <SVGIcon className={className} width={width} height={height} fill={fill} />
  );
}

export default Icon;

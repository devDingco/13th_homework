import { ReactElement } from "react";

import { ReactComponent as Add } from "assets/icons/outline/add.svg";
import { ReactComponent as Apartment } from "assets/icons/outline/apartment.svg";
import { ReactComponent as Bad } from "assets/icons/outline/bad.svg";

import { ReactComponent as Bookmark } from "assets/icons/outline/bookmark.svg";

import { ReactComponent as Calendar } from "assets/icons/outline/calendar.svg";
import { ReactComponent as Camp } from "assets/icons/outline/camp.svg";
import { ReactComponent as Chat } from "assets/icons/outline/chat.svg";
import { ReactComponent as Close } from "assets/icons/outline/close.svg";

import { ReactComponent as Edit } from "assets/icons/outline/edit.svg";

import { ReactComponent as Fire } from "assets/icons/outline/fire.svg";

import { ReactComponent as Good } from "assets/icons/outline/good.svg";

import { ReactComponent as Hotel } from "assets/icons/outline/hotel.svg";
import { ReactComponent as HouseOnTheSea } from "assets/icons/outline/house_on_the_sea.svg";

import { ReactComponent as LeftArrow } from "assets/icons/outline/left_arrow.svg";
import { ReactComponent as Link } from "assets/icons/outline/link.svg";
import { ReactComponent as Location } from "assets/icons/outline/location.svg";
import { ReactComponent as Login } from "assets/icons/outline/login.svg";
import { ReactComponent as Logout } from "assets/icons/outline/logout.svg";

import { ReactComponent as Menu } from "assets/icons/outline/menu.svg";

import { ReactComponent as Person } from "assets/icons/outline/person.svg";
import { ReactComponent as Planterior } from "assets/icons/outline/planterior.svg";
import { ReactComponent as Point } from "assets/icons/outline/point.svg";

import { ReactComponent as RadioEnabled } from "assets/icons/outline/radio-enabled.svg";
import { ReactComponent as RadioSelected } from "assets/icons/outline/radio-selected.svg";
import { ReactComponent as Reply } from "assets/icons/outline/reply.svg";
import { ReactComponent as Return } from "assets/icons/outline/return.svg";
import { ReactComponent as RightArrow } from "assets/icons/outline/right_arrow.svg";
import { ReactComponent as RoomService } from "assets/icons/outline/room_service.svg";
import { ReactComponent as Rwite } from "assets/icons/outline/rwite.svg";

import { ReactComponent as Search } from "assets/icons/outline/search.svg";
import { ReactComponent as SinglePersonAccommodation } from "assets/icons/outline/single_person_accommodation.svg";
import { ReactComponent as Spa } from "assets/icons/outline/spa.svg";

import { ReactComponent as Uncheck } from "assets/icons/outline/uncheck.svg";

import { ReactComponent as BookMark } from "assets/icons/filled/bookmark.svg";
import { ReactComponent as Charge } from "assets/icons/filled/charge.svg";
import { ReactComponent as Check } from "assets/icons/filled/check.svg";
import { ReactComponent as DownArrow } from "assets/icons/filled/down_arrow.svg";
import { ReactComponent as MyPage } from "assets/icons/filled/mypage.svg";
import { ReactComponent as Star } from "assets/icons/filled/star.svg";
import { ReactComponent as Store } from "assets/icons/filled/store.svg";
import { ReactComponent as Triptalk } from "assets/icons/filled/triptalk.svg";
import { ReactComponent as UpArrow } from "assets/icons/filled/up_arrow.svg";
import { ReactComponent as Visibility } from "assets/icons/filled/visibility.svg";

const icons = {
  add: Add,
  apartment: Apartment,
  bad: Bad,
  bookmark: Bookmark,
  calendar: Calendar,
  camp: Camp,
  chat: Chat,
  close: Close,
  edit: Edit,
  fire: Fire,
  good: Good,
  hotel: Hotel,
  houseOnTheSea: HouseOnTheSea,
  leftArrow: LeftArrow,
  link: Link,
  location: Location,
  login: Login,
  logout: Logout,
  menu: Menu,
  person: Person,
  planterior: Planterior,
  point: Point,
  radioEnabled: RadioEnabled,
  radioSelected: RadioSelected,
  reply: Reply,
  return: Return,
  rightArrow: RightArrow,
  roomService: RoomService,
  rwite: Rwite,
  search: Search,
  singlePersonAccommodation: SinglePersonAccommodation,
  spa: Spa,
  uncheck: Uncheck,

  bookMark: BookMark,
  charge: Charge,
  check: Check,
  downArrow: DownArrow,
  mypage: MyPage,
  star: Star,
  store: Store,
  triptalk: Triptalk,
  upArrow: UpArrow,
  visibility: Visibility,
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

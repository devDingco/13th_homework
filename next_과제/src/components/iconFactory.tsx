import Add from "../../public/svgs/outline/add.svg";
import Apartment from "../../public/svgs/outline/apartment.svg";
import Bad from "../../public/svgs/outline/bad.svg";
import Bookmark from "../../public/svgs/outline/bookmark.svg";
import Calendar from "../../public/svgs/outline/calendar.svg";
import Camp from "../../public/svgs/outline/camp.svg";
import Chat from "../../public/svgs/outline/chat.svg";
import Close from "../../public/svgs/outline/close.svg";
import Delete from "../../public/svgs/outline/delete.svg";
import Edit from "../../public/svgs/outline/edit.svg";
import Fire from "../../public/svgs/outline/fire.svg";
import Good from "../../public/svgs/outline/good.svg";
import Hotel from "../../public/svgs/outline/hotel.svg";
import HouseOnTheSea from "../../public/svgs/outline/house_on_the_sea.svg";
import LeftArrow from "../../public/svgs/outline/left_arrow.svg";
import Link from "../../public/svgs/outline/link.svg";
import Location from "../../public/svgs/outline/location.svg";
import Login from "../../public/svgs/outline/login.svg";
import Logout from "../../public/svgs/outline/logout.svg";
import Menu from "../../public/svgs/outline/menu.svg";
import Person from "../../public/svgs/outline/person.svg";
import Planterior from "../../public/svgs/outline/planterior.svg";
import Point from "../../public/svgs/outline/point.svg";
import RadioEnabled from "../../public/svgs/outline/radio-enabled.svg";
import RadioSelected from "../../public/svgs/outline/radio-selected.svg";
import Reply from "../../public/svgs/outline/reply.svg";
import Return from "../../public/svgs/outline/return.svg";
import RightArrow from "../../public/svgs/outline/right_arrow.svg";
import RoomService from "../../public/svgs/outline/room_service.svg";
import Rwite from "../../public/svgs/outline/rwite.svg";
import Search from "../../public/svgs/outline/search.svg";
import SinglePersonAccommodation from "../../public/svgs/outline/single_person_accommodation.svg";
import Spa from "../../public/svgs/outline/spa.svg";
import Uncheck from "../../public/svgs/outline/uncheck.svg";
import BookMark from "../../public/svgs/filled/bookmark.svg";
import Charge from "../../public/svgs/filled/charge.svg";
import Check from "../../public/svgs/filled/check.svg";
import DownArrow from "../../public/svgs/filled/down_arrow.svg";
import MyPage from "../../public/svgs/filled/mypage.svg";
import Star from "../../public/svgs/filled/star.svg";
import Store from "../../public/svgs/filled/store.svg";
import Triptalk from "../../public/svgs/filled/triptalk.svg";
import UpArrow from "../../public/svgs/filled/up_arrow.svg";
import Visibility from "../../public/svgs/filled/visibility.svg";

const icons = {
  add: Add,
  apartment: Apartment,
  bad: Bad,
  bookmark: Bookmark,
  calendar: Calendar,
  camp: Camp,
  chat: Chat,
  close: Close,
  delete: Delete,
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
// <Icon icon="location" className="fill-gray-500 w-fit" />
function Icon({
  icon,
  className,
  width,
  height,
  fill,
}: IconProps): JSX.Element {
  const SVGIcon = icons[icon];
  return (
    <span className={`overflow-hidden inline-block ${className}`}>
      <SVGIcon
        width={width}
        height={height}
        fill={fill}
        className="fill-inherit"
      />
    </span>
  );
}

export default Icon;

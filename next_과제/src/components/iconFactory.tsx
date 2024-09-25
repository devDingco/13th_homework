import Add from "/svgs/outline/add.svg";
import Apartment from "/svgs/outline/apartment.svg";
import Bad from "/svgs/outline/bad.svg";
import Bookmark from "/svgs/outline/bookmark.svg";
import Calendar from "/svgs/outline/calendar.svg";
import Camp from "/svgs/outline/camp.svg";
import Chat from "/svgs/outline/chat.svg";
import Close from "/svgs/outline/close.svg";
import Edit from "/svgs/outline/edit.svg";
import Fire from "/svgs/outline/fire.svg";
import Good from "/svgs/outline/good.svg";
import Hotel from "/svgs/outline/hotel.svg";
import HouseOnTheSea from "/svgs/outline/house_on_the_sea.svg";
import LeftArrow from "/svgs/outline/left_arrow.svg";
import Link from "/svgs/outline/link.svg";
import Location from "/svgs/outline/location.svg";
import Login from "/svgs/outline/login.svg";
import Logout from "/svgs/outline/logout.svg";
import Menu from "/svgs/outline/menu.svg";
import Person from "/svgs/outline/person.svg";
import Planterior from "/svgs/outline/planterior.svg";
import Point from "/svgs/outline/point.svg";
import RadioEnabled from "/svgs/outline/radio-enabled.svg";
import RadioSelected from "/svgs/outline/radio-selected.svg";
import Reply from "/svgs/outline/reply.svg";
import Return from "/svgs/outline/return.svg";
import RightArrow from "/svgs/outline/right_arrow.svg";
import RoomService from "/svgs/outline/room_service.svg";
import Rwite from "/svgs/outline/rwite.svg";
import Search from "/svgs/outline/search.svg";
import SinglePersonAccommodation from "/svgs/outline/single_person_accommodation.svg";
import Spa from "/svgs/outline/spa.svg";
import Uncheck from "/svgs/outline/uncheck.svg";
import BookMark from "/svgs/filled/bookmark.svg";
import Charge from "/svgs/filled/charge.svg";
import Check from "/svgs/filled/check.svg";
import DownArrow from "/svgs/filled/down_arrow.svg";
import MyPage from "/svgs/filled/mypage.svg";
import Star from "/svgs/filled/star.svg";
import Store from "/svgs/filled/store.svg";
import Triptalk from "/svgs/filled/triptalk.svg";
import UpArrow from "/svgs/filled/up_arrow.svg";
import Visibility from "/svgs/filled/visibility.svg";

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
}: IconProps): JSX.Element {
  const SVGIcon = icons[icon];
  return (
    <SVGIcon className={className} width={width} height={height} fill={fill} />
  );
}

export default Icon;

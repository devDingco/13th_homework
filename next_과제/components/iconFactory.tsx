import Add from "@/assets/icons/outline/add.svg";
import Apartment from "@/assets/icons/outline/apartment.svg";
import Bad from "@/assets/icons/outline/bad.svg";
import Bookmark from "@/assets/icons/outline/bookmark.svg";
import Calendar from "@/assets/icons/outline/calendar.svg";
import Camp from "@/assets/icons/outline/camp.svg";
import Chat from "@/assets/icons/outline/chat.svg";
import Close from "@/assets/icons/outline/close.svg";
import Edit from "@/assets/icons/outline/edit.svg";
import Fire from "@/assets/icons/outline/fire.svg";
import Good from "@/assets/icons/outline/good.svg";
import Hotel from "@/assets/icons/outline/hotel.svg";
import HouseOnTheSea from "@/assets/icons/outline/house_on_the_sea.svg";
import LeftArrow from "@/assets/icons/outline/left_arrow.svg";
import Link from "@/assets/icons/outline/link.svg";
import Location from "@/assets/icons/outline/location.svg";
import Login from "@/assets/icons/outline/login.svg";
import Logout from "@/assets/icons/outline/logout.svg";
import Menu from "@/assets/icons/outline/menu.svg";
import Person from "@/assets/icons/outline/person.svg";
import Planterior from "@/assets/icons/outline/planterior.svg";
import Point from "@/assets/icons/outline/point.svg";
import RadioEnabled from "@/assets/icons/outline/radio-enabled.svg";
import RadioSelected from "@/assets/icons/outline/radio-selected.svg";
import Reply from "@/assets/icons/outline/reply.svg";
import Return from "@/assets/icons/outline/return.svg";
import RightArrow from "@/assets/icons/outline/right_arrow.svg";
import RoomService from "@/assets/icons/outline/room_service.svg";
import Rwite from "@/assets/icons/outline/rwite.svg";
import Search from "@/assets/icons/outline/search.svg";
import SinglePersonAccommodation from "@/assets/icons/outline/single_person_accommodation.svg";
import Spa from "@/assets/icons/outline/spa.svg";
import Uncheck from "@/assets/icons/outline/uncheck.svg";
import BookMark from "@/assets/icons/filled/bookmark.svg";
import Charge from "@/assets/icons/filled/charge.svg";
import Check from "@/assets/icons/filled/check.svg";
import DownArrow from "@/assets/icons/filled/down_arrow.svg";
import MyPage from "@/assets/icons/filled/mypage.svg";
import Star from "@/assets/icons/filled/star.svg";
import Store from "@/assets/icons/filled/store.svg";
import Triptalk from "@/assets/icons/filled/triptalk.svg";
import UpArrow from "@/assets/icons/filled/up_arrow.svg";
import Visibility from "@/assets/icons/filled/visibility.svg";

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

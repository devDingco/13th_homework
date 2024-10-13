import {
    navigationMenuTriggerStyle,
    NavigationMenuLink,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenu
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              트립토크
            </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              숙박권구매
            </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              마이페이지
            </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

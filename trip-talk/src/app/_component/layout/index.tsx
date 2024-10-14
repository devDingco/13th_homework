import HeaderLayout from './header';
import NavigationLayout from './navigation';

export default function DefaultLayout() {
  return (
    <HeaderLayout>
      <NavigationLayout />
    </HeaderLayout>
  );
}

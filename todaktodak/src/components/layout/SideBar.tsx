import { useRouter } from "next/navigation";

import Image from "next/image";
import UserProfileSection from "./components/sideBar/UserProfileSection";
import Navigation from "./components/sideBar/Navigation";

export default function SideBar() {
  const router = useRouter();

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-4 py-6 flex justify-center ">
          <Image
            src="/images/todak_logo.png"
            width={170}
            height={100}
            alt="logo"
            onClick={() => router.push("/home")}
          />
        </div>

        {/* Navigation */}
        <Navigation router={router} />

        {/* User Profile */}
        <UserProfileSection />
      </div>
    </aside>
  );
}

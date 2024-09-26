import Image from 'next/image';

const NavBar = () => {
    return (
        <header>
            <Image src="/logo.svg" alt="트립토크 로고" width="50" height="50"/>
        </header>
    );
};

export default NavBar;
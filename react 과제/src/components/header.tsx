import { Link } from "react-router-dom";
import DarkModeButton from "components/darkModeButton";

const Header = () => {
  // const navItems = ["home", "boardNew"];
  // const pathName = window.location.pathname;
  return (
    <header className="bg-slate-900 text-white">
      <nav className="max-w-7xl flex justify-between items-center m-auto p-4">
        <h1>
          <Link to={"/"}>jomira</Link>
        </h1>
        <div className="flex gap-4">
          <Link className="btn btn-primary" to="/board/new">
            게시글 등록
          </Link>
          <Link className="btn btn-secondary" to="/board/detail">
            게시글 상세
          </Link>
        </div>
        {/* <ul className="flex gap-4">
          {navItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={`${item === "home" ? "/" : `/${item}`}`}
                  className={
                    "p-2 hover:text-yellow-300 hover:border-b border-yellow-300" +
                    (pathName === `/${item}` ||
                    (pathName === "/" && item === "home")
                      ? " font-bold text-yellow-300 border-b"
                      : "")
                  }
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul> */}
        <DarkModeButton />
      </nav>
    </header>
  );
};
export default Header;

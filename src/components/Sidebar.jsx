import { Link, NavLink } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

import logo from "../assets/images/netspire-logo-blue.png";

const Sidebar = ({ user, toggleSidebar }) => {
  const isNotActiveStyles =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
  const isActiveStyles =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black text-gray-500 transition-all duration-200 ease-in-out capitalize";
  const categories = [
    { name: "animals" },
    { name: "wallpapers" },
    { name: "photography" },
    { name: "gaming" },
    { name: "coding" },
    { name: "other" }
  ];

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-280 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={() => toggleSidebar(false)}>
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
            onClick={() => toggleSidebar(false)}>
            <BiHomeAlt />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>
          {categories.slice(0, categories.length - 1).map((category, index) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
              onClick={() => toggleSidebar(false)}
              key={index}>
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user/${user._id}`}
          className="flex gap-2 items-center p-5 bg-white rounded-lg"
          onClick={() => toggleSidebar(false)}>
          <img src={user.image} alt="user" className="w-10 h-10 rounded-full" />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;

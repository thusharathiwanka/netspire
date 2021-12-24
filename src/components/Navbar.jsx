import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ user, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={20} className="ml-1" />
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Search"
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user/${user?._id}`} className="hidden md:block">
          <img src={user?.image} alt="user" className="w-16 rounded-full" />
        </Link>
        <Link
          to={`post/create`}
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 flex justify-center items-center">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { RiAddFill, RiSearch2Line } from "react-icons/ri";

const Navbar = ({ user, searchKeyword, setSearchKeyword }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 mx-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <RiSearch2Line fontSize={22} className="mx-2" />
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
          placeholder="Search"
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3 items-center">
        {user && (
          <Link to={`user/${user._id}`} className="hidden md:block">
            <img src={user.image} alt="user" className="w-16 rounded-full p-1" />
          </Link>
        )}
        <Link
          to={`post/create`}
          className="bg-accent text-white rounded-lg w-12 h-12 md:w-14 flex justify-center items-center">
          <RiAddFill fontSize={20} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

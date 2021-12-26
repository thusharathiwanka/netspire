import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import Posts from "./Posts";
import Sidebar from "../components/Sidebar";
import UserProfile from "./UserProfile";

import logo from "../assets/images/netspire-logo-blue.png";

import { client } from "../config/sanity.client";
import { getUserInfo } from "../utils/fetchLocalStorage";
import { userQuery } from "../utils/query";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = getUserInfo();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client
      .fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="md:flex hidden h-screen flex-initial">
        <Sidebar user={user && user} toggleSidebar={toggleSidebar} />
      </div>
      <div className="md:hidden flex flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-sm">
          <HiMenuAlt1
            className="cursor-pointer"
            fontSize={40}
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-32" />
          </Link>
          <Link to={`/user/${user?._id}`}>
            <img src={user?.image} alt="user" className="w-16 rounded-full p-2" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/6 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <IoClose
                className="cursor-pointer"
                fontSize={40}
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} toggleSidebar={toggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/*" element={<Posts user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

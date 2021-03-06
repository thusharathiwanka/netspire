import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { RiLogoutCircleRLine } from "react-icons/ri";

import MasonryLayout from "../components/MasonryLayout";
import Spinner from "../components/Spinner";

import { AuthContext } from "../contexts/AuthContext";
import { client } from "../config/sanity.client";
import { getUserInfo } from "../utils/fetchLocalStorage";
import { userCreatedPostsQuery, userQuery, userSavedPostsQuery } from "../utils/query";

const activeBtnStyles = "bg-accent text-white font-bold p-2 rounded-full w-24 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const { setIsSigned } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState();
  const [posts, setPosts] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const user = getUserInfo();

  useEffect(() => {
    setLoading(true);
    const query = userQuery(id);
    client
      .fetch(query)
      .then((data) => {
        setUserInfo(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);

    if (text === "Created") {
      const createdPinsQuery = userCreatedPostsQuery(id);

      return client
        .fetch(createdPinsQuery)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

    const savedPinsQuery = userSavedPostsQuery(id);

    return client
      .fetch(savedPinsQuery)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [text, id]);

  const logout = () => {
    localStorage.clear();
    setIsSigned(false);
    navigate("/login");
  };

  if (!userInfo) return <Spinner message="Loading profile" />;

  return (
    <div
      className="relative pb-2 h-full mx-auto my-8 justify-center items-center"
      style={{ maxWidth: "1570px" }}>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center rounded-3xl">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover rounded-3xl"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-28 h-28 -mt-10 shadow-xl object-cover"
              src={userInfo.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">{userInfo.userName}</h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {id === user?.googleId && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full m-4 cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}>
                    <RiLogoutCircleRLine color="red" fontSize={21} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles}`}>
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles}`}>
            Saved
          </button>
        </div>
        {posts?.length === 0 ? (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No posts found!
          </div>
        ) : loading ? (
          <Spinner message="Loading posts" />
        ) : (
          <div>
            <MasonryLayout posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

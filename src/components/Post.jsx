import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBin7Line, RiShareBoxLine } from "react-icons/ri";
import { v4 } from "uuid";

import { client, urlFor } from "../config/sanity.client";
import { getUserInfo } from "../utils/fetchLocalStorage";

const Post = ({ post: { image, _id, save, src, postedBy } }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();
  const user = getUserInfo();
  const alreadySaved = save?.filter((item) => item.postedBy._id === user.googleId)?.length;

  const savePost = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: v4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId
            }
          }
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        })
        .catch((error) => console.log(error));
    }
  };

  const deletePost = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="m-2">
      <div
        className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/post/${_id}`)}>
        <img src={urlFor(image).width(250).url()} alt="post" className="rounded-xl w-full" />
        {isHovered && (
          <div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 p-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full grid place-content-center text-dark text-lg outline-none opacity-75 hover:opacity-100 hover:shadow-md ">
                  <MdOutlineFileDownload />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-medium px-5 py-1 text-sm rounded-3xl hover:shadow-md outline-none mr-2">
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-medium px-5 py-1 text-sm rounded-3xl hover:shadow-md outline-none mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePost(_id);
                  }}>
                  {savingPost ? "Saving..." : "Save"}
                </button>
              )}
            </div>
            <div className="flex justify-between w-full items-center gap-2 p-2">
              {src && (
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full grid place-content-center text-dark text-lg outline-none opacity-75 hover:opacity-100 hover:shadow-md">
                  <RiShareBoxLine />
                </a>
              )}
              {postedBy?._id === user?.googleId && (
                <button
                  className="bg-white w-9 h-9 rounded-full grid place-content-center text-dark text-lg outline-none opacity-75 hover:opacity-100 hover:shadow-md hover:bg-red-500 hover:text-white"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(_id);
                  }}>
                  <RiDeleteBin7Line />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`user/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img src={postedBy?.image} alt="user" className="w-8 h-8 rounded-full object-cover" />
        <p className="font-medium capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Post;

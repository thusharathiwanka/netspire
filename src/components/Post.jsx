import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { urlFor } from "../config/sanity.client";

const Post = ({ post: { image, _id } }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  // const [savingPost, setSavingPost] = useState(false);

  return (
    <div className="m-2">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={setIsHovered(false)}
        onClick={navigate(`/post/${_id}`)}>
        <img src={urlFor(image).width(250).url()} alt="post" className="rounded-xl w-full" />
        {isHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}>
            <div className="flex items-center justify-between"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

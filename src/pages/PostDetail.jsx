import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { v4 } from "uuid";

import MasonryLayout from "../components/MasonryLayout";
import Spinner from "../components/Spinner";

import { client, urlFor } from "../config/sanity.client";
import { postDetailMorePinQuery, postDetailQuery } from "../utils/query";

const PostDetail = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { id } = useParams();

  const fetchPinDetails = () => {
    const query = postDetailQuery(id);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPostDetail(data[0]);

        if (data[0]) {
          const secondQuery = postDetailMorePinQuery(data[0]);
          client.fetch(secondQuery).then((res) => {
            setPosts(res);
          });
        }
      });
    }
  };

  const addComment = () => {
    if (comment) {
      setIsAddingComment(true);

      client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          { comment, _key: v4(), postedBy: { _type: "postedBy", _ref: user._id } }
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setIsAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [id]);

  if (!postDetail) {
    return <Spinner message="Showing post" />;
  }

  return (
    <>
      {postDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white rounded-3xl"
          style={{ maxWidth: "1570px" }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-3xl"
              src={postDetail?.image && urlFor(postDetail?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center gap-5">
              <div className="flex gap-2 items-center">
                <a
                  href={`${postDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100">
                  <MdOutlineFileDownload />
                </a>
              </div>
              <a
                href={postDetail.src}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100">
                <RiShareBoxLine />
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">{postDetail.title}</h1>
              <p className="mt-3">{postDetail.description}</p>
            </div>
            <Link
              to={`/user-profile/${postDetail?.postedBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img
                src={postDetail?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{postDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {postDetail?.comments?.map((item) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <input
                className=" flex-1 outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                type="text"
                placeholder="What do you think about this?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-accent text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}>
                {isAddingComment ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
      {posts?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">More like this</h2>
      )}
      {posts ? <MasonryLayout posts={posts} /> : <Spinner message="Loading more posts" />}
    </>
  );
};

export default PostDetail;

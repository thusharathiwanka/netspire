import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";

import Spinner from "../components/Spinner";

import { client } from "../config/sanity.client";
import categories from "../utils/data";

const NewPost = ({ user }) => {
  const [post, setPost] = useState({
    title: "",
    about: "",
    src: "",
    category: "",
    image: ""
  });
  const [wrongImageType, setWrongImageType] = useState();
  const [loading, setLoading] = useState(false);
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);

  const navigate = useNavigate();

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/tiff",
    "image/svg"
  ];

  const uploadImage = (e) => {
    if (e.target.files.length <= 0) {
      return;
    }

    const { type, name } = e.target.files[0];
    const isValid = allowedTypes.includes(type);

    if (isValid) {
      setWrongImageType(false);
      setLoading(true);

      return client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name
        })
        .then((document) => {
          setPost({ ...post, image: document });
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    }

    setLoading(false);
    setWrongImageType(true);
  };

  const savePost = () => {
    if (post.title && post.about && post.src && post.image?._id && post.category) {
      const doc = {
        _type: "post",
        title: post.title,
        about: post.about,
        src: post.src,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: post?.image?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id
        },
        category: post.category
      };
      client
        .create(doc)
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      setIsFieldsFilled(true);

      setTimeout(() => {
        setIsFieldsFilled(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {isFieldsFilled && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && (
              <p className="text-center">Please select a file with accepted file type.</p>
            )}
            {!post?.image ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click here to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400 text-center">
                    Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                  </p>
                </div>
                <input type="file" name="upload-image" onChange={uploadImage} className="w-0 h-0" />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={post?.image?.url}
                  alt="uploaded-pic"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md hover:bg-red-500 hover:text-white transition-all duration-500 ease-in-out"
                  onClick={() => setPost({ ...post, src: null })}>
                  <RiDeleteBin7Line />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={post.about}
            onChange={(e) => setPost({ ...post, about: e.target.value })}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="url"
            value={post.src}
            onChange={(e) => setPost({ ...post, src: e.target.value })}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Post Category</p>
              <select
                onChange={(e) => {
                  setPost({ ...post, category: e.target.value });
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer capitalize">
                <option value="others" className="sm:text-bg bg-white">
                  Select Category
                </option>
                {categories.map((item, index) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={item.name}
                    key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePost}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none">
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

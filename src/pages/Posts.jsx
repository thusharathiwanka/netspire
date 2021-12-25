import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import NewPost from "./NewPost";
import PostDetail from "../pages/PostDetail";
import Search from "../components/Search";

const Posts = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar user={user} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:id" element={<Feed />} />
          <Route path="/post/:id" element={<PostDetail user={user} />} />
          <Route path="/post/create" element={<NewPost user={user} />} />
          <Route
            path="/search"
            element={<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Posts;

import { useEffect, useState } from "react";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

import { client } from "../config/sanity.client";
import { postsQuery, searchQuery } from "../utils/query";

const Search = ({ searchKeyword }) => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (searchKeyword !== "") {
      const query = searchQuery(searchKeyword.toLowerCase());
      return client
        .fetch(query)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    client
      .fetch(postsQuery)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchKeyword]);

  return (
    <div>
      {loading && <Spinner message="Searching posts" />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {posts?.length === 0 && searchKeyword !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">{`No posts found for ${searchKeyword}`}</div>
      )}
    </div>
  );
};

export default Search;

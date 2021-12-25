import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { client } from "../config/sanity.client";
import { postsQuery, searchQuery } from "../utils/query";

const Feed = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const query = searchQuery(id);
      return client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }

    setLoading(true);
    client.fetch(postsQuery).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, [id]);

  const ideaName = id || "new";

  if (loading) {
    return <Spinner message={`We are adding ${ideaName} posts to your feed!`} />;
  }

  if (!posts?.length) return <h2 className="text-center text-lg">No posts available</h2>;

  return <div>{posts && <MasonryLayout posts={posts} />}</div>;
};

export default Feed;

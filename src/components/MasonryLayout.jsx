import Masonry from "react-masonry-css";

import Post from "./Post";

const breakPoints = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  5001: 1
};

const MasonryLayout = ({ posts }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakPoints}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;

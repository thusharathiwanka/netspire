const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;

  return query;
};

const searchQuery = (searchKeyword) => {
  const query = `*[_type == "post" && title match == "${searchKeyword}*" || category match == "${searchKeyword}*" || about match == "${searchKeyword}*"] {
  image {
    asset -> {
      url
    }
  }, 
  _id, 
  src, 
  postedBy -> {
    _id, 
    userName, 
    image
  },
  save[] {
    _key, 
    postedBy -> {
      _id, 
      userName, 
      image
    },
  },
}`;

  return query;
};

const postsQuery = `*[_type == "post"] | order(_createdAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  src,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;

const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image {
      asset -> {
        url
      }
    },
    _id,
    title, 
    description,
    category,
    src,
    postedBy -> {
      _id,
      userName,
      image
    },
   save[] {
      postedBy -> {
        _id,
        userName,
        image
      },
    },
    comments[] {
      comment,
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

const postDetailMorePinQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image {
      asset -> {
        url
      }
    },
    _id,
    src,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export { userQuery, searchQuery, postsQuery, postDetailQuery, postDetailMorePinQuery };

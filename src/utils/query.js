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
    }, _id, destination, postedBy -> {
      _id, userName, image
    },
    save[] {
      _key, postedBy -> {
        _id, userName, image
      },
    },
  }`;

  return query;
};

const postsQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;

  return query;
};

export { userQuery, searchQuery, postsQuery };

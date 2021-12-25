const getUserInfo = () => {
  const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();

  return userInfo;
};

export { getUserInfo };
